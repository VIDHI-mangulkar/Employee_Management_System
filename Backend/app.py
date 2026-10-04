from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

from database import get_connection, initialize_database

app = Flask(__name__)
CORS(app)

initialize_database()


# --------------------------------------------------
# HOME / TEST API
# --------------------------------------------------

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Employee Management System API is running"
    })


# --------------------------------------------------
# ADD EMPLOYEE
# POST /api/employees
# --------------------------------------------------

@app.route("/api/employees", methods=["POST"])
def add_employee():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data received"
        }), 400

    employee_id = str(data.get("employee_id", "")).strip()
    name = str(data.get("name", "")).strip()
    department = str(data.get("department", "")).strip()
    designation = str(data.get("designation", "")).strip()
    contact = str(data.get("contact", "")).strip()

    salary = data.get("salary")

    # Required field validation
    if not employee_id or not name or not department or not designation or not contact:
        return jsonify({
            "error": "All fields are required"
        }), 400

    # Salary validation
    try:
        salary = float(salary)

        if salary <= 0:
            return jsonify({
                "error": "Salary must be greater than 0"
            }), 400

    except (ValueError, TypeError):
        return jsonify({
            "error": "Salary must be a valid number"
        }), 400

    # Contact validation
    if not contact.isdigit() or len(contact) != 10:
        return jsonify({
            "error": "Contact must contain exactly 10 digits"
        }), 400

    connection = get_connection()

    try:

        connection.execute("""
            INSERT INTO employees
            (employee_id, name, department, designation, salary, contact)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            employee_id,
            name,
            department,
            designation,
            salary,
            contact
        ))

        connection.commit()

        return jsonify({
            "message": "Employee added successfully"
        }), 201

    except sqlite3.IntegrityError:

        return jsonify({
            "error": "Employee ID already exists"
        }), 409

    finally:
        connection.close()


# --------------------------------------------------
# GET ALL EMPLOYEES
# GET /api/employees
# --------------------------------------------------

@app.route("/api/employees", methods=["GET"])
def get_employees():

    connection = get_connection()

    employees = connection.execute("""
        SELECT * FROM employees
        ORDER BY id DESC
    """).fetchall()

    connection.close()

    employee_list = []

    for employee in employees:

        employee_list.append({
            "id": employee["id"],
            "employee_id": employee["employee_id"],
            "name": employee["name"],
            "department": employee["department"],
            "designation": employee["designation"],
            "salary": employee["salary"],
            "contact": employee["contact"]
        })

    return jsonify(employee_list)


# --------------------------------------------------
# SEARCH EMPLOYEES
# GET /api/employees/search?q=value
# --------------------------------------------------

@app.route("/api/employees/search", methods=["GET"])
def search_employees():

    query = request.args.get("q", "").strip()

    if not query:
        return get_employees()

    connection = get_connection()

    employees = connection.execute("""
        SELECT * FROM employees
        WHERE employee_id LIKE ?
           OR name LIKE ?
           OR department LIKE ?
        ORDER BY id DESC
    """, (
        f"%{query}%",
        f"%{query}%",
        f"%{query}%"
    )).fetchall()

    connection.close()

    employee_list = []

    for employee in employees:

        employee_list.append({
            "id": employee["id"],
            "employee_id": employee["employee_id"],
            "name": employee["name"],
            "department": employee["department"],
            "designation": employee["designation"],
            "salary": employee["salary"],
            "contact": employee["contact"]
        })

    return jsonify(employee_list)


# --------------------------------------------------
# UPDATE EMPLOYEE
# PUT /api/employees/<id>
# --------------------------------------------------

@app.route("/api/employees/<int:id>", methods=["PUT"])
def update_employee(id):

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data received"
        }), 400

    employee_id = str(data.get("employee_id", "")).strip()
    name = str(data.get("name", "")).strip()
    department = str(data.get("department", "")).strip()
    designation = str(data.get("designation", "")).strip()
    contact = str(data.get("contact", "")).strip()

    salary = data.get("salary")

    if not employee_id or not name or not department or not designation or not contact:
        return jsonify({
            "error": "All fields are required"
        }), 400

    try:
        salary = float(salary)

        if salary <= 0:
            return jsonify({
                "error": "Salary must be greater than 0"
            }), 400

    except (ValueError, TypeError):
        return jsonify({
            "error": "Salary must be a valid number"
        }), 400

    if not contact.isdigit() or len(contact) != 10:
        return jsonify({
            "error": "Contact must contain exactly 10 digits"
        }), 400

    connection = get_connection()

    # Check whether employee exists
    existing_employee = connection.execute(
        "SELECT * FROM employees WHERE id = ?",
        (id,)
    ).fetchone()

    if not existing_employee:
        connection.close()

        return jsonify({
            "error": "Employee not found"
        }), 404

    try:

        connection.execute("""
            UPDATE employees
            SET employee_id = ?,
                name = ?,
                department = ?,
                designation = ?,
                salary = ?,
                contact = ?
            WHERE id = ?
        """, (
            employee_id,
            name,
            department,
            designation,
            salary,
            contact,
            id
        ))

        connection.commit()

        return jsonify({
            "message": "Employee updated successfully"
        })

    except sqlite3.IntegrityError:

        return jsonify({
            "error": "Employee ID already exists"
        }), 409

    finally:
        connection.close()


# --------------------------------------------------
# DELETE EMPLOYEE
# DELETE /api/employees/<id>
# --------------------------------------------------

@app.route("/api/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):

    connection = get_connection()

    employee = connection.execute(
        "SELECT * FROM employees WHERE id = ?",
        (id,)
    ).fetchone()

    if not employee:

        connection.close()

        return jsonify({
            "error": "Employee not found"
        }), 404

    connection.execute(
        "DELETE FROM employees WHERE id = ?",
        (id,)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Employee deleted successfully"
    })


# --------------------------------------------------
# RUN SERVER
# --------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True, port=5000)