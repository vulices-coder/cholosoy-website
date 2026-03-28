# 🇵🇪 CholoSoy — Restaurant Website

Moderne Fullstack-Webanwendung für ein peruanisches Restaurant mit Fokus auf reale Geschäftsprozesse, skalierbare Architektur und hochwertige UI/UX.

---

## 🚀 Projektübersicht

CholoSoy ist eine mehrsprachige Restaurant-Webapp, die zentrale Geschäftsprozesse wie **Reservierungen**, **Catering-Anfragen** und **Veranstaltungen** digital abbildet.

Die Anwendung basiert auf einer produktionsnahen Architektur mit klarer Trennung von UI, Business Logic, Datenzugriff und Medienverwaltung.

---

## ✨ Features

- 🌐 Mehrsprachigkeit (DE / EN / ES)
- 🍽️ Digitale Speisekarte (Karte mit Routing-System)
- 📸 Galerie mit externer Bildverwaltung
- 📅 Veranstaltungsseite (inkl. Admin-Bereich)
- 📩 Reservierungssystem (Server Actions + DB)
- 🥗 Catering-Workflow (mehrstufiger Wizard)
- 🔐 Cookie-Consent (DSGVO-orientiert)
- 📱 Responsive UI (pixelgenau nach Figma)

---

## 🧱 Tech Stack

### Frontend
- Next.js 15 (App Router, React Server Components)
- React (RSC + Client Components)
- SCSS Modules + CSS Tokens
- next-intl (i18n)

### Backend
- Prisma ORM
- PostgreSQL (Neon)
- Server Actions (Next.js)

### Storage
- Supabase Storage (Bilder & Assets, CDN-ready)

### Infrastruktur
- Vercel (Deployment)
- TypeScript
- Prisma Studio

---

## 🏗️ Architektur

Die Anwendung folgt einer modularen, skalierbaren Architektur:

- UI Layer → React Server Components + Client Components  
- Business Logic → Server Actions  
- Data Layer → Prisma ORM  
- Database → PostgreSQL (Neon)  
- Media → Supabase Storage  

\`\`\`text
User
  ↓
Next.js (RSC / Client)
  ↓
Server Actions
  ↓
Prisma ORM
  ↓
PostgreSQL (Neon)

Media:
Next.js → Supabase Storage
\`\`\`

---

## 🔄 Datenfluss (Beispiel: Reservierung)

1. Nutzer sendet Formular  
2. Verarbeitung über Server Action  
3. Validierung via Zod (lib/validations)  
4. Speicherung über Prisma  
5. Persistenz in PostgreSQL  
6. UI Feedback (Success/Error)

---

## 🧠 Architektur-Entscheidungen

- PostgreSQL (Neon) für relationale Daten  
- Supabase Storage für Medien (keine Blobs in DB)  
- Server Actions statt REST API  
- Trennung von Daten und Medien  
- RSC-first Ansatz für Performance  

---

## 🧭 UX & Routing-Konzept

### Layout-System

- (start) → Splash ohne Navbar  
- (marketing) → Navbar + Footer  
- (karte) → eigenes Viewer-Layout  
- (catering) → Wizard Flow  

### Beispiel-Routen

- / → Startseite  
- /home  
- /kontakt  
- /karte/vorspeisen  
- /catering/form/step-2  

---

## 🗂️ Projektstruktur (real)

\`\`\`text
src/
├── app/
│   ├── (start)
│   ├── (marketing)
│   ├── (karte)
│   ├── (catering)
│   ├── [locale]
│   │   ├── (marketing)
│   │   │   ├── home
│   │   │   ├── gallery
│   │   │   ├── kontakt
│   │   │   ├── veranstaltung
│   │   │   └── about
│   │   │
│   │   ├── agb
│   │   ├── datenschutz
│   │   ├── impressum
│   │   └── info
│   │
│   ├── admin/events
│   │   ├── [id]
│   │   ├── new
│   │   ├── EditEventForm.tsx
│   │   └── *.module.scss
│   │
│   ├── set-locale/route.ts
│   ├── layout.tsx
│   └── not-found.tsx
│
├── actions/
│   ├── catering.ts
│   ├── events.ts
│   ├── reservations.ts
│   └── info.ts
│
├── components/
│   ├── admin/
│   ├── consent/
│   ├── layout/
│   ├── legal/
│   ├── sections/
│   └── ui/
│
├── lib/
│   ├── queries/
│   ├── validations/
│   ├── db.ts
│   ├── supabase.ts
│   ├── supabase-admin.ts
│   └── supabase-storage.ts
│
├── styles/
├── i18n/
├── messages/
│
prisma/
├── schema.prisma
├── migrations/
└── seed.ts
\`\`\`

---

## 🎨 Styling-Konzept

- SCSS Modules pro Komponente  
- Zentrale Tokens (Design System)  
- Keine Utility Frameworks (kein Tailwind)  
- Figma → 1:1 Umsetzung  

---

## 📦 Reale Business-Logik

- Persistente Reservierungen  
- Event-Management (inkl. Admin UI)  
- Catering-Anfragen (Wizard Flow)  
- Mehrsprachige Inhalte  

---

## 🎯 Ziel des Projekts

Dieses Projekt demonstriert eine **produktnahe Fullstack-Architektur**, die sowohl technische Qualität als auch reale Geschäftsanforderungen abbildet.

---

## �� TL;DR

Fullstack-Webanwendung für ein peruanisches Restaurant (Next.js App Router, Prisma, PostgreSQL + Supabase Storage) mit Fokus auf skalierbare Architektur, Server Actions und hochwertige UI/UX.

