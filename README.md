# BookingApp Client (React Frontend)

BookingApp is a full‑stack application that connects **customers** with **trusted providers**.  
This repository contains the **React frontend** for the platform.

---

## 📂 Project Structure
```
client/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/            # Images, icons, CSS
│   ├── components/        # Reusable UI components
│   ├── context/           # Global state (AuthContext)
│   ├── pages/             # Main views
│   ├── services/          # API calls (Axios)
│   ├── styles/            # CSS/Tailwind/Bootstrap
│   ├── App.jsx            # Routing setup
│   └── index.js           # React entry point
│
└── package.json
````
Code

---

## 🚀 Features

- **Authentication** → Login/Register with JWT.  
- **Provider Dashboard** → Manage services, availability, and bookings.  
- **Customer Journey** → Search providers, view profiles, book services.  
- **Booking Checkout** → Confirm appointments with secure flow.  
- **Reviews** → Customers can leave ratings and feedback.  
- **Responsive UI** → Styled with CSS, ready for Tailwind/Bootstrap integration.  

---

## 🛠️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jimmyopotalando/booking-app-client.git
   cd booking-app-client
Install dependencies:

bash
npm install
Start development server:

bash
npm start
Build for production:

bash
npm run build
🔗 Environment Variables
Create a .env file in the root directory with:

Code
REACT_APP_API_URL=http://localhost:5000/api
Replace with your backend API URL.

📖 Pages Overview
/ → Home (landing page)

/providers → Provider search & listing

/provider/:id → Provider profile (services, availability, reviews)

/checkout/:serviceId → Booking checkout flow

/login → User login

/register → User registration

/profile → My profile (protected)

/my-bookings → Customer bookings (protected)

/dashboard → Provider dashboard (protected)

👨‍💻 Tech Stack
React 18

React Router v6

Axios (API calls with JWT interceptor)

CSS / Tailwind / Bootstrap (styling)

📜 License
This project is licensed under the MIT License.