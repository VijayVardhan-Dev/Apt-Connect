# AptConnect – A Modern Platform for College Clubs & Student Engagement

AptConnect is a full-stack platform that streamlines club activities, event workflows, and student–faculty coordination. It provides role-based access, approval pipelines, media uploads, and a fully responsive interface built for real college environments.

---

## 📌 Features

### 🎓 Student
- View clubs and join instantly  
- Access posts, events, and announcements  
- Responsive UI for mobile and desktop  

### 👥 Club Admin
- Create & manage club posts  
- Upload images (stored in Cloudinary)  
- Approve/decline student join requests  
- Manage club profile  

### 🧑‍🏫 Faculty / Super Admin
- Approve event requests from clubs  
- Validate posts and announcements  
- Manage all clubs, students, and admins  

### 🔧 Platform Features
- Role-based authentication (Firebase Auth)  
- Secure Node.js backend  
- Firestore database  
- Cloudinary media uploads  
- Fully responsive React frontend  

---

## 🛠 Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js, Firebase Admin SDK, Cloudinary SDK, Multer  
**Database:** Firestore  
**Hosting:**  
- Frontend: Vercel  
- Backend: Render  
- Media: Cloudinary  
- Auth: Firebase  

---

## 🧩 System Architecture

User → React UI → Node.js API → Firestore ↳ Cloudinary (media)

---

## 📁 Project Structure

### Frontend

aptconnect-client/ ├── src/ │    ├── components/ │    ├── pages/ │    ├── layouts/ │    ├── hooks/ │    ├── utils/ │    └── services/ ├── public/ └── vite.config.js

### Backend

aptconnect-server/ ├── src/ │    ├── server.js └── package.json

---

## 📚 Core Modules

### 🔐 Authentication
- Firebase Authentication  
- Token verification using Firebase Admin  
- Protected routes using middleware  

### 🏫 Clubs
- Create, edit, and manage clubs  
- Assign club admins  
- Students join/leave clubs  

### 📰 Posts & Announcements
- Club admins create posts  
- Media uploaded via Cloudinary  
- Firestore stores metadata + URLs

### 💬 Real-Time Chat (New)
- Every club has its own chat room  
- Uses Firestore real-time listeners  
- Messages update instantly  
- Supports: text, images, files  
- Admins can delete messages  
- Optional moderation for faculty 

### 📅 Event Workflow

Club Admin → Submit Event → Published

---

## ⚙️ Environment Variables

### Backend (`.env`)

PORT= CLOUDINARY_CLOUD_NAME= CLOUDINARY_API_KEY= CLOUDINARY_API_SECRET= FIREBASE_PROJECT_ID= FIREBASE_CLIENT_EMAIL= FIREBASE_PRIVATE_KEY=

### Frontend (`.env`)

VITE_BACKEND_URL= VITE_FIREBASE_API_KEY= VITE_FIREBASE_AUTH_DOMAIN= VITE_FIREBASE_PROJECT_ID= VITE_FIREBASE_STORAGE_BUCKET= VITE_FIREBASE_MESSAGING_SENDER_ID= VITE_FIREBASE_APP_ID=

---

## ▶️ Running Locally

### Backend
```bash
cd aptconnect-server
npm install
npm run dev

Frontend

cd aptconnect-client
npm install
npm run dev


---

🔌 Sample API Endpoints

Auth

POST /api/auth/register
POST /api/auth/login

Clubs

GET    /api/clubs
POST   /api/clubs
PUT    /api/clubs/:id
DELETE /api/clubs/:id

Posts

POST /api/posts
GET  /api/posts/:clubId


---

🖼 Media Upload Workflow

1. Frontend sends file → backend (Multer)


2. Backend uploads file to Cloudinary


3. Cloudinary returns secure URL


4. Firestore stores metadata + URL


5. Frontend displays uploaded media




---

🚀 Deployment

Frontend (Vercel)

Automatic deployments from GitHub

Supports SPA routing


Backend (Render)

Auto-deploy on push

Use Render Dashboard for environment variables


Cloudinary

Stores all images securely

Highly scalable



---

📸 Screenshots / Demo




---

🔮 Future Enhancements

Attendance tracking

Certificate generator

Club analytics dashboard

Push notifications

Real-time club chat



---

📄 License

MIT License


---

⭐ Contribute

Pull requests are welcome. Open an issue for any feature request or bug.
