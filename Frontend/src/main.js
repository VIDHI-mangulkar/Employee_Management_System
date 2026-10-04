import "./style.css";

const API_URL = "http://127.0.0.1:5000/api/employees";


// Get HTML elements
const employeeForm = document.getElementById("employee-form");

const employeeIdInput = document.getElementById("employee-id");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const designationInput = document.getElementById("designation");
const salaryInput = document.getElementById("salary");
const contactInput = document.getElementById("contact");

const employeeTableBody =
    document.getElementById("employee-table-body");

const searchInput =
    document.getElementById("search-input");

const submitButton =
    document.getElementById("submit-button");

const cancelButton =
    document.getElementById("cancel-button");

const formTitle =
    document.getElementById("form-title");

const noData =
    document.getElementById("no-data");


// This stores the employee ID when we are editing
let editingEmployeeId = null;


// --------------------------------------------------
// LOAD EMPLOYEES
// --------------------------------------------------

async function loadEmployees() {

    try {

        const response = await fetch(API_URL);

        const employees = await response.json();

        displayEmployees(employees);

    } catch (error) {

        console.error(error);

        alert("Unable to connect to backend server.");

    }
}


// --------------------------------------------------
// DISPLAY EMPLOYEES
// --------------------------------------------------

function displayEmployees(employees) {

    employeeTableBody.innerHTML = "";

    if (employees.length === 0) {

        noData.style.display = "block";

        return;
    }

    noData.style.display = "none";


    employees.forEach(employee => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${escapeHTML(employee.employee_id)}</td>

            <td>${escapeHTML(employee.name)}</td>

            <td>${escapeHTML(employee.department)}</td>

            <td>${escapeHTML(employee.designation)}</td>

            <td>
                ₹${Number(employee.salary).toLocaleString("en-IN")}
            </td>

            <td>${escapeHTML(employee.contact)}</td>

            <td>

                <button
                    class="edit-button"
                    onclick="editEmployee(${employee.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-button"
                    onclick="deleteEmployee(${employee.id})"
                >
                    Delete
                </button>

            </td>
        `;

        employeeTableBody.appendChild(row);

    });
}


// --------------------------------------------------
// ADD / UPDATE EMPLOYEE
// --------------------------------------------------

employeeForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const employeeData = {

        employee_id: employeeIdInput.value.trim(),

        name: nameInput.value.trim(),

        department: departmentInput.value,

        designation: designationInput.value.trim(),

        salary: salaryInput.value,

        contact: contactInput.value.trim()

    };


    // Check required fields

    if (
        !employeeData.employee_id ||
        !employeeData.name ||
        !employeeData.department ||
        !employeeData.designation ||
        !employeeData.salary ||
        !employeeData.contact
    ) {

        alert("Please fill all fields.");

        return;
    }


    // Check salary

    if (Number(employeeData.salary) <= 0) {

        alert("Salary must be greater than 0.");

        return;
    }


    // Check contact number

    if (!/^\d{10}$/.test(employeeData.contact)) {

        alert("Contact must contain exactly 10 digits.");

        return;
    }


    try {

        let response;


        // UPDATE employee

        if (editingEmployeeId !== null) {

            response = await fetch(
                `${API_URL}/${editingEmployeeId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(employeeData)
                }
            );

        }


        // ADD employee

        else {

            response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(employeeData)
                }
            );

        }


        const result = await response.json();


        if (!response.ok) {

            alert(result.error || "Something went wrong.");

            return;
        }


        alert(result.message);

        resetForm();

        loadEmployees();


    } catch (error) {

        console.error(error);

        alert("Unable to connect to backend.");

    }

});


// --------------------------------------------------
// EDIT EMPLOYEE
// --------------------------------------------------

window.editEmployee = async function(id) {

    try {

        const response = await fetch(API_URL);

        const employees = await response.json();

        const employee =
            employees.find(item => item.id === id);


        if (!employee) {

            alert("Employee not found.");

            return;
        }


        // Put employee information into form

        employeeIdInput.value = employee.employee_id;

        nameInput.value = employee.name;

        departmentInput.value = employee.department;

        designationInput.value = employee.designation;

        salaryInput.value = employee.salary;

        contactInput.value = employee.contact;


        // Store employee ID

        editingEmployeeId = id;


        // Change form to update mode

        formTitle.textContent = "Update Employee";

        submitButton.textContent = "Update Employee";

        cancelButton.style.display = "inline-block";


        // Scroll to top

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        alert("Unable to load employee.");

    }

};


// --------------------------------------------------
// DELETE EMPLOYEE
// --------------------------------------------------

window.deleteEmployee = async function(id) {

    const confirmation = confirm(
        "Are you sure you want to delete this employee?"
    );


    if (!confirmation) {

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        const result = await response.json();


        if (!response.ok) {

            alert(result.error || "Unable to delete employee.");

            return;
        }


        alert(result.message);

        loadEmployees();


    } catch (error) {

        console.error(error);

        alert("Unable to connect to backend.");

    }

};


// --------------------------------------------------
// SEARCH EMPLOYEES
// --------------------------------------------------

searchInput.addEventListener("input", async function() {

    const query = searchInput.value.trim();


    try {

        // If search box is empty,
        // show all employees

        if (!query) {

            loadEmployees();

            return;
        }


        const response = await fetch(
            `${API_URL}/search?q=${encodeURIComponent(query)}`
        );


        const employees = await response.json();

        displayEmployees(employees);


    } catch (error) {

        console.error(error);

        alert("Search failed.");

    }

});


// --------------------------------------------------
// CANCEL UPDATE
// --------------------------------------------------

cancelButton.addEventListener("click", function() {

    resetForm();

});


// --------------------------------------------------
// RESET FORM
// --------------------------------------------------

function resetForm() {

    employeeForm.reset();

    editingEmployeeId = null;

    formTitle.textContent = "Add Employee";

    submitButton.textContent = "Add Employee";

    cancelButton.style.display = "none";

}


// --------------------------------------------------
// HTML SECURITY
// --------------------------------------------------

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// --------------------------------------------------
// LOAD EMPLOYEES WHEN PAGE OPENS
// --------------------------------------------------

loadEmployees();