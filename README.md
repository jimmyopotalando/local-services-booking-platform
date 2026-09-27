# Local Services Booking Platform

A full‑stack MERN (MongoDB, Express, React, Node.js) application for booking and managing local services.

---

## 📂 Project Root
local-services-booking-platform/
│
├── client/                # React frontend
├── server/                # Node.js + Express backend
├── .env                   # Environment variables (JWT secret, DB URI, etc.)
├── package.json           # Root dependencies (optional, or separate client/server)
├── README.md              # Documentation
└── .gitignore             # Ignore node_modules, .env, build files

Code

---

## 🚀 Features
- User registration & login (JWT authentication)
- Role‑based access (Customer / Provider)
- Service listings and search
- Booking lifecycle (Pending → Confirmed → Completed)
- Provider dashboard for managing availability
- Customer dashboard for managing bookings
- MongoDB Atlas integration

---

## 🛠 Tech Stack
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT

---

## 📦 Installation

Clone the repository:
```bash
git clone git@github-opotalando:jimmyopotalando/local-services-booking-platform.git
cd local-services-booking-platform
Backend Setup
bash
cd server
npm install
npm run dev
Frontend Setup
bash
cd client
npm install
npm start
📖 Usage Manual
1. Environment Setup
Create a .env file inside the server folder.

Add the following variables:

env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
2. Running the Backend
bash
cd server
npm run dev
Server runs on http://localhost:5000.

3. Running the Frontend
bash
cd client
npm start
Frontend runs on http://localhost:3000.

4. Testing
Register a new account and log in.

Providers can create service listings and manage availability.

Customers can search and book services, then manage bookings.

5. Common Issues
MONGO_URI undefined → Ensure .env exists in the server folder.

JWT errors → Check that JWT_SECRET is set.

Port conflicts → Change PORT in .env.

👤 Author
Jimmy Opot Alando