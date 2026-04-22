let allProjects = [];


async function fetchproject() {
    try {
        const res = await fetch('https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects');
        const data = await res.json();

        allProjects = data;       
        renderData(allProjects); 
    } catch (err) {
        console.log(err);
    }
}


document.addEventListener('DOMContentLoaded', fetchproject);


// Render Table
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
            <td>${i + 1}</td>
            <td>${p.ProjectName}</td>
            <td>${p.Department}</td>
            <td>${p.priority}</td>
            <td>${p.status}</td>
            <td>${p.startDate}</td>
            <td>${p.EndDate}</td>
        </tr>
    `).join('');
}



function searchProject() {
    const value = document
        .getElementById("searchkey")
        .value
        .toLowerCase()
        .trim();

    if (value === "") {
        renderData(allProjects);
        return;
    }

    const filtered = allProjects.filter(p =>
        p.ProjectName.toLowerCase().includes(value) ||
        p.Department.toLowerCase().includes(value) ||
        p.priority.toLowerCase().includes(value) ||
        p.status.toLowerCase().includes(value)
    );

    renderData(filtered);
}

function filterProject() {
    const value = document
        .getElementById("filterType")
        .value
        .toLowerCase()
        .trim();

    currentPage = 1; // reset pagination

    if (value === "") {
        filteredData = [];
        renderData(allProjects);
        return;
    }

    filteredData = allProjects.filter(p =>
        p.priority.toLowerCase() === value ||
        p.status.toLowerCase() === value
    );

    renderData(filteredData);
}