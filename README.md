# Hire-bridge-backend-api
Backend API for HIRE BRIDGE - Nigeria's smart recruitment platform. Enables fast skill-based matching, job posting, applications, real-time messaging, and transparent hiring workflows for recruiters and candidates.

It allows recruiters to:

- Post job openings
- Receive and manage applications
- Track candidates through hiring stages
- Search and filter applicants
- View basic hiring statistics

This system replaces manual applicant tracking and disorganized recruitment processes with a structured digital solution.


# Tech Stack

+ Core Technologies

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Git & GitHub (Version Control)

+ Supporting Libraries

- bcryptjs — Password hashing
- nodemailer — Email notifications
- multer — File uploads (CV/Resume)


# Key Features

**Authentication**

- Recruiter registration
- Secure login with JWT
- Protected routes
- Password hashing with bcrypt

**Job Management**

- Create job postings
- View recruiter job listings
- Manage job details
- Candidate Management
- Apply for job (with resume upload)
- View applicants per job
- Move candidates across stages:
    - Applied
    - Shortlisted
    - Interview
    - Hired
    - Rejected

**Search & Filtering**

- Filter candidates by stage
- Search by keywords
- Filter by job role

**Notifications**

- Email notifications for:
- Application submissions
- Stage updates

**Hiring Analytics**

- Total applicants
- Hired candidates
- Stage distribution statistics

# Project Structure

├── config
├── controllers
├── middlewares
├── models
├── routes
├── services
├── utils
├── .env
├── index.js
└── package.json

# Installation & Setup

**Clone the repository**

git clone https://github.com/Sola-ayomide/Hire-bridge-backend-api.git
cd HIRE-BRIDGE-BACKEND-API

**Install Dependencies**

npm install

**Configure environment variables**

Create a .env file

**Run the server**

npm run dev

# API Endpoints Overview

**Auth Routes**

- POST /api/v1/auth/register
- POST /api/v1/auth/login

**Job Routes**

- POST /api/v1/jobs
- GET /api/v1/jobs
- GET /api/v1/jobs/:id

**Candidate Routes**
- POST /api/v1/jobs/:jobId/apply
- GET /api/v1/jobs/:jobId/applicants
- PATCH /api/v1/candidates/:id/stage

**Analytics**

- GET /api/v1/stats

**Security Features**

- Password hashing using bcrypt
- JWT-based authentication
- Protected recruiter-only routes
- Secure file upload handling
- Centralized error handling middleware
