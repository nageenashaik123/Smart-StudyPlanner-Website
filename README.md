# 📚 SmartPlanner

SmartPlanner is a full-stack productivity web application that helps students organize their study tasks, track progress, and stay motivated through task completion analytics and progress tracking.

The application provides a modern dashboard where users can add tasks, monitor their progress, and manage their daily study schedule effectively.

---

# 🚀 Features

✔ Add new study tasks  
✔ View all tasks in a clean dashboard  
✔ Mark tasks as completed  
✔ Delete tasks  
✔ Track progress using a progress bar  
✔ Dashboard statistics (Total / Completed / Pending tasks)  
✔ Search tasks instantly  
✔ Modern responsive UI  
✔ Real-time updates using API calls  

---

# 🧠 Dashboard Overview

The SmartPlanner dashboard provides:

• Task creation panel  
• Progress tracking system  
• Task completion analytics  
• Dynamic task grid layout  
• Search functionality  
• User profile section with streak display  

---

# 🏗️ Project Architecture
Frontend (HTML, CSS, JavaScript)
│
│ Fetch API
▼
Backend (Node.js + Express)
│
▼
Database (MongoDB Atlas)

The frontend communicates with the backend through REST APIs to store and retrieve tasks.

---

# 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Tools
- VS Code
- Live Server
- Git & GitHub

---

# 📂 Project Structure
SmartPlanner/
│
├── frontend/
│   ├── dashboard.html     # Main dashboard UI
│   ├── style.css          # Styling and layout
│   └── script.js          # Frontend logic and API calls
│
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── package.json       # Node dependencies
│   └── models/
│       └── Task.js        # MongoDB task schema
│
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules
---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository


git clone https://github.com/nageenashaik123/Smart-Studyplanner-Website


---

## 2️⃣ Install Backend Dependencies


cd backend
npm install


---

## 3️⃣ Run Backend Server


node server.js


Server runs at:


http://localhost:3000


---

## 4️⃣ Run Frontend

Open:


frontend/dashboard.html


or use **Live Server extension** in VS Code.

---

# 📡 API Endpoints

### Get all tasks


GET /tasks


### Add new task


POST /tasks


### Update task


PUT /tasks/:id


### Delete task


DELETE /tasks/:id


---

# 📊 Example Dashboard Output

### Task Dashboard


Total Tasks: 5
Completed: 3
Pending: 2

Progress: 60%


---

# 🎯 Future Improvements

Planned features to enhance SmartPlanner:

• User authentication (Login / Signup)  
• Email verification system  
• Daily streak tracking  
• Task editing feature  
• Charts for analytics (Chart.js)  
• Dark mode support  
• Mobile responsive UI  
• Deployment on cloud platforms  

---

# 🌐 Deployment (Future)

The application can be deployed using:

- Render / Railway (backend)
- Vercel / Netlify (frontend)
- MongoDB Atlas (database)

---

# 👨‍💻 Author

**Nageena**

B.Tech CSE (AI & ML)  
Passionate about Full Stack Development and AI Systems.

---

# ⭐ Support

If you like this project:

⭐ Star the repository  
⭐ Fork the project  
⭐ Contribute improvements

---
