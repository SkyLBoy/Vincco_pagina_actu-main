# Vincco Landing Page - Product Requirements Document (PRD)
## Original Problem Statement
Rediseño completo de la página web de Vincco (https://vincco.com/), una empresa de servicios de call center B2B (atención telefónica, telemarketing, soporte técnico, cobranza, atención multicanal). El sitio original tenía diseño visual antiguo, mala jerarquía de información y falta de enfoque en conversión.

### Iteración 2 - Requerimientos Adicionales
- Usar contenido real de vincco.com
- Implementar layout de cascada/waterfall para las secciones principales
- Secciones: Quiénes Somos, Servicios, Soluciones, Qué Nos Distingue, Qué Nos Respalda

## User Personas

### 1. Director de Operaciones (Empresa mediana/grande)
- Busca optimizar costos de atención al cliente
- Necesita métricas claras y KPIs
- Valora seguridad de la información

### 2. Gerente de Customer Experience
- Busca mejorar satisfacción del cliente
- Necesita solución omnicanal
- Valora reportes y analytics

### 3. Emprendedor / PYME
- Busca tercerizar atención telefónica
- Presupuesto limitado
- Valora flexibilidad y escalabilidad

## Core Requirements (Estáticos)

### Diseño Visual
- Estilo moderno SaaS/Tech (inspirado en Stripe, Zendesk, HubSpot, Twilio)
- Colores de marca Vincco: #04608E (primario), #1EC2D7 (turquesa), #1A4277 (marino)
- Tipografías: Outfit (headings), Manrope (body)
- Espacios en blanco, animaciones suaves, responsive design

### Estructura de la Página
1. Hero Section - CTA principal "Solicitar información"
2. Logos de Clientes (placeholder)
3. Servicios Principales - Bento grid
4. Canales de Contacto - Tabs (Con/Sin Agente)
5. Beneficios/Diferenciadores - Sección oscura con KPIs
6. Tecnología - Infraestructura y stack
7. Proceso de Trabajo - Timeline 4 pasos
8. CTA Final + Formulario de Contacto
9. Footer

### Funcionalidades
- Multiidioma (ES/EN) con localStorage
- Smooth scroll con Lenis
- Animaciones con Framer Motion
- Formulario de contacto funcional
- Navegación sticky
- Mobile-first responsive

## What's Been Implemented ✅

### Primera Iteración - 6 de Abril 2026
- [x] Landing page completa con todas las secciones
- [x] Hero section con dashboard mockup interactivo
- [x] Navbar sticky con enlaces de navegación
- [x] Sistema de idiomas ES/EN funcional
- [x] Formulario de contacto con validación
- [x] API backend para guardar contactos en MongoDB
- [x] Footer con redes sociales
- [x] Smooth scroll con Lenis
- [x] Animaciones con Framer Motion
- [x] Diseño responsive (mobile/tablet/desktop)
- [x] Colores de marca implementados

### Segunda Iteración - 6 de Abril 2026
- [x] Contenido real de vincco.com implementado
- [x] Nueva estructura de secciones:
  - Quiénes Somos (About) - Layout cascada con tarjetas Misión/Visión escalonadas
  - Servicios - Layout cascada alternando izquierda/derecha con números grandes
  - Soluciones - Tabs Con Agente/Sin Agente con tarjetas escalonadas
  - Qué Nos Distingue - Waterfall/zigzag con línea central y numeración
  - Qué Nos Respalda - Tarjetas con alturas escalonadas + banner CT
- [x] Hero actualizado con contenido original de Vincco
- [x] Traducciones completas ES/EN con todo el contenido real
- [x] Indicadores de sección (01, 02, 03, 04, 05)
- [x] Efectos visuales mejorados (líneas conectoras, orbes decorativos)

## Architecture
### Frontend (React + Tailwind)
```
/app/frontend/src/
├── App.js                    # Main app with Lenis smooth scroll
├── App.css                   # Custom CSS and animations
├── index.css                 # Tailwind + CSS variables
├── contexts/
│   └── LanguageContext.jsx   # i18n context with ES/EN translations
└── components/
    ├── Navbar.jsx            # Sticky navigation
    ├── Hero.jsx              # Hero with dashboard mockup
    ├── LogosMarquee.jsx      # Client logos carousel
    ├── CoreServices.jsx      # Bento grid services
    ├── ChannelsTabs.jsx      # Shadcn Tabs for channels
    ├── Benefits.jsx          # KPIs and benefits
    ├── Technology.jsx        # Tech stack section
    ├── Process.jsx           # 4-step timeline
    ├── ContactForm.jsx       # Contact form
    └── Footer.jsx            # Footer
```

### Backend (FastAPI + MongoDB)
```
/app/backend/
├── server.py                 # API endpoints
└── .env                      # Environment variables
```

### API Endpoints
- `GET /api/` - Health check
- `POST /api/contacts` - Create contact
- `GET /api/contacts` - List contacts
- `GET /api/contacts/{id}` - Get contact
- `PATCH /api/contacts/{id}/status` - Update status
- `DELETE /api/contacts/{id}` - Delete contact

## Notes
- El formulario de contacto guarda en MongoDB pero NO envía emails (según requerimiento del usuario)
- Los costos de integración de email: SendGrid (100 free/día) o Resend ($20/mes para 3000 emails)
- El sitio está 100% funcional y listo para producción
