## Supplements Shop - eCommerce Platform

eCommerce platform built using the MERN stack (MongoDB, Express, React, Node.js), TypeScript, Tailwind and Redux Toolkit.

### Overview

Supplements Shop is designed to simulate a real-world shopping experience with features like product management, user authentication, payment integration, and more. This project serves as a portfolio piece to showcase full-stack development skills, including modern technologies and best practices.

### Features

Shopping Cart with quantity adjustments
Product Reviews & Ratings
Top Products Carousel
Product Pagination & Search
User Profile & Order Management
Admin Dashboard for managing products, users, and orders
Secure JWT Authentication
PayPal & Credit Card Integration
Database Seeding for easy setup
Dockerized Environment for seamless deployment

### Project Setup (Using Docker)

1.git clone https://github.com/dumialex32/e-commerce-fitness-supplements.git

2.cd supplements-shop

3.Set Up Environment Variables

4.Create a .env file in the root directory using the provided .env.example as a template.

5.To start the backend, frontend, and MongoDB services:
docker-compose up --build

6.Seed or Destroy the Database (Optional):
docker exec -it backend npm run data:import
docker exec -it backend npm run data:destroy

7.Access the Application:
The frontend runs at http://localhost:5173
The backend API runs at http://localhost:5000/api

8.Stopping & Cleaning Up
To stop and remove all containers, networks, and volumes:
docker-compose down -v
docker system prune -a
