# Hanu Sports E-commerce Platform

A modern e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) for Hanu Sports.

## Color Palette
- Primary (Yellow): #FFD700
- Secondary (Silver/Grey): #C0C0C0
- Tertiary (Bronze/Brown): #CD7F32
- Accent1 (Dark Orange): #FF8C00
- Accent2 (Red-Orange): #FF4500

## Project Structure

```
prototype/
├── client/           # React frontend application
│   ├── public/
│   │   └── images/  # Static image assets
│   │       ├── products/    # Product images
│   │       ├── banners/     # Banner images
│   │       └── categories/  # Category images
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/      # Page components
│   │   └── ...
└── server/           # Express.js backend application
    ├── models/       # MongoDB models
    ├── routes/       # API routes
    ├── middleware/   # Custom middleware
    └── ...
```

## Image Assets

The application uses a structured image organization system:

### Products Images
Located in `client/public/images/products/`:
- Rugby equipment: `rugby-*.jpg`
- Volleyball gear: `volleyball-*.jpg`
- Field hockey items: `hockey-*.jpg`
- Track & field equipment: `track-*.jpg`
- Soccer gear: `soccer-*.jpg`
- Off-field merchandise: `merch-*.jpg`

### Banner Images
Located in `client/public/images/banners/`:
- Homepage banners
- Category banners
- Promotional banners

### Category Images
Located in `client/public/images/categories/`:
- Sport-specific category thumbnails
- Collection thumbnails

To set up the images:
1. Create the image directories:
   ```bash
   mkdir -p client/public/images/{products,banners,categories}
   ```
2. Copy your product images into the respective directories following the naming convention:
   - Product images should be high-quality JPG/PNG files
   - Recommended size: 800x800px for products
   - Recommended size: 1920x600px for banners
   - Recommended size: 400x400px for category thumbnails

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hanu-sports
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

### Server

- `npm run dev`: Start the server in development mode with nodemon
- `npm start`: Start the server in production mode
- `npm test`: Run the test suite

### Client

- `npm start`: Start the development server
- `npm build`: Build the app for production
- `npm test`: Run the test suite
- `npm run eject`: Eject from Create React App

## API Endpoints

### Products

- `GET /api/products`: Get all products with filters
- `GET /api/products/:id`: Get a single product
- `POST /api/products`: Create a new product (Admin only)
- `PUT /api/products/:id`: Update a product (Admin only)
- `DELETE /api/products/:id`: Delete a product (Admin only)

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current user profile
- `PUT /api/auth/me`: Update user profile

### Orders

- `POST /api/orders`: Create a new order
- `GET /api/orders`: Get user orders (or all orders for admin)
- `GET /api/orders/:id`: Get order details
- `PUT /api/orders/:id/status`: Update order status (Admin only)
- `PUT /api/orders/:id/pay`: Update order to paid
- `POST /api/orders/:id/cancel`: Cancel an order

## Features

- User authentication and authorization
- Product catalog with filtering and pagination
- Shopping cart functionality
- Order management
- Admin dashboard
- Responsive design
- Rating and review system

## Tech Stack

- **Frontend**:
  - React
  - Material-UI
  - React Router
  - Context API for state management

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 