# Project 2 – Healthy Lifestyle Hub

## Project Description

Healthy Lifestyle Hub is a full-stack web application designed to promote wellness through informative blog posts and a curated product catalog. Users can register, log in, browse content, and submit contact messages, while administrators can manage blog posts and products. The application emphasizes backend functionality, authentication, data persistence, validation, and clean server-side rendering.

---

## Technology Stack vs Project Proposal

This project implements the **Healthy Lifestyle Hub** concept described in my Project 2 proposal using the technologies originally proposed:

- **Node.js + Express** for the backend server, routing, and middleware (`server.js`, `routes/*`).
- **MongoDB with Mongoose** for database persistence and schema-based data modeling (`models/User.js`, `Post.js`, `Product.js`, `ContactMessage.js`).
- **Pug** as the server-side templating engine for dynamic HTML rendering (`views/*`).
- **Sessions and authentication** using `express-session` and `connect-mongo`, with secure password hashing via `bcryptjs`.
- **ES6 JavaScript** on both the server and client, including arrow functions, `const`/`let`, and template literals.
- **SASS (SCSS)** for modular styling, compiled into CSS (`scss/*.scss` → `public/css/main.css`).
- **Progressive Web App (PWA)** features implemented using a web manifest and service worker.
- **Jest + Supertest** for backend route testing.

This confirms that the coding process followed the technologies committed to in the original proposal.

---

## Module 3 Requirement Mapping

**Requirement → Implementation**

- **Node.js + Express backend**  
  Implemented via `server.js` with modular route files under `routes/`.

- **MongoDB + Mongoose**  
  Data models for users, blog posts, products, and contact messages defined under `models/`.

- **User authentication and sessions**  
  Registration, login, and logout implemented in `routes/auth.js`, with session persistence via MongoDB and route protection using custom authentication middleware.

- **Role-based access control (admin)**  
  Admin role stored on the User model and enforced using `ensureAdmin` middleware for product creation, editing, and deletion.

- **CRUD functionality**
  - **Blog posts**: create, list, view, edit, and delete (`routes/posts.js`, `views/posts/`).
  - **Products**: create, list, view, edit, and delete (`routes/products.js`, `views/products/`).

- **Contact form with validation and persistence**  
  Contact form implemented in `routes/contact.js`, validated on both client and server, and stored in the `contactmessages` MongoDB collection.

- **Input validation**
  - Server-side validation for required fields and minimum message length across authentication, posts, products, and contact routes.
  - Client-side required-field validation for the contact form using ES6 JavaScript.

- **Password security**  
  User passwords hashed using `bcryptjs`; no plaintext passwords are stored.

- **Session security**  
  HTTP-only cookies and MongoDB-backed session storage implemented in `server.js`.

- **ES6 compliance**  
  Modern JavaScript syntax used consistently across backend and frontend code.

- **SASS/LESS requirement**  
  SCSS partials (`_layout.scss`, `_forms.scss`, `_cards.scss`) compiled into a single CSS file using `npm run sass`.

- **PWA features**  
  Web app manifest and service worker implemented and registered in the main layout template.

- **Testing**  
  Jest and Supertest used to verify backend routes, including a health-check endpoint (`tests/app.test.js`).

---

## Wireframes vs Implementation

The implemented layout follows the wireframes created in Module 3:

- The **Home page** includes a hero section at the top, followed by two columns displaying the latest blog posts and featured products.
- The **Navigation bar** aligns with the wireframe design, placing the application title on the left and navigation/authentication links on the right.
- The **Blog** and **Product** pages use card-style layouts consistent with the wireframe structure.
- The **Login and Registration** pages follow the planned centered form layout.
- The **Contact** page includes Name, Email, and Message fields exactly as defined in the wireframes.

Minor visual adjustments (such as spacing and card styling) were introduced to improve readability while preserving the original wireframe structure.

---

## How to Run the Project

Install dependencies:

```bash
npm install
npm run sass
npm run dev
