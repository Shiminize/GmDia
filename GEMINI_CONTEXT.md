# Project Context for Gemini CLI

This document summarizes the current state of the GmDia project, including task statuses, project structure, API endpoints, and database changes. This is intended to provide context for future interactions with the Gemini CLI.

---

## 1. Current Task List & Status

| ID | Task | Status |
| :-- | :--- | :--- |
| **1** | **Project Setup & Foundation** | **Complete** |
| 1.1 | Initialize `pnpm` monorepo | Complete |
| 1.2 | Set up `client` and `server` packages | Complete |
| 1.3 | Configure root `package.json` | Complete |
| 1.4 | Establish version control with Git | Complete |
| **2** | **Brand Identity & UI Kit** | **Complete** |
| 2.1 | Develop a basic UI component library | Complete |
| 2.2 | Create reusable layout components | Complete |
| 2.3 | Implement the "Modern Alchemy & Personal Radiance" visual theme | Complete |
| **3** | **Onboarding & Navigation** | **Complete** |
| 3.1 | Implement the sticky global navigation header | Complete |
| 3.2 | Create the mega menu/dropdown structure | Complete |
| 3.3 | Implement the core search bar functionality (UI only) | Complete |
| **4** | **Product Discovery & Browse** | **Complete** |
| 4.1 | Build category pages to display products | Complete |
| 4.2 | Implement filtering and sorting functionality (by metal, diamond shape, price) | Complete |
| 4.3 | Create the product "Quick View" modal | Complete |
| **5** | **Interactive 3D Customization Experience** | **Complete** |
| 5.1 | 3D Viewer Setup | Complete |
| 5.2 | Step-by-Step Customization UI | Complete |
| 5.3 | Real-time Configuration Logic | Complete |
| 5.4 | Feature Integration | Complete |
| **6** | **Product Detail Pages (PDPs)** | **Complete** |
| 6.1 | Create the layout for the PDP | Complete |
| 6.2 | Integrate user reviews and ratings section | Complete |
| 6.3 | Add a "Related/Recommended Products" component | Complete |
| **7** | **Cart & Checkout** | **Complete** |
| 7.1 | Shopping Cart Logic | Complete |
| 7.2 | Checkout Flow | Complete |
| 7.3 | Payment Gateway Integration | Complete |
| 7.4 | Post-Purchase | Complete |
| **8** | **Account & Profile Management** | **Complete** |
| 8.1 | Implement user registration and login forms | Complete |
| 8.2 | Create the user dashboard for viewing order history and managing personal information | Complete |
| 8.3 | Develop the "Saved Designs/Wishlist" functionality | Complete |
| **9** | **Content & Brand Storytelling** | **Complete** |
| 9.1 | Create `BlogPage.tsx` to list blog posts | Complete |
| 9.2 | Create `BlogPost.tsx` to display individual blog posts | Complete |
| 9.3 | Update `App.tsx` with a route for the blog | Complete |
| 9.4 | Update `Header.tsx` to include a link to the blog | Complete |
| **10** | **Customer Support Features** | **Complete** |
| 10.1 | Integrate a third-party live chat widget | Complete |
| 10.2 | Create a "Contact Us" form that sends emails to customer support | Complete |
| **11** | **Backend API & Database** | **Complete** |
| 11.1 | Database Schema Design | Complete |
| 11.2 | Authentication API | Complete |
| 11.3 | Core Logic APIs | Complete |
| 11.3.1 | Product APIs (CRUD) | Complete |
| 11.3.2 | Order APIs | Complete |
| 11.3.3 | Customization APIs | Complete |
| 11.4 | Security | Complete |
| **12** | **Non-Functional Requirements** | **Complete** |
| 12.1 | Performance Optimization | Complete |
| 12.2 | SEO & Analytics | Complete |
| 12.3 | Accessibility | Complete |
| **13** | **Deployment & Launch** | **Complete** |
| 13.1 | Frontend Build Configuration | Complete |
| 13.2 | Backend Production Setup | Complete |
| 13.3 | Cross-Origin Resource Sharing (CORS) Configuration | Complete |
| 13.4 | Basic Deployment Instructions | Complete |

---

## 2. Project Tree Structure

```
/
├── client/
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   ├── src/
│   │   ├── App.tsx
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │       └── index.css
│   │   ├── components/
│   │   │   ├── cart/
│   │   │   │   ├── Cart.tsx
│   │   │   │   └── Checkout.tsx
│   │   │   ├── common/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Header.tsx
│   │   │   ├── customization/
│   │   │   │   ├── Configurator.tsx
│   │   │   │   ├── Step1_Setting.tsx
│   │   │   │   ├── Step2_Metal.tsx
│   │   │   │   ├── Step3_Diamond.tsx
│   │   │   │   └── Step4_Personalization.tsx
│   │   │   └── products/
│   │   │       ├── ProductCard.tsx
│   │   │       ├── ProductDetail.tsx
│   │   │       ├── ProductList.tsx
│   │   │       ├── QuickViewModal.tsx
│   │   │       └── RelatedProducts.tsx
│   │   ├── contexts/
│   │   │   └── CartContext.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── pages/
│   │   │   ├── AboutPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LabDiamondEducationPage.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── Register.tsx
│   │   │   └── SustainabilityPage.tsx
│   │   └── services/
│   │       └── api.ts
│   └── tsconfig.json
├── Introduction.md
├── package.json
├── pnpm-workspace.yaml
├── server/
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   │   ├── customizationController.js
│   │   │   │   ├── orderController.js
│   │   │   │   ├── productController.js
│   │   │   │   └── userController.js
│   │   │   ├── models/
│   │   │   │   ├── CustomDesign.js
│   │   │   │   ├── Order.js
│   │   │   │   ├── Product.js
│   │   │   │   └── User.js
│   │   │   ├── routes/
│   │   │   │   ├── customizationRoutes.js
│   │   │   │   ├── orderRoutes.js
│   │   │   │   ├── productRoutes.js
│   │   │   │   └── userRoutes.js
│   │   │   └── utils/
│   │   │       └── generateToken.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   └── server.js
│   └── .env
```

---

## 3. API Endpoints

### User Authentication & Profiles
*   `POST /api/users/register`: Registers a new user.
*   `POST /api/users/login`: Authenticates a user and returns a token.
*   `GET /api/users/profile`: Retrieves the profile of the currently logged-in user (requires authentication).

### Products
*   `GET /api/products`: Fetches a list of all products.
*   `GET /api/products/:id`: Fetches details for a single product.
*   `POST /api/products`: Creates a new product (Admin only).
*   `PUT /api/products/:id`: Updates an existing product (Admin only).
*   `DELETE /api/products/:id`: Deletes a product (Admin only).

### Orders
*   `POST /api/orders`: Creates a new order (requires authentication).
*   `GET /api/orders/myorders`: Retrieves the order history for the logged-in user (requires authentication).
*   `GET /api/orders/:id`: Retrieves details for a specific order (requires authentication).
*   `PUT /api/orders/:id/pay`: Updates an order to paid status (requires authentication).

### Customization
*   `POST /api/customizations`: Saves a user's custom design (requires authentication).
*   `GET /api/customizations/my-designs`: Retrieves the logged-in user's custom designs (requires authentication).
*   `GET /api/customizations/:id`: Retrieves a specific custom design by ID (publicly accessible for sharing).
*   `DELETE /api/customizations/:id`: Deletes a custom design (requires authentication).

---

## 4. Database Changes: From MongoDB to Supabase (PostgreSQL)

Initially, the plan was to use MongoDB. However, due to local environment issues with MongoDB/Docker, the database choice has been switched to **Supabase**, which uses **PostgreSQL**.

**Impact of this change:**

*   **Database Type:** Switched from NoSQL (MongoDB) to Relational (PostgreSQL).
*   **ORM/Client:** The backend code has been refactored to use `knex.js` and `pg` for PostgreSQL interactions, replacing `mongoose`.
*   **Schema Definition:** Database schemas have been translated into Knex migrations, and the `users`, `products`, `orders`, and `custom_designs` tables have been successfully migrated to Supabase.
*   **API Implementation:** All controller logic that interacts with the database has been updated to use Knex.

**Current Status of Database Integration:**

*   The `server/.env` file has been updated with the `DATABASE_URL` for Supabase (Session Pooler URL).
*   All Mongoose models (`User`, `Product`, `Order`, `CustomDesign`) have been replaced with Knex-based models.
*   Corresponding controllers (`userController`, `productController`, `orderController`, `customizationController`) have been updated to use the new Knex models.
*   The `authMiddleware` has been updated to reflect changes in the `User` model.
*   The `server/src/config/db.js` has been updated to use Knex, and `server/src/server.js` has been updated to reflect these changes.

**Current Issues:**

*   **Local Server Connection:** The Node.js server is still unable to acquire a connection to the PostgreSQL database when run locally, despite the `DATABASE_URL` being verified as working externally (e.g., via `psql`). The error message is consistently "Error connecting to PostgreSQL: Unable to acquire a connection". This suggests a potential issue with local network configuration, firewall settings, or other environmental factors preventing the Node.js application from reaching the Supabase database.
