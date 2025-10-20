# Backend-Projects

# 💬 Chat App Backend

This is the backend for a real-time chat application, built using **Node.js**, **Express**, **MongoDB**, and **Socket.io**. It handles user authentication, messaging between users, image uploading, online user tracking, and message delivery/seen status.

---

## 🚀 Features

✅ User authentication with JWT  
✅ Real-time messaging using Socket.io  
✅ Online user tracking  
✅ Message seen/unseen tracking  
✅ User profile update with image upload (ImageKit / Multer)  
✅ Secure routes using middleware  
✅ Scalable architecture  

---

## 🛠️ Tech Stack

| Technology   | Usage |
|-------------|--------|
| Node.js     | Backend runtime |
| Express.js  | Web framework |
| MongoDB     | Database |
| Socket.io   | Real-time communication |
| JWT         | Authentication |
| Multer      | File upload |
| ImageKit    | Image hosting (optional) |
| CORS        | Cross-origin access |

---

## 📁 Project Structure

root/
├── config/
│ └── connectDB.js
├── controllers/
├── middlewares/
│ └── protectRoute.js
├── models/
├── routers/
│ ├── UserRoutes.js
│ └── messageRoutes.js
├── server.js
└── package.json

---

## ⚙️ Environment Variables (`.env`)

| Variable | Description |
|----------|------------|
| PORT | Server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT |

For ImageKit:
| IMAGEKIT_PUBLIC_KEY | |
| IMAGEKIT_PRIVATE_KEY | |
| IMAGEKIT_URL_ENDPOINT | |

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone [https://github.com/yourusername/chat-app-backend.git](https://github.com/Safiul-Alam-Sarker/Backend-Projects)

cd chat-app-backend

# Install dependencies
npm install

# Run in development
npm run server
