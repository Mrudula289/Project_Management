let allProjects = [];
let filteredData = [];
let currentPage = 1;
const rowsPerPage = 10;

// ================= FETCH DATA =================
async function fetchproject() {
    try {
        const res = await fetch('https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects');
        const data = await res.json();

        allProjects = data;
        filteredData = [];
        paginate(1); // ✅ always start with pagination
    } catch (err) {
        console.log(err);
    }
}

document.addEventListener('DOMContentLoaded', fetchproject);

// ================= RENDER TABLE =================
function renderData(projects) {
    const table = document.getElementById("projectRows");

    if (projects.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    No Data Found
                </td>
            </tr>`;
        return;
    }

    table.innerHTML = projects.map((p, i) => `
        <tr>
            <td>${(currentPage - 1) * rowsPerPage + i + 1}</td>
            <td>${p.ProjectName}</td>
            <td>${p.Department}</td>
            <td>${p.priority}</td>
            <td>${p.status}</td>
            <td>${p.startDate}</td>
            <td>${p.EndDate}</td>
        </tr>
    `).join('');
}

// ================= SEARCH =================
function searchProject() {
    const value = document
        .getElementById("searchkey")
        .value
        .toLowerCase()
        .trim();

    if (value === "") {
        filteredData = [];
        paginate(1);
        return;
    }

    filteredData = allProjects.filter(p =>
        p.ProjectName.toLowerCase().includes(value) ||
        p.Department.toLowerCase().includes(value) ||
        p.priority.toLowerCase().includes(value) ||
        p.status.toLowerCase().includes(value)
    );

    paginate(1);
}

// ================= FILTER =================
function filterProject() {
    const value = document
        .getElementById("filterType")
        .value
        .toLowerCase()
        .trim();

    if (value === "") {
        filteredData = [];
        paginate(1);
        return;
    }

    filteredData = allProjects.filter(p =>
        p.priority.toLowerCase() === value ||
        p.status.toLowerCase() === value
    );

    paginate(1);
}

// ================= PAGINATION =================
function paginate(page) {
    const data = filteredData.length > 0 ? filteredData : allProjects;
    const totalPages = Math.ceil(data.length / rowsPerPage);

    currentPage = page;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    renderData(data.slice(start, end));
    createPaginationButtons(totalPages);
}

// ================= PAGINATION BUTTONS =================
function createPaginationButtons(totalPages) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    // ===== PREVIOUS BUTTON =====
    container.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="event.preventDefault(); paginate(${currentPage - 1})">
                Previous
            </a>
        </li>
    `;

    // ===== PAGE NUMBERS =====
    for (let i = 1; i <= totalPages; i++) {
        container.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="event.preventDefault(); paginate(${i})">
                    ${i}
                </a>
            </li>
        `;
    }

    // ===== NEXT BUTTON =====
    container.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="event.preventDefault(); paginate(${currentPage + 1})">
                Next
            </a>
        </li>
    `;
}
