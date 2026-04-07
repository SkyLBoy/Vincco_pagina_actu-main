from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(
    title="Vincco API",
    description="API for Vincco Contact Center Landing Page",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
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
    status: str = "new"  # new, contacted, converted


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


# Routes
@api_router.get("/")
async def root():
    return {"message": "Vincco API is running", "version": "1.0.0"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contacts", response_model=ContactResponse)
async def create_contact(contact_data: ContactCreate):
    """Create a new contact form submission"""
    try:
        contact = Contact(
            name=contact_data.name,
            email=contact_data.email,
            company=contact_data.company,
            phone=contact_data.phone,
            message=contact_data.message
        )
        
        doc = contact.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.contacts.insert_one(doc)
        
        return ContactResponse(
            success=True,
            message="Contact created successfully",
            contact_id=contact.id
        )
    except Exception as e:
        logging.error(f"Error creating contact: {e}")
        raise HTTPException(status_code=500, detail="Error saving contact")


@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    """Get all contacts (admin endpoint)"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    
    for contact in contacts:
        if isinstance(contact.get('created_at'), str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    
    return contacts


@api_router.get("/contacts/{contact_id}", response_model=Contact)
async def get_contact(contact_id: str):
    """Get a specific contact by ID"""
    contact = await db.contacts.find_one({"id": contact_id}, {"_id": 0})
    
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    if isinstance(contact.get('created_at'), str):
        contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    
    return contact


@api_router.patch("/contacts/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    """Update contact status"""
    valid_statuses = ["new", "contacted", "converted"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    result = await db.contacts.update_one(
        {"id": contact_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return {"success": True, "message": "Status updated"}


@api_router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str):
    """Delete a contact"""
    result = await db.contacts.delete_one({"id": contact_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return {"success": True, "message": "Contact deleted"}


# Legacy endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
