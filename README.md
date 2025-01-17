# AI Chat Assistant Project

## 🌟 Overview

The **AI Chat Assistant** is an advanced platform designed to revolutionize user interaction through intelligent conversation. Powered by **Google Gemini**, this system offers a real-time, interactive chat experience with a focus on security, responsiveness, and scalability.

The application is divided into two main repositories:

1. **Frontend:** Built with modern technologies for a seamless user experience. [Frontend Repository Link](https://github.com/Parashuram-78/ai-chat-client-main)
2. **Backend:** Engineered for performance and security, managing data storage and processing efficiently. [Backend Repository Link](https://github.com/Parashuram-78/ai-chat-server-main)

---

## 🚀 Tech Stack

### **Frontend:**
- **TypeScript**: Type-safe programming for error-free code.
- **Next.js**: Optimized server-side rendering for high performance.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Shadcn UI**: Sleek and customizable UI components.
- **Zod**: Schema validation for type-safe data processing.

### **Backend:**
- **Node.js**: Fast and efficient JavaScript runtime.
- **Express**: Lightweight and flexible web application framework.

### **Database:**
- **MongoDB**: A NoSQL database designed for scalability and flexibility.

### **AI Integration:**
- **Google Gemini**: Cutting-edge AI technology for intelligent response generation.

---

## 🌟 Features Implemented

### 1. 🔐 **Authentication**
- Secure **email and password-based authentication** system.
- Sessions managed using **JSON Web Tokens (JWT)** for enhanced security.

### 2. 🤖 **AI-Powered Chat Interface**
- Interactive chat platform enabling seamless user communication with **Google Gemini**.
- Dynamic responses are generated in real-time for an engaging experience.

### 3. 📡 **Real-Time Response Streaming**
- Responses streamed using **Server-Sent Events (SSE)** for instantaneous feedback.

### 4. 🛡️ **Data Validation and Security**
- **Frontend:** Implements **Zod** for validating all data inputs and outputs.
- **Backend:** Ensures strict validation rules to safeguard data integrity and prevent malicious inputs.

### 5. 🏗️ **Scalable Architecture**
- Modular design for effortless scalability and easy maintenance.
- Separation of frontend and backend responsibilities for efficient development workflows.

### 6. 🖥️ **Responsive UI**
- Built with **Tailwind CSS** and **Shadcn UI** for a modern, adaptable, and sleek design optimized across all devices.

---

## 💻 How to Run the Project

Follow these steps to set up and run the project locally:

### Prerequisites:
- Ensure **Node.js** and **npm** are installed on your system.  
  [Download Node.js](https://nodejs.org/en/download)

### 1. **Setup the Backend**  
   Follow these steps to set up the backend repository:

   ```bash
   # Clone the backend repository
   git clone https://github.com/Parashuram-78/ai-chat-server-main
   cd ai-chat-server-main

   # Install backend dependencies
   npm install

   # Run the backend development server
   node src/index.js

