# 📝 Task Management System

A full-stack task management application built with **React** (Frontend) and **Node.js/Express** (Backend), featuring user authentication, task creation, assignment, and status tracking.

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/cs350892/Taskmanagement.git
cd TaskManagement
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://cs350892_db_user:jaczYEAIuoGuR3sn@cluster0.zijrmiz.mongodb.net/?appName=Cluster0
JWT_SECRET=chandrashekhar123

```

Start the backend server:

```bash
npm start
```

The backend will run on **http://localhost:5000**

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on **http://localhost:5173** (or the port shown in your terminal)

---

## 👤 Sample Credentials for Testing

### User 1 (Task Creator)
- **Email:** chandra@gmail.com
- **Password:** 123456

### User 2 (Task Assignee)
- **Email:** test@gmail.com
- **Password:** 123456

---

## 🧪 Testing the Application

### Step 1: Register Users
1. Open the app in your browser
2. Click on **Register**
3. Create two test accounts (or use the sample credentials above)

### Step 2: Login
1. Login with **User 1** credentials
2. You'll be redirected to the task dashboard

### Step 3: Create a Task
1. Click on **Create Task**
2. Fill in:
   - **Title:** Complete project documentation
   - **Description:** Write comprehensive README file
   - **Assigned To:** Select User 2
   - **Status:** Pending
3. Submit the task

### Step 4: View Tasks
1. Tasks will appear in the task list
2. You can update status by clicking on status buttons
3. Delete tasks using the delete button

### Step 5: Test Task Assignment
1. Logout from User 1
2. Login with User 2
3. View assigned tasks

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (Protected)

### Tasks
- `POST /api/tasks` - Create a new task (Protected)
- `GET /api/tasks` - Get all tasks (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)


## 👨‍💻 Author

chandra shekhar

- GitHub: [@cs350892](https://github.com/cs350892)
- Repository: [Taskmanagement](https://github.com/cs350892/Taskmanagement)



