# EcoPuff – Full-Stack E-commerce Project

**EcoPuff** is a fully functional full-stack application built with **Node.js**, **Express**, **MongoDB**, and **Vanilla JavaScript**. It simulates an e-commerce platform dedicated to **transforming e-cigarette waste into educational kits**.

The idea originated from a **Hackathon** challenge where participants were asked to repurpose electronic cigarettes into projects with **positive social and environmental impact**.

---

## 🚀 Features

- 🌐 Built a **custom web server** using Node.js and Express
- 🔁 Developed a full **REST API** for:
  - Users
  - Products
  - Shopping Carts
  - Orders
- 🔐 **User Authentication** using JWT
- 🔒 Passwords hashed using **bcrypt**
- 🛢️ Integrated **MongoDB** via Mongoose
- 📦 Organized backend into **models**, **controllers**, **routes**, and **middleware**
- 🧹 Implemented **input sanitization** and **custom error handling**
- 🎨 Frontend built with **HTML**, **Tailwind CSS**, and **Vanilla JS**
- 📄 Static frontend consumes API via Fetch

---

## ⚙️ Installation & Setup

### 📋 Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB (local or cloud via MongoDB Atlas)

### 📥 Installation
On your terminal:
1.Clone the repo:
git clone https://github.com/your-username/ecopuff.git
cd ecopuff
npm install

2.Create a .env file with these variables (you need to get your own mongoUrl from mongoDB):
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/ecopuff?retryWrites=true&w=majority
JWT_SECRET=yourSuperSecretAndLongKeyHere 
PORT=3000

3. Start the development server:
run npm start on your terminal