import sqlite3

DATABASE = "employee.db"


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            designation TEXT NOT NULL,
            salary REAL NOT NULL CHECK(salary > 0),
            contact TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


if __name__ == "__main__":
    initialize_database()
    print("Database created successfully.")