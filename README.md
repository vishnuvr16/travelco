# TravelCo

TravelCo is a full-stack web application designed to simplify and enhance the process of planning, booking, and managing trips. 

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
  - [Tour packages API](#tours-api)
  - [Bookings API](#bookings-api)
  - [User API](#user-api)
- [Deployment](#deployment)
- [Acknowledgements](#acknowledgements)
  

## Overview
This job portal application demonstrates full-stack development capabilities by combining a React-based frontend, a Node.js/Express.js backend, and MongoDB as the database. It provides a seamless experience for users and admins, featuring tour packages, booking packages and generating invoice, and more.


## Features

### User Features
- View available tour packages.
- Book your favourite package.
- Search tours by location , duration and search filter.

### Admin Features
- Add, edit, or delete tour packages.
- View bookings submitted by users.
- Admin dashboard.

## Tech Stack
- **Frontend:** React, Fetch (for communication)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Deployment:** Vercel (Frontend & Backend)


## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- MongoDB instance (local or cloud-based like MongoDB Atlas)
- Git

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vishnuvr16/travelco.git
   cd JobPortal
2. **Install Dependencies:**
     - For Frontend
       
     ```env
     cd frontend
     npm install
     ```
      - For Backend
        
     ```env
     cd backend
     npm install
     ```
3. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     PORT=8000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET = give_any_secret_key
     FRONTEND_URL = http://localhost:3000
     ```
   - Create a `.env` file in the `frontend` directory with the following:
     ```env
     REACT_APP_API_URL=http://localhost:8000
     ```

4. **Run the application locally:**
   - Start the backend:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8000](http://localhost:8000)

---

## API Documentation

## Users API

### Register
- **Endpoint:** `POST api/auth/register`
- **Description:** Create new user
- **Req body:**
    ```json
  [
    {
      "name": "name",
      "email" : "email",
      "password": "password",
    },
  ]

### Login
- **Endpoint:** `POST api/auth/login`
- **Description:** login existing user
- **Req body:**
    ```json
  [
    {
      "email" : "email",
      "password": "password",
    },
  ]

### Logout
- **Endpoint:** `POST api/auth/logour`
- **Description:** Logout user session


### Tour Packages API

#### Fetch All packages
- **Endpoint:** `GET /api/tour`
- **Description:** Retrieve all tour packages.
- **Response:**
  ```json
  [
    {
      "_id": "tour_id",
      "name": "tour name",
      "location": "location",
      "description": "tour Description",
    },
  ]
#### Get package by Id
- **Endpoint:** `GET /api/tours/:id`
- **Description:** Fetch particular package
- **Response:**
  ```json
  [
    {
      "_id": "tour_id",
      "name": "tour name",
      "location": "location",
      "description": "tour Description",
    }
  ]
#### Add a tour package (Admin)
- **Endpoint:** `POST /api/tours`
- **Description:** Create a new tour package.
- **Headers:**
  ```json
  {
     "name": " ",
      "location": " ",
      "description": " ",
      "duration" : " ",
      "highlights" : " "
  }
#### Edit a package (Admin)
- **Endpoint:** `PUT /api/tours/:id`
- **Description:** Edit a package.
- **Body:**
  ```json
  {
  "name": "Tour Title",
  "duration": "duratin",
  "location": "Location",
  "description": "tour Description"
  }

#### Delete a Package (Admin)
- **Endpoint:** `Delete /api/tours/:id`

### Bookings API

#### Book a tour package
- **Endpoint:** `POST /api/bookings/:id`
- **Description:** Book a tour package.
- **Body:**
  ```json
  {
  "name": "Applicant Name",
  "email": "applicant@example.com",
  "primaryCustomers" : " ",
  "additionalTravelers" : " ",
  "tour_id": "tour_id"
  }

#### View bookings
- **Endpoint:** `Get /api/bookings/:id`
- **Description:** Get all bookings of a package.
- **Body:**
  ```json
  [
    {
    "_id": "application_id",
     "name": "Applicant Name",
      "email": "applicant@example.com",
      "primaryCustomers" : " ",
      "additionalTravelers" : " ",
      "tour_id": "tour_id"
    }
  ]

---

## Deployment
   - Frontend: [Vercel-frontend Deployment Link](https://travelco-five.vercel.app/)
   - Backend: [Vercel-backend Deployment Link](https://travelco-api.vercel.app/)

---

## Acknowledgements

- **React** - JavaScript library for building user interfaces.
- **Node.js** - JavaScript runtime used for backend development.
- **Fetch API** - For handling HTTP requests in the frontend.
  

