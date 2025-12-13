Project 2 — Healthy Lifestyle Hub
Project Description

Healthy Lifestyle Hub is a full-stack web application designed to promote wellness through informative blog posts and a curated product catalog. Users can register, log in, browse content, and submit contact messages, while administrators can manage blog posts and products. The application emphasizes backend functionality, authentication, data persistence, validation, and clean server-side rendering.

Technology Stack vs Project Proposal

This project implements the Healthy Lifestyle Hub concept described in my Project 2 proposal using the technologies originally proposed:

Node.js + Express for the backend server, routing, and middleware (server.js, routes/*).

MongoDB with Mongoose for database persistence and schema-based data modeling (models/User.js, Post.js, Product.js, ContactMessage.js).

Pug as the server-side templating engine for dynamic HTML rendering (views/*).

Sessions and authentication using express-session and connect-mongo, with secure password hashing via bcryptjs.

ES6 JavaScript on both the server and client, including arrow functions, const/let, and template literals.

SASS (SCSS) for modular styling, compiled into CSS (scss/*.scss → public/css/main.css).

Progressive Web App (PWA) features implemented with a web manifest and service worker.

Jest + Supertest for backend route testing.

This confirms that the coding process followed the technologies committed to in the original proposal.

Module 3 Requirement Mapping

Requirement → Implementation

Node.js + Express backend
Implemented via server.js with modular routes under routes/.

MongoDB + Mongoose
Data models for users, blog posts, products, and contact messages defined in models/.

User authentication and sessions
Registration, login, and logout handled in routes/auth.js, with session persistence via MongoDB and route protection using custom middleware.

Role-based access control (admin)
Admin role stored on the User model and enforced using ensureAdmin middleware for product management routes.

CRUD functionality

Blog posts: create, list, view, edit, delete (routes/posts.js, views/posts/).

Products: create, list, view, edit, delete (routes/products.js, views/products/).

Contact form with validation and persistence
Implemented in routes/contact.js, validated on both client and server, and stored in the contactmessages MongoDB collection.

Input validation

Server-side validation for required fields and message length across authentication, posts, products, and contact routes.

Client-side required-field validation for the contact form using ES6 JavaScript.

Password security
User passwords hashed using bcryptjs; no plaintext passwords stored.

Session security
HTTP-only cookies and MongoDB-backed session storage used.

ES6 compliance
Modern JavaScript syntax used consistently across backend and frontend.

SASS/LESS requirement
SCSS partials compiled into a single CSS file using npm run sass.

PWA features
Web app manifest and service worker implemented and registered in the main layout.

Testing
Jest and Supertest used to verify backend routes (tests/app.test.js).

Wireframes vs Implementation

The implemented layout follows the wireframes created in Module 3:

The Home page includes a hero section at the top, followed by two columns displaying the latest blog posts and featured products.

The Navigation bar matches the wireframe layout, with the application name on the left and navigation/authentication links on the right.

The Blog and Product pages use card-style layouts consistent with the wireframe structure.

The Login and Registration pages follow the planned centered form layout.

The Contact page includes Name, Email, and Message fields exactly as defined in the wireframes.

Minor visual adjustments (such as spacing and card styling) were introduced to improve readability while preserving the original wireframe structure.

How to Run the Project
npm install
npm run sass
npm run dev


Application runs at:

http://127.0.0.1:3000

Run Tests
npm test

Known Limitations

Image uploads are not implemented; images are referenced by URL.

Frontend styling is intentionally minimal, with emphasis placed on backend functionality per project requirements.