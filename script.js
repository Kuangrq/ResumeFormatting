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

document.getElementById('add-education').addEventListener('click', function() {
    const educationContainer = document.querySelector('.education-section');
    const newEducationInputs = document.createElement('div');
    newEducationInputs.className = 'education-inputs';
    newEducationInputs.innerHTML = `
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
        <input type="text" placeholder="Awards & Coursework...">
    `;

    // Insert the new education inputs before the buttons
    educationContainer.insertBefore(newEducationInputs, this);

    // Move the Delete and Add buttons to the end of the container
    const addButton = this;
    const deleteButton = document.getElementById('delete-education');
    educationContainer.appendChild(deleteButton); // Append Delete first
    educationContainer.appendChild(addButton); // Then Append Add
});

document.getElementById('delete-education').addEventListener('click', function() {
    const educationContainer = document.querySelector('.education-section');
    const allEducationInputs = educationContainer.querySelectorAll('.education-inputs');
    if (allEducationInputs.length > 1) { // Ensure at least one section remains
        educationContainer.removeChild(allEducationInputs[allEducationInputs.length - 1]);
    }

    // Move the Delete and Add buttons to the end of the container
    const addButton = document.getElementById('add-education');
    const deleteButton = this;
    educationContainer.appendChild(deleteButton); // Append Delete first
    educationContainer.appendChild(addButton); // Then Append Add
});
