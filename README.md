# CampusConnect

A Full-Stack Student Collaboration Platform built using the MERN Stack.

## Features

* User Authentication & Authorization
* Notes Management System
* Real-Time Chat using Socket.IO
* File Upload & Sharing
* AI-Powered Resume Analyzer
* Admin Dashboard
* User Profiles
* MongoDB Atlas Integration

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication
* Multer

### Database

* MongoDB Atlas
* Mongoose

### AI & File Processing

* Google Gemini API
* PDF-Parse

## Project Structure

CampusConnect
├── client
│ ├── src
│ └── public
├── server
│ ├── routes
│ ├── models
│ ├── controllers
│ └── config

## Installation

### Clone Repository

```bash
git clone https://github.com/RitikaThakur11/CampusConnect.git
```

### Install Dependencies

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm start
```

### Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
GEMINI_API_KEY=YOUR_API_KEY
```

## Resume Highlights

* Developed a full-stack MERN platform for student collaboration featuring notes management, file sharing, user profiles, and administrative controls.
* Implemented real-time communication using Socket.IO, enabling instant messaging and collaborative interaction.
* Built an AI-powered Resume Analyzer that processes PDF resumes and generates ATS-based feedback and recommendations.
* Designed responsive dashboards, secure REST APIs, JWT authentication, and MongoDB-backed data management.


