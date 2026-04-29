from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import dotenv_values
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import resend
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

# =========================
# 🔧 LOAD ENV VARIABLES
# =========================

ROOT_DIR = Path(__file__).resolve().parent
env_path = ROOT_DIR / ".env"

env_vars = dotenv_values(env_path)

RESEND_API_KEY = env_vars.get("RESEND_API_KEY")
MONGO_URL = env_vars.get("MONGO_URL")
DB_NAME = env_vars.get("DB_NAME")
CORS_ORIGINS = env_vars.get("CORS_ORIGINS", "*")

print("ENV PATH:", env_path)
print("RESEND_API_KEY:", RESEND_API_KEY)

# =========================
# 🧾 LOGGING
# =========================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# =========================
# 🔐 VALIDACIÓN ENV
# =========================

if not MONGO_URL:
    raise Exception("❌ Falta MONGO_URL en .env")

if not DB_NAME:
    raise Exception("❌ Falta DB_NAME en .env")

if not RESEND_API_KEY:
    logger.warning("⚠️ RESEND_API_KEY no configurada — emails desactivados")
else:
    resend.api_key = RESEND_API_KEY

# =========================
# 🗄️ DATABASE
# =========================

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# =========================
# 🚀 APP
# =========================

app = FastAPI(
    title="Vincco API",
    description="API for Vincco Contact Center Landing Page",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS.split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

# =========================
# 📦 MODELS
# =========================

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    message: str = Field(..., min_length=1, max_length=2000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class ContactResponse(BaseModel):
    success: bool
    message: str
    contact_id: Optional[str] = None


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str

# =========================
# 🌐 ROUTES
# =========================

@api_router.get("/")
async def root():
    return {"message": "Vincco API is running", "version": "1.0.0"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contacts", response_model=ContactResponse)
async def create_contact(contact_data: ContactCreate):
    try:
        contact = Contact(
            name=contact_data.name,
            email=contact_data.email,
            company=contact_data.company,
            phone=contact_data.phone,
            message=contact_data.message
        )

        doc = contact.model_dump()
        doc["created_at"] = doc["created_at"].isoformat()

        await db.contacts.insert_one(doc)
        logger.info(f"Contacto guardado: {contact.id}")

        # ✉️ Email (solo si hay API KEY)
        if RESEND_API_KEY:
            try:
                resend.Emails.send({
                    "from": "onboarding@resend.dev",
                    "to": ["sebastiancalderonlopez@gmail.com"],
                    "reply_to": contact_data.email,
                    "subject": f"Nuevo mensaje de {contact_data.name}",
                    "html": f"<p>{contact_data.message}</p>",
                })
                logger.info(f"Correo enviado: {contact.id}")
            except Exception as email_error:
                logger.error(f"Error enviando correo: {email_error}")

        return ContactResponse(
            success=True,
            message="Contact created successfully",
            contact_id=contact.id
        )

    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error saving contact")


@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)

    for contact in contacts:
        if isinstance(contact.get("created_at"), str):
            contact["created_at"] = datetime.fromisoformat(contact["created_at"])

    return contacts


@api_router.get("/contacts/{contact_id}", response_model=Contact)
async def get_contact(contact_id: str):
    contact = await db.contacts.find_one({"id": contact_id}, {"_id": 0})

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    if isinstance(contact.get("created_at"), str):
        contact["created_at"] = datetime.fromisoformat(contact["created_at"])

    return contact


@api_router.patch("/contacts/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    valid_statuses = ["new", "contacted", "converted"]

    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status")

    result = await db.contacts.update_one(
        {"id": contact_id},
        {"$set": {"status": status}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")

    return {"success": True}


@api_router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str):
    result = await db.contacts.delete_one({"id": contact_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")

    return {"success": True}


# =========================
# 🔗 INIT
# =========================

app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()