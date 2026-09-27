# Local Services Booking Platform

A full‑stack MERN (MongoDB, Express, React, Node.js) application for booking and managing local services.

---

## 📂 Project Root
```
local-services-booking-platform/
│
├── client/                # React frontend
├── server/                # Node.js + Express backend
├── .env                   # Environment variables (JWT secret, DB URI, etc.)
├── package.json           # Root dependencies (optional, or separate client/server)
├── README.md              # Documentation
└── .gitignore             # Ignore node_modules, .env, build files
```
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
git clone https://github.com/jimmyopotalando/local-services-booking-platform.git
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




2. Running the Backend
Start the backend server:

bash
cd server
npm run dev
The server will run on http://localhost:5000 by default.

You should see:

Code
🚀 Server running in development mode on port 5000
✅ MongoDB Connected
3. Running the Frontend
Start the React client:

bash
cd client
npm start
The frontend will run on http://localhost:3000.

4. Testing the Application
Open http://localhost:3000 in your browser.

Register a new account and log in.

Explore features:

Create service listings (as a provider).

Search and book services (as a customer).

Manage bookings via dashboards.

5. Common Issues
MONGO_URI undefined → Ensure .env exists in the server folder and contains the correct connection string.

JWT errors → Check that JWT_SECRET is set in .env.

Port conflicts → Change PORT in .env if 5000 is already in use.

👤 Author
Jimmy Opot Alando