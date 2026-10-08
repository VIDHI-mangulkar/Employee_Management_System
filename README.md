# Employee Management System

A full-stack web application for managing employee records. The system allows users to add, view, search, update, and delete employee information through a simple and professional web interface.

---

##  Project Overview

The **Employee Management System** is developed as an individual teacher-assessment project.

The application is designed to demonstrate the complete integration of:

* Frontend web development
* REST API development
* Backend programming
* Database management
* CRUD operations
* Client-server communication

The frontend is developed using **HTML, CSS, and JavaScript**, with **Vite and Node.js** used for frontend development and tooling. The backend is developed using **Python Flask**, and **SQLite** is used to store employee information.

---

##  Aim

To design and develop an Employee Management System web application that enables users to add, search, update, and delete employee records using HTML, CSS, and JavaScript on the client side, Python Flask as the backend server, and SQLite as the database.

---

##  Objectives

The main objectives of this project are:

1. To design a user-friendly interface for entering and viewing employee details.

2. To develop Flask REST API endpoints for employee management.

3. To store employee information using an SQLite database.

4. To connect the frontend and backend using HTTP methods and JSON.

5. To implement input validation on the client and server sides.

6. To dynamically display employee records without reloading the webpage.

7. To implement complete CRUD functionality.

8. To test important cases such as duplicate Employee IDs and deleting non-existent employees.

9. To understand the integration of frontend, backend, and database technologies.

---

##  Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Node.js
* Vite

### Backend

* Python
* Flask
* Flask-CORS

### Database

* SQLite

### Development Tools

* Visual Studio Code / Cursor
* PowerShell
* Git
* GitHub

---

##  Features

The application provides the following features:

### 1. Add Employee

Users can add a new employee by entering:

* Employee ID
* Name
* Department
* Designation
* Salary
* Contact Number

### 2. View Employees

All stored employee records are displayed in a structured table.

### 3. Search Employees

Employees can be searched dynamically using:

* Employee ID
* Employee Name
* Department

The search results are displayed without refreshing the webpage.

### 4. Update Employee

Existing employee information can be edited and updated.

### 5. Delete Employee

Users can delete an employee record from the database after confirmation.

### 6. Input Validation

The system validates important fields such as:

* Required fields
* Unique Employee ID
* Valid salary
* Valid 10-digit contact number

### 7. Responsive Interface

The frontend is designed to work on desktop and smaller screen sizes.

---

##  CRUD Operations

CRUD stands for:

| Operation | HTTP Method | Purpose                     |
| --------- | ----------- | --------------------------- |
| Create    | POST        | Add a new employee          |
| Read      | GET         | View employee records       |
| Update    | PUT         | Modify employee information |
| Delete    | DELETE      | Remove an employee          |

---

##  REST API

The Flask backend provides REST API endpoints for communication between the frontend and database.

| Method | Endpoint                        | Purpose            |
| ------ | ------------------------------- | ------------------ |
| GET    | `/api/employees`                | Get all employees  |
| POST   | `/api/employees`                | Add a new employee |
| GET    | `/api/employees/search?q=value` | Search employees   |
| PUT    | `/api/employees/<id>`           | Update an employee |
| DELETE | `/api/employees/<id>`           | Delete an employee |

The API uses **JSON** for sending and receiving data.

---

##  Employee Information

The system stores the following employee details:

| Field       | Description                  |
| ----------- | ---------------------------- |
| Employee ID | Unique identification number |
| Name        | Employee's full name         |
| Department  | Employee's department        |
| Designation | Employee's job position      |
| Salary      | Employee's salary            |
| Contact     | Employee's contact number    |

---

##  Project Structure

```text
Employee_Management_System
│
├── Backend
│   ├── app.py
│   ├── database.py
│   ├── employee.db
│   └── requirements.txt
│
├── Frontend
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   │
│   └── src
│       ├── main.js
│       └── style.css
│
├── .gitignore
└── README.md
```

### Backend

`app.py`
Contains the Flask server and REST API endpoints.

`database.py`
Creates and manages the SQLite database and employee table.

`employee.db`
SQLite database containing employee records.

`requirements.txt`
Contains the Python packages required to run the backend.

### Frontend

`index.html`
Contains the structure of the web application.

`main.js`
Handles frontend functionality, API communication, CRUD operations, search, and validation.

`style.css`
Contains the styling and responsive design of the application.

---

#  How to Run the Project

localhost  :  http://localhost:5173/
Running on http://127.0.0.1:5000

## Prerequisites

Before running the project, make sure the following are installed:

* Python
* Node.js
* npm
* Git

---

## Step 1: Clone the Repository

Open PowerShell and run:

```powershell
git clone https://github.com/YOUR_USERNAME/Employee_Management_System.git
```

Then enter the project folder:

```powershell
cd Employee_Management_System
```

---

# Step 2: Run the Backend

Open PowerShell and go to the Backend folder:

```powershell
cd Backend
```

Create a Python virtual environment:

```powershell
python -m venv venv
```

Activate the virtual environment:

```powershell
venv\Scripts\activate
```

Install the required packages:

```powershell
pip install -r requirements.txt
```

Run the Flask server:

```powershell
python app.py
```

The backend will run at:

```text
http://127.0.0.1:5000
```

Keep this terminal running.

---

# Step 3: Run the Frontend

Open a **new PowerShell terminal**.

Go to the Frontend folder:

```powershell
cd Employee_Management_System\Frontend
```

Install the Node.js dependencies:

```powershell
npm install
```

Start the Vite development server:

```powershell
npm run dev
```

Vite will display a local URL, usually:

```text
http://localhost:5173
```

Open this URL in your browser.

---

# 🧪 Testing

The application was tested for the following operations:

### Test 1: Add Employee

Enter valid employee information and click **Add Employee**.

**Expected Result:**
The employee is added to the database and displayed in the employee table.

### Test 2: Duplicate Employee ID

Try adding another employee using an existing Employee ID.

**Expected Result:**
The system rejects the duplicate Employee ID and displays an error message.

### Test 3: Search Employee

Enter an Employee ID, name, or department in the search box.

**Expected Result:**
Matching employee records are displayed dynamically.

### Test 4: Update Employee

Click the **Edit** button and modify employee information.

**Expected Result:**
The updated information is stored in the database and displayed in the table.

### Test 5: Delete Employee

Click the **Delete** button for an employee.

**Expected Result:**
The employee is removed from the database and from the displayed list.

### Test 6: Delete Non-existent Employee

Attempt to delete an employee record that does not exist.

**Expected Result:**
The application handles the request safely and displays an appropriate response.

### Test 7: Invalid Salary

Enter an invalid or negative salary.

**Expected Result:**
The application rejects the invalid salary.

### Test 8: Invalid Contact

Enter a contact number that is not 10 digits.

**Expected Result:**
The application displays a validation message.

---

#  Data and Security

The project uses a local SQLite database for storing employee information.

The `.gitignore` file is used to prevent unnecessary files such as:

```text
venv/
node_modules/
__pycache__/
.env
```

from being uploaded to GitHub.

No passwords, API keys, or other sensitive credentials should be stored directly in the source code.

---

#  Learning Outcomes

Through this project, the following concepts were learned and implemented:

* HTML and CSS web development
* JavaScript DOM manipulation
* REST API development
* Flask backend development
* SQLite database management
* CRUD operations
* HTTP methods
* JSON data exchange
* Client-server communication
* Form validation
* Dynamic webpage updates
* Node.js and Vite frontend tooling
* Git and GitHub version control

---





