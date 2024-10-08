
# ShoppyGlobe Backend

ShoppyGlobe-Backend is the server-side API for the ShoppyGlobe e-commerce application. It is built with Node.js, Express.js, and MongoDB. This backend provides the necessary API endpoints for product management, cart management, user authentication, and more.

## Features

- **User Authentication**: JWT-based authentication for securing user sessions.
- **Product Management**: API endpoints for creating, updating, and managing products.
- **Cart Management**: API endpoints for adding, updating, and removing items from the shopping cart.
- **MongoDB Integration**: Mongoose ODM for managing database operations.

---

## Requirements

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- npm (or yarn)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/skoop7/ShoppyGlobe-Backend.git
   cd ShoppyGlobe-Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following configuration:

   ```bash
   PORT=5000
   MONGO_URI=your_mongo_db_uri_here
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

---

## API Endpoints

### User Authentication

- **Register a User:**
  - `POST /api/users/register`
  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

- **Login a User:**
  - `POST /api/users/login`
  - Request Body:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

### Product Management

- **Get All Products:**
  - `GET /api/products`
  - Returns a list of products available in the store.

- **Create a New Product:**
  - `POST /api/products`
  - Requires admin privileges.
  - Request Body:
    ```json
    {
      "name": "Wireless Headphones",
      "price": 59.99,
      "description": "High-quality Bluetooth headphones",
      "stock": 100
    }
    ```

### Cart Management

- **Add to Cart:**
  - `POST /api/cart`
  - Request Body:
    ```json
    {
      "productId": "60df5f69f1b1f72efc1c6ad4",
      "quantity": 2
    }
    ```

- **Update Cart Item:**
  - `PUT /api/cart/:id`
  - Request Body (Optional - only fields to update):
    ```json
    {
      "quantity": 3
    }
    ```

- **Remove from Cart:**
  - `DELETE /api/cart/:id`

### Order Management

- **Create an Order:**
  - `POST /api/orders`
  - Request Body:
    ```json
    {
      "cartItems": [
        {
          "productId": "60df5f69f1b1f72efc1c6ad4",
          "quantity": 2
        }
      ],
      "shippingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "postalCode": "10001",
        "country": "USA"
      },
      "paymentMethod": "Credit Card"
    }
    ```

---

## Middleware

- **authMiddleware:** Ensures that only authenticated users can access certain routes. It checks for a valid JWT token in the `Authorization` header.

---

## Folder Structure

```
ShoppyGlobe-Backend/
├── controller/          # Business logic and API controllers
├── middleware/           # Custom middleware (e.g., auth)
├── models/               # Mongoose schemas and models
├── routes/               # API routes
├── .gitignore            # Ignored files and directories
├── server.js             # Entry point of the application
└── package.json          # Project metadata and dependencies
```

