# Docify — Document Generation Portal (Frontend)

An Angular web application for generating dynamic PDF documents from templates.

## Features
- User authentication (login/register)
- Create and manage document templates with rich text editor (Quill.js)
- Dynamic placeholder support using {{placeholder}} syntax
- Generate PDF documents by filling in placeholder values
- View and download generated documents
- Document generation history

## Tech Stack
- Angular 21
- TypeScript
- Quill.js (rich text editor)
- JWT authentication
- REST API integration

## Getting Started

### Prerequisites
- Node.js
- Angular CLI

### Setup
1. Clone the repo
2. Run `npm install`
3. Run `ng serve`
4. Open `http://localhost:4200`

### Backend
[Docify Backend](https://github.com/Roshini864/docify-backend)

## Pages
| Page | Route | Description |
|---|---|---|
| Login | /login | User login |
| Register | /register | New user registration |
| Dashboard | /dashboard | Home page with quick actions |
| Templates | /templates | View and manage templates |
| Template Editor | /templates/new | Create or edit templates |
| Generate | /generate/:id | Fill placeholders and generate PDF |
| History | /history | View and download past documents |