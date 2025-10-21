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

## 🔌 Socket.io Events

| Event           | Direction        | Description                              |
|-----------------|----------------|------------------------------------------|
| `connection`    | Client → Server | Connects user to socket with userId      |
| `getOnlineUsers`| Server → Client | Sends current list of online users       |
| `newMessage`    | Server → Client | Emits new message to receiver            |
| `disconnect`    | Client → Server | Removes user from online map             |

---

## 📍 API Endpoints

> All protected routes require: `Authorization: Bearer <token>`

### 👤 User Routes (`/api/user`)

| Method | Endpoint         | Auth | Description                       |
|--------|-----------------|------|-----------------------------------|
| POST   | `/register`      | ❌   | Register a new user               |
| POST   | `/login`         | ❌   | Login and get JWT token           |
| GET    | `/check`         | ✅   | Verify token & get user info      |
| PUT    | `/updateProfile` | ✅   | Update user profile (name, bio, image) |

**Example: Update Profile (`multipart/form-data`)**

| Field | Type   | Optional |
|-------|--------|----------|
| `name`| string | ✅       |
| `bio` | string | ✅       |
| `image`| file  | ✅       |

---

### 💬 Message Routes (`/api/messages`)

| Method | Endpoint      | Auth | Description                                         |
|--------|---------------|------|---------------------------------------------------|
| GET    | `/users`       | ✅   | Get all users except logged-in one, with unseen messages count |
| GET    | `/:id`         | ✅   | Get all messages with a specific user            |
| PUT    | `/mark/:id`    | ✅   | Mark a specific message as seen                  |
| POST   | `/send/:id`    | ✅   | Send a message (text/image) to a user           |

**Example: Send Message (`multipart/form-data`)**

| Field  | Type   | Optional |
|--------|--------|----------|
| `text` | string | ✅       |
| `image`| file   | ✅       |



## 📦 Installation & Setup

```bash
# Clone the repository
git clone [https://github.com/yourusername/chat-app-backend.git](https://github.com/Safiul-Alam-Sarker/Backend-Projects)

cd chat-app-backend

# Install dependencies
npm install

# Run in development
npm run server
