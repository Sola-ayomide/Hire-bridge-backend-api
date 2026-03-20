# Hire Bridge Backend API

A RESTful backend API for **Hire Bridge** — a web-based recruitment platform that connects recruiters with candidates, eliminates broken communication, accelerates job matching, and improves hiring transparency.

## Table of Contents

- Overview
- Tech Stack
- Project Structure
- Getting Started
- Environment Variables
- Authentication
- API Endpoints
  - Auth
  - Jobs
  - Applications
  - Candidate Profile
  - Candidate Dashboard
  - Recruiter Dashboard
- Matching Service
- Error Handling
- Deployment


## Overview

Hire Bridge provides two distinct user roles:

- Recruiter — can post jobs, manage applications, view candidate pipelines and dashboard analytics.
- Candidate — can build a profile, browse and apply for jobs, track applications, and receive job recommendations based on skill matching.

## Tech Stack

| Layer | Technology |
| Runtime | Node.js v22 |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JSON Web Tokens (JWT) |
| File Uploads | Multer (local disk storage) |
| Email | Nodemailer (Gmail SMTP) |
| Password Hashing | bcryptjs |
| Logging | Morgan |
| Environment | dotenv |


## Project Structure

```
├── config/
│   ├── connectDB.js          # MongoDB connection
│   └── emailConfig.js        # Nodemailer transporter
├── controllers/
│   ├── auth.controller.js
│   ├── job.controller.js
│   ├── application.controller.js
│   ├── dashboard.controller.js
│   ├── candidate.profile.controller.js
│   ├── candidate.basicInfo.controller.js
│   ├── candidate.experience.controller.js
│   ├── candidate.education.controller.js
│   ├── candidate.skills.controller.js
│   └── candidate.dashboard.controller.js
├── middlewares/
│   ├── auth.middleware.js     # JWT protect + role authorization
│   ├── upload.middleware.js   # Multer file upload
│   └── error.handler.js      # Global error handler
├── models/
│   ├── recruiter.model.js
│   ├── candidate.model.js
│   ├── candidate.profile.model.js
│   ├── job.model.js
│   └── application.model.js
├── routes/
│   ├── auth.routes.js
│   ├── job.routes.js
│   ├── application.routes.js
│   ├── dashboard.routes.js
│   ├── candidate.profile.routes.js
│   └── candidate.dashboard.routes.js
├── services/
│   └── matchingService.js    # Skill-based job matching algorithm
├── utils/
│   ├── calculateProfileCompletion.js
│   ├── emailService.js
│   └── generate.token.js
├── uploads/                  # Local resume storage (Multer)
├── index.js                  # App entry point
└── .env
```


## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email service

### Installation

# Clone the repository
git clone https://github.com/your-username/hire-bridge-backend.git
cd hire-bridge-backend

# Install dependencies
npm install 

# Start development server
npm run dev


The server starts on `http://localhost:5000`.


## Environment Variables

Create a `.env` file in the root directory with the following:

# Server
PORT=5000

# Database
MONGODB_URI

# Email (Gmail)
EMAIL_USER
EMAIL_PASS

# JWT
JWT_SECRET
JWT_EXPIRATION

## Authentication

Hire Bridge uses **JWT Bearer token** authentication.

All protected routes require the following header:

```
Authorization: Bearer <your_token>
```

Tokens are returned on registration and login. They expire based on `JWT_EXPIRATION` in your `.env`.

### Roles

| Role | Access |
| `recruiter` | Create/manage jobs, view applications, recruiter dashboard |
| `candidate` | Apply for jobs, manage profile, candidate dashboard |

---

## API Endpoints

**Base URL (Production):** `https://momentis.onrender.com/api/v1`

**Base URL (Local):** `http://localhost:5000/api/v1`

---

### Auth

#### POST `/auth/recruiter/register`
Register a new recruiter account.

**Auth required:** No

**Request body:**
```json
{
  "firstName": "Tunde",
  "lastName": "Bakare",
  "country": "Nigeria",
  "state": "Lagos",
  "phone": "08012345678",
  "gender": "male",
  "jobTitle": "Head of Talent",
  "business": "TechCorp Nigeria",
  "website": "https://techcorp.ng",
  "industry": "Technology",
  "companySize": "51-200",
  "location": "Lagos, Nigeria",
  "description": "A fast-growing tech company.",
  "yearsInRecruitment": "5",
  "primaryHiringAreas": ["Engineering", "Design"],
  "linkedinProfile": "https://linkedin.com/in/tundebakare",
  "email": "tunde@techcorp.ng",
  "password": "SecurePass123"
}
```

**Required fields:** `firstName`, `lastName`, `country`, `state`, `phone`, `business`, `industry`, `location`, `email`, `password`

---

#### POST `/auth/candidate/register`
Register a new candidate account.

**Auth required:** No

**Request body:**
```json
{
  "name": "Amaka Okonkwo",
  "email": "amaka@gmail.com",
  "password": "MyPass1234"
}
```

---

#### POST `/auth/login`
Login for both recruiters and candidates.

**Auth required:** No

**Request body:**
```json
{
  "email": "amaka@gmail.com",
  "password": "MyPass1234"
}
```

**Response includes:** JWT token — store this for all subsequent protected requests.

---

#### GET `/auth/match`
Match candidates to jobs based on skill scores.

**Auth required:** Recruiter token

**Request body:** None

---

### Jobs

#### GET `/jobs/all`
Browse all active job listings. Public route.

**Auth required:** No

**Query parameters:**

| Param | Type | Description |
| `search` | string | Search by title, skills, location, or company |
| `jobType` | string | `full-time` \| `part-time` \| `remote` \| `hybrid` \| `contract` |
| `location` | string | Partial match, case-insensitive |
| `sort` | string | `popular` to sort by views (default: newest first) |

**Example:** `/jobs/all?search=react&jobType=full-time&location=Lagos`

---

#### GET `/jobs/:id`
Get a single job by ID. Increments the view count on every call.

**Auth required:** No

---

#### POST `/jobs`
Create a new job listing.

**Auth required:** Recruiter token

**Request body:**
```json
{
  "title": "Senior Frontend Engineer",
  "description":"We are looking for a skilled frontend engineer to join our product team.",
  "requiredSkills": ["React", "TypeScript", "CSS", "REST APIs"],
  "experienceLevel": "senior",
  "location": "Lagos, Nigeria",
  "jobType": "hybrid",
  "department": "Engineering",
  "minimumQualifications": ["3+ years React experience"],
  "preferredQualifications": ["Experience with Next.js"],
  "salary": 300000
}
```

**Required fields:** `title`, `description`, `experienceLevel`, `location`

**`experienceLevel` enum:** `junior` | `mid-level` | `senior`

---

#### PATCH `/jobs/:id`
Update an existing job listing.

**Auth required:** Recruiter token

**Request body:** Send only the fields to update.
```json
{
  "title": "Lead Frontend Engineer",
  "salary": 350000,
  "jobType": "remote"
}
```

---

#### PATCH `/jobs/:id/deactivate`
Deactivate a job. Sets status to `inactive` — job will no longer appear in public listings.

**Auth required:** Recruiter token

**Request body:** None

---

#### GET `/jobs`
Get all jobs posted by the logged-in recruiter, with applicant counts.

**Auth required:** Recruiter token

**Request body:** None

---

### Applications

#### POST `/applications/:jobId/apply`
Apply for a job. Requires a resume file upload.

**Auth required:** Candidate token

**Content-Type:** `multipart/form-data`

**Form fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `resume` | File | Yes | PDF or Word document only |
| `experience` | Number | No | Years of experience (defaults to 0) |

> In Postman: Body → form-data → set `resume` key type to **File** and attach your document.

---

### Candidate Profile

#### POST `/candidate/profile`
Create a candidate profile. Only one profile per candidate is allowed.

**Auth required:** Candidate token

**Request body:** `{}` (empty body is valid — profile starts empty)

---

#### GET `/candidate/profile/me`
Get the full profile of the logged-in candidate.

**Auth required:** Candidate token

**Request body:** None

---

#### PATCH `/candidate/profile/personal-details`
Update name, professional headline, location, and portfolio link.

**Auth required:** Candidate token

**Request body:**
```json
{
  "fullName": "Amaka Okonkwo",
  "professionalHeadline": "Full Stack Developer",
  "location": "Lagos",
  "portfolioLink": "https://amaka.dev"
}
```

---

#### PATCH `/candidate/profile/contact-info`
Update contact email or phone number.

**Auth required:** Candidate token

**Request body:**
```json
{
  "email": "amaka.new@gmail.com",
  "phoneNumber": "08098765432"
}
```

At least one field is required.

---

#### PATCH `/candidate/profile/summary`
Update the professional summary.

**Auth required:** Candidate token

**Request body:**
```json
{
  "summary": "Full Stack Developer with 4 years of experience building scalable web applications using React, Node.js, and MongoDB."
}
```

Max 1000 characters.

---

#### POST `/candidate/profile/experience`
Add a work experience entry.

**Auth required:** Candidate token

**Request body:**
```json
{
  "title": "Frontend Developer",
  "employmentType": "full-time",
  "company": "Andela Nigeria",
  "currentlyWorking": false,
  "startDate": "2021-06-01",
  "endDate": "2023-08-31",
  "location": "Lagos, Nigeria",
  "locationType": "hybrid"
}
```

**Required fields:** `title`, `employmentType`, `company`, `startDate`

**`employmentType` enum:** `full-time` | `part-time` | `contract` | `internship` | `freelance` | `volunteer`

**`locationType` enum:** `on-site` | `remote` | `hybrid`

> Do not send `endDate` if `currentlyWorking` is `true`.

---

#### PATCH `/candidate/profile/experience/:experienceId`
Update an existing experience entry.

**Auth required:** Candidate token

**Request body:** Send only fields to update.
```json
{
  "title": "Senior Frontend Developer",
  "currentlyWorking": true,
  "endDate": null
}
```

---

#### DELETE `/candidate/profile/experience/:experienceId`
Remove a work experience entry.

**Auth required:** Candidate token

**Request body:** None

---

#### POST `/candidate/profile/education`
Add an education entry.

**Auth required:** Candidate token

**Request body:**
```json
{
  "school": "University of Lagos",
  "degree": "second class upper honours",
  "fieldOfStudy": "Computer Science",
  "grade": "4.2/5.0",
  "startDate": "2016-09-01",
  "endDate": "2020-06-30"
}
```

**Required fields:** `degree`, `school`

**`degree` enum:** `first class honours` | `second class upper honours` | `second class lower honours` | `third class honours` | `pass`

---

#### PATCH `/candidate/profile/education/:educationId`
Update an education entry.

**Auth required:** Candidate token

**Request body:** Send only fields to update.
```json
{
  "grade": "4.5/5.0",
  "degree": "first class honours"
}
```

---

#### DELETE `/candidate/profile/education/:educationId`
Remove an education entry.

**Auth required:** Candidate token

**Request body:** None

---

#### POST `/candidate/profile/skills`
Add a single skill to the candidate's skills list.

**Auth required:** Candidate token

**Request body:**
```json
{
  "skill": "React"
}
```

Duplicate skills (case-insensitive) are rejected.

---

#### DELETE `/candidate/profile/skills/:skill`
Remove a skill by name.

**Auth required:** Candidate token

**Request body:** None — skill name is passed in the URL.

**Example:** `DELETE /candidate/profile/skills/React`

---

#### PATCH `/candidate/profile/resume`
Update resume file reference and links.

**Auth required:** Candidate token

**Request body:**
```json
{
  "file": {
    "url": "https://res.cloudinary.com/demo/raw/upload/resume.pdf",
    "publicId": "resume_amaka_001"
  },
  "portfolioLink": "https://amaka.dev",
  "linkedinProfile": "https://linkedin.com/in/amakaokonkwo",
  "personalWebsite": "https://amaka.dev"
}
```

---

#### PATCH `/candidate/profile/visibility`
Control profile visibility settings.

**Auth required:** Candidate token

**Request body:**
```json
{
  "openToWork": true,
  "visibleToRecruiters": true,
  "privateAccount": false
}
```

---

#### PATCH `/candidate/profile/job-preferences`
Set job search preferences.

**Auth required:** Candidate token

**Request body:**
```json
{
  "desiredJobRole": "Frontend Engineer",
  "preferredLocation": "Lagos",
  "preferredWorkType": "hybrid",
  "employmentType": "full-time",
  "expectedSalaryRange": "$3,000 - $5,000",
  "availability": "within 2 weeks"
}
```

**`preferredLocation` enum:** `Lagos` | `Abuja` | `Port-harcourt` | `Ogun` | `Ibadan`

**`preferredWorkType` enum:** `remote` | `on-site` | `hybrid`

**`expectedSalaryRange` enum:** `$0 - $1,000` | `$1,000 - $2,000` | `$2,000 - $3,000` | `$3,000 - $5,000` | `$5,000+`

**`availability` enum:** `immediately` | `within 1 week` | `within 2 weeks` | `within 1 month` | `not available`

---

### Candidate Dashboard

All routes require a candidate token.

#### GET `/candidate/dashboard/stats`
Returns application counts by stage.

**Response:**
```json
{
  "status": "success",
  "data": {
    "applicationsSent": 5,
    "shortlisted": 2,
    "interviewsScheduled": 1
  }
}
```

---

#### GET `/candidate/dashboard/applications`
Returns the most recent 5 applications with job details populated.

---

#### GET `/candidate/dashboard/recommended-jobs`
Returns up to 5 active jobs matched against the candidate's skills, sorted by match score. Only jobs with at least 30% skill match are returned.

> Requires skills to be added to the profile first.

---

#### GET `/candidate/dashboard/profile-completion`
Returns the current profile completion percentage (0–100).

---

### Recruiter Dashboard

All routes require a recruiter token.

#### GET `/dashboard/stats`
Returns active job count, total applicants, and shortlisted count for the logged-in recruiter.

---

#### GET `/dashboard/pipeline`
Returns application counts grouped by stage (`applied`, `shortlisted`, `interview`, `offered`, `rejected`).

---

#### GET `/dashboard/recent-applicants`
Returns the 5 most recent applications received, with job title populated.

---

## Matching Service

Hire Bridge includes a skill-based matching algorithm in `services/matchingService.js`.

### How it works

1. The candidate's skills array is compared against a job's `requiredSkills` array.
2. Each matched skill (case-insensitive) contributes to the score.
3. Score formula: `(matchedSkills.length / jobSkills.length) * 100`
4. Scores are rounded to the nearest integer.

### Thresholds

| Context | Minimum score to appear |
|---|---|
| Recommended jobs (dashboard) | 30% |
| Auth match endpoint | 50% |

---

## Error Handling

All errors are handled by the global error handler in `middlewares/error.handler.js`.

### Standard error response shape

```json
{
  "status": "error",
  "message": "Description of what went wrong"
}
```

### Common HTTP status codes

| Code | Meaning |
|---|---|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request / validation error |
| `401` | Unauthorized — missing or invalid token |
| `403` | Forbidden — wrong role |
| `404` | Resource not found |
| `500` | Internal server error |

### JWT errors

| Error | Response |
|---|---|
| Invalid token | `401 — Token is invalid or expired` |
| Expired token | `401 — Your token has expired. Please log in again.` |

---

## Deployment

The API is deployed on **Render**.

**Production base URL:** `https://momentis.onrender.com/api/v1`

### Notes on Render's free tier

- The server spins down after 15 minutes of inactivity.
- The first request after inactivity may take 30–60 seconds to respond while the server cold-starts.
- Subsequent requests will be fast once the server is awake.

---

## Email Notifications

Hire Bridge sends transactional emails via Nodemailer (Gmail SMTP):

| Email | Trigger |
|---|---|
| Welcome email | On successful registration (recruiter or candidate) |
| Password reset | On password reset request |

Email templates are defined in `utils/emailService.js`.

---

## License

This project is private and proprietary to the Hire Bridge team.
