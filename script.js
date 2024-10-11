document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Rename') {
            document.getElementById('modal').style.display = 'block';
        }
    });
});

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function updateName() {
    const newName = document.getElementById('newName').value;
    document.querySelector('h1').textContent = newName;
    closeModal();
}

// Define HTML for new inputs for each section
const educationInputsHTML = `
    <input type="text" placeholder="School Name...">
    <div class="date-container">
        <label>Start Date</label>
        <input type="month" class="date-input">
        <span class="date-separator">➜</span>
        <label>End Date</label>
        <input type="month" class="date-input">
    </div>
    <input type="text" placeholder="Location...">
    <input type="text" placeholder="Degree & Majors...">
    <input type="text" placeholder="Awards & Coursework...">`; // Fill in with actual HTML content
const experienceInputsHTML = `
    <input type="text" placeholder="Company Name...">
    <div class="date-container">
        <label>Start Date</label>
        <input type="month" class="date-input">
        <span class="date-separator">➜</span>
        <label>End Date</label>
        <input type="month" class="date-input">
    </div>
    <input type="text" placeholder="Location...">
    <input type="text" placeholder="Job Title...">
    <input type="text" placeholder="Bullet Points...">`; // Fill in with actual HTML content
const projectsInputsHTML = `
    <input type="text" placeholder="Project Name...">
    <div class="date-container">
        <label>Start Date</label>
        <input type="month" class="date-input">
        <span class="date-separator">➜</span>
        <label>End Date</label>
        <input type="month" class="date-input">
    </div>
    <input type="text" placeholder="Bullet Points...">`; // Fill in with actual HTML content

function setupSectionControls(addButtonId, deleteButtonId, sectionClass, inputsClass, inputsHTML) {
    document.getElementById(addButtonId).addEventListener('click', function() {
        const container = document.querySelector('.' + sectionClass);
        const newInputs = document.createElement('div');
        newInputs.className = inputsClass;
        newInputs.innerHTML = inputsHTML;

        const allInputs = container.querySelectorAll('.' + inputsClass);
        if (allInputs.length > 0) {
            const divider = document.createElement('div');
            divider.className = 'divider';
            container.appendChild(divider);
        }

        container.appendChild(newInputs);

        const addButton = this;
        const deleteButton = document.getElementById(deleteButtonId);
        container.appendChild(deleteButton);
        container.appendChild(addButton);
    });

    document.getElementById(deleteButtonId).addEventListener('click', function() {
        const container = document.querySelector('.' + sectionClass);
        const allInputs = container.querySelectorAll('.' + inputsClass);
        const allDividers = container.querySelectorAll('.divider');

        if (allInputs.length > 1) {
            const lastInput = allInputs[allInputs.length - 1];
            container.removeChild(lastInput);

            if (allInputs.length > 1) {
                const lastDivider = allDividers[allDividers.length - 1];
                container.removeChild(lastDivider);
            }
        }

        const addButton = document.getElementById(addButtonId);
        const deleteButton = this;
        container.appendChild(deleteButton);
        container.appendChild(addButton);
    });
}

// 初始化 Education, Experience, Projects 部分的按钮功能
setupSectionControls('add-education', 'delete-education', 'education-section', 'education-inputs', educationInputsHTML);
setupSectionControls('add-experience', 'delete-experience', 'experience-section', 'experience-inputs', experienceInputsHTML);
setupSectionControls('add-projects', 'delete-projects', 'projects-section', 'projects-inputs', projectsInputsHTML);