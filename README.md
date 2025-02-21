# Supplements Shop - eCommerce Platform

eCommerce platform built using the MERN stack (MongoDB, Express, React, Node.js), TypeScript, Tailwind CSS, and Redux Toolkit.

## Overview

Supplements Shop is designed to simulate a real-world shopping experience with features like product management, user authentication, payment integration, and more. This project serves as a portfolio piece to showcase full-stack development skills, including modern technologies and best practices.

## Features

- **Shopping Cart** with quantity adjustments
- **Product Reviews & Ratings**
- **Top Products Carousel**
- **Product Pagination & Search**
- **User Profile & Order Management**
- **Admin Dashboard** for managing products, users, and orders
- **Secure JWT Authentication**
- **PayPal & Credit Card Integration**
- **Database Seeding** for easy setup
- **Dockerized Environment** for seamless deployment

## Project Setup (Using Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/dumialex32/e-commerce-fitness-supplements.git
```

### 2.Navigate to the Project Folder

```bash
cd supplements-shop
```

### 3.Set Up Environment Variables

Create a .env file in the root directory using the provided .env.example as a template.

### 4.Start the Backend, Frontend, and MongoDB Services

```bash
docker-compose up --build
```

### 5.Seed or Destroy the Database (Optional)

```bash
docker exec -it backend npm run data:import
docker exec -it backend npm run data:destroy
```

### 6.Access the Application

- The frontend will be available at: http://localhost:5173 or http://localhost:[your-frontend-port]
- The backend API will be available at: http://localhost:5000/api or http://localhost:[your-backend-port]/api
