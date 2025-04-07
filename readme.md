
# 🧳 Travel Tinder

**Travel Tinder** is a social travel platform designed specifically for solo travelers. It helps users find compatible travel companions through swipe-based matching, plan trips collaboratively, book accommodations and packages, and engage with a global travel community — all in one app.

---

## ✨ Key Features

- 🔐 **Login & Signup** using Google Authentication & Email OTP (NodeMailer)
- 👤 **Profile Setup** with travel preferences and interests
- 🔄 **Swipe-Based Matchmaking** to find compatible travel partners
- 🏨 **Hotel & Package Booking** via location-based search
- 🗣️ **Real-Time Chat** system with Socket.io
- 🖼️ **Post Upload** feature to share travel experiences
- ✅ **User Verification & Optional Background Checks**
- 🌍 **Community Engagement** through posts, tips, and destination reviews

---
<!-- ## 📱 App Screenshots

Here are some UI previews of the app:

### 🚀 Authentication Page
![Onboarding Screen](./assets/Screenshot%202025-04-07%20at%204.32.54 PM.png)

### 🎯 Google Auth
![Profile Setup](./assets/Screenshot%202025-04-07%20at%204.33.12 PM.png) -->


## 🧱 Tech Stack

### 🔹 Frontend
- **React.js** – Fast, mobile-friendly UI
- **CSS** – Styling and responsiveness

### 🔹 Backend
- **Node.js & Express.js** – API, auth, and business logic
- **Socket.io** – Real-time messaging

### 🔹 Database & Auth
- **MySQL** – Core relational data
- **Firebase** – Profile storage and basic auth
- **LocalStorage** – Temporary user/session data

### 🔹 Other Integrations
- **Google Sign-In & Email OTP (NodeMailer)** – For user authentication
- **Cloudinary** – For uploading and storing images/posts

---

## 🚀 How to Run Locally

### 🔧 Prerequisites

- Node.js and npm
- MySQL Server (local or cloud)
- Firebase Project
- Cloudinary Account

---

### 🖥️ Clone the Repository

```bash
git clone https://github.com/your-username/travel-tinder.git
cd travel-tinder
```

---

### 📦 Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```env
PORT=3001
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=travel_tinder
FIREBASE_API_KEY=your_firebase_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Api documentation is available on Postman

 https://documenter.getpostman.com/view/36485859/2sB2cVe22s


5. Start the backend server:

```bash
npm start
```

---

### 🌐 Frontend Setup

1. Navigate to the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend server:

```bash
npm run dev
```

> App will run at `http://localhost:5173`

---

## 🖥️ Deployment (Local)

This app is currently set up for **local development only**.

- Run backend on `http://localhost:3001`
- Run frontend on `http://localhost:3000`

Make sure both servers are running simultaneously for full functionality.

---

## 📸 Screenshots (Add Yours!)

- Login Page  
- Swipe Screen  
- Chat Interface  
- Profile Setup  
- Booking Interface  

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to contribute, fork the repo and submit a PR.

---

## 📬 Contact

For queries or collaborations:  
**Email:** [<a>devdakshtit@gmail.com</a>]  
**GitHub:** [dev-daksh]

---
