# Supplements Shop - eCommerce Platform

Welcome to Supplements Shop, a comprehensive eCommerce platform built using the MERN stack (MongoDB, Express, React, Node.js), TypeScript and Redux Toolkit.

## Overview

Supplements Shop is a robust eCommerce application designed to simulate a real-world shopping experience. The project includes a wide range of features and functionality, from product management to user authentication.

This project is part of my personal portfolio, showcasing my skills and expertise in full-stack development. It demonstrates my ability to build complex web applications from the ground up, utilizing modern technologies and best practices.

### Features

- **Shopping Cart**: Full-featured cart with support for quantity adjustments.
- **Product Reviews and Ratings**: Customers can leave reviews and rate products.
- **Top Products Carousel**: Showcase popular products in a dynamic carousel.
- **Product Pagination**: Efficiently manage and display large product catalogs.
- **Product Search**: Find products quickly with a search feature.
- **User Profile**: View and manage orders from a personal user profile.
- **Admin Management**:
  - **Product Management**: Add, edit, and delete products.
  - **User Management**: View and manage user accounts.
  - **Order Details**: Admin view of order details with a mark as delivered option.
- **Checkout Process**: Handle shipping, payment methods, and more.
- **Payment Integration**: Support for PayPal and credit card payments.
- **Custom Database Seeder**: Script for initializing and populating the database.

### Showcase Objectives

By completing this project, I aim to demonstrate practical experience in the following areas:

- **React**: Developing dynamic user interfaces using functional components and hooks, ensuring a responsive and interactive user experience.
- **React Router**: Implementing client-side navigation to enable seamless transitions between different views and pages within the application.
- **Redux Toolkit**:
  - **State Management**: Creating and managing global state using `createSlice` to define reducers and actions.
  - **API Integration**: Utilizing `createApi` from Redux Toolkit Query (RTK Query) to handle data fetching, caching, and synchronization with the backend API.
  - **Async Operations**: Handling asynchronous operations and side effects efficiently with Redux Toolkit.
- **Express**: Building and managing a robust backend API with Express to handle client requests, including CRUD operations and user authentication.
- **MongoDB & Mongoose**: Designing and interacting with a MongoDB database using Mongoose ODM to manage data models, relationships, and queries.
- **JWT Authentication**: Implementing secure user authentication and authorization with JSON Web Tokens (JWT) to protect sensitive routes and data.
- **Error Handling**: Developing custom middleware for comprehensive error handling to manage and report errors effectively throughout the application.
- **Payment Integration**: Integrating with PayPal and handling credit card payments to provide a secure and seamless checkout process for users.
- **Project Deployment**: Preparing and deploying the application to production environments, ensuring performance, security, and scalability.

### INSTALL GUIDE

1. **Clone or download the repository**

- Clone the repository using:

```bash
git clone https://github.com/dumialex32/e-commerce-fitness-supplements.git
```

-Download the ZIP file and extract it to your desired location.

2. **Install backend dependencies**

```bash
cd frontend
npm install
```

3. **Install frontend dependencies**

```bash
cd frontend
npm install
```

4. **Environment variables setup**

- Create a .env file in the root directory using the provided .env.example file as a template, replacing the placeholder values with your actual values.

- Ensure the following variables are set:
  NODE_ENV=development
  PORT=<your_backend_port>
  MONGO_URI=<your_mongodb_connection_uri>
  JWT_SECRET=<your_jwt_secret>

5. **Database setup**

- Make sure you have MongoDB installed and running on your machine or hosted online.
- If you need to seed the database with initial dummy data use:

```bash
npm run data:import
```

- If you need to clear the database data, use:

```bash
npm run data:destroy
```

6. **Start the development server**

- Ensure you're at the root of your project.
- Run the following command to start both the backend and frontend simultaneously:

```bash
npm run dev
```
