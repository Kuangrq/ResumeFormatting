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

// "Initialize the button functionality for the Education, Experience, and Projects sections"
setupSectionControls('add-education', 'delete-education', 'education-section', 'education-inputs', educationInputsHTML);
setupSectionControls('add-experience', 'delete-experience', 'experience-section', 'experience-inputs', experienceInputsHTML);
setupSectionControls('add-projects', 'delete-projects', 'projects-section', 'projects-inputs', projectsInputsHTML);


// Add bullet point functionality to both projects and experience sections
document.getElementById('add-project-bullet-point').addEventListener('click', function() {
    addBulletPoint(this.parentNode);
});

document.getElementById('add-experience-bullet-point').addEventListener('click', function() {
    addBulletPoint(this.parentNode);
});

function addBulletPoint(container) {
    // Create a new div to hold the input and the delete button
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    // Create the new input field
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Bullet Point...';
    newInput.className = 'bullet-point';

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-bullet-point';
    deleteButton.onclick = function() {
        // Remove the input group from the container
        container.removeChild(inputGroup);
    };

    // Append the input and delete button to the input group
    inputGroup.appendChild(newInput);
    inputGroup.appendChild(deleteButton);

    // Insert the new group before the add button
    container.insertBefore(inputGroup, container.lastElementChild);
}

// Skills
const skills = [
    "Java", "C++", "Python", "JavaScript", "Ruby", "PHP", "HTML", "CSS", "SQL", 
    "React", "Node.js", "Go", "C#", "Swift", "Kotlin", "TypeScript", "Rust", 
    "Dart", "Scala", "Perl", "Shell Scripting", "R", "MATLAB", "Objective-C", 
    "Elixir", "Haskell", "Lua", "Groovy", "Visual Basic", "Assembly Language", 
    "F#", "COBOL", "Fortran", "SAS", "Julia", "PowerShell", "T-SQL", "PL/SQL", 
    "GraphQL", "Express.js", "Angular", "Vue.js", "Bootstrap", "jQuery", 
    "Spring", "Django", "Flask", "Ruby on Rails", "ASP.NET", "Laravel", 
    "Symfony", "CakePHP", "RESTful APIs", "Microservices", "Docker", "Kubernetes", 
    "Git", "SVN", "Jenkins", "Travis CI", "AWS", "Azure", "Google Cloud", 
    "Firebase", "Heroku", "PostgreSQL", "MongoDB", "MySQL", "SQLite", 
    "Redis", "Elasticsearch", "Apache Kafka", "RabbitMQ", "Graph Databases", 
    "NoSQL", "Machine Learning", "Deep Learning", "Data Science", "Artificial Intelligence", 
    "Blockchain", "DevOps", "Agile", "Scrum", "Kanban", "Test-Driven Development", 
    "Behavior-Driven Development", "UI/UX Design", "Responsive Design", 
    "Cross-Platform Development", "Mobile Development", "Game Development", 
    "Web Development", "Software Architecture", "System Design", "Network Security", 
    "Cybersecurity", "Penetration Testing", "Ethical Hacking", "Data Analysis", 
    "Data Visualization", "Business Intelligence", "SEO", "Digital Marketing"
];

function filterSkills(input) {
    const suggestionsBox = document.getElementById('suggestions-box');
    
    // Only filter skills if the input is not empty
    if (input.trim() === '') {
        suggestionsBox.style.display = 'none'; // Hide the suggestions box if the input is empty
        return;
    }

    const suggestions = skills.filter(skill => skill.toLowerCase().startsWith(input.toLowerCase()));
    suggestionsBox.innerHTML = '';  // Clear previous suggestions

    if (suggestions.length > 0) {
        suggestionsBox.style.display = 'block'; // Show the suggestions box
    } else {
        suggestionsBox.style.display = 'none'; // Hide the box if no suggestions
    }

    // Show suggestions
    suggestions.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'suggestion';
        div.textContent = skill;
        div.onclick = function() { 
            addSkill(skill); 
            suggestionsBox.style.display = 'none';  // Hide the suggestion box after selecting a skill
        };
        suggestionsBox.appendChild(div);
    });
}

function addSkill(skill) {
    const skillsTags = document.getElementById('skills-tags');

    // Check if the skill is already added
    if ([...skillsTags.getElementsByClassName('skill-tag')].some(tag => tag.textContent === skill)) {
        return; // Exit if skill already exists
    }

    // Create a new skill tag
    const span = document.createElement('span');
    span.textContent = skill;
    span.className = 'skill-tag';
    
    // Add functionality to remove the skill when clicked
    span.onclick = function() { this.remove(); };

    // Enable drag-and-drop functionality
    span.setAttribute('draggable', true);
    span.ondragstart = function(event) {
        event.dataTransfer.setData('text/plain', skill); // Store the skill data
        event.dataTransfer.effectAllowed = 'move'; // Indicate that this is a move operation
    };

    skillsTags.appendChild(span);

    // Clear the input field and hide the suggestions box
    document.getElementById('skill-input').value = '';
    document.getElementById('suggestions-box').style.display = 'none';
}

// Add event listeners for drag-and-drop
const skillsTags = document.getElementById('skills-tags');

skillsTags.ondragover = function(event) {
    event.preventDefault(); // Prevent default to allow drop
};

skillsTags.ondrop = function(event) {
    event.preventDefault(); // Prevent default behavior
    const skill = event.dataTransfer.getData('text/plain'); // Get the dragged skill
    const draggedElement = Array.from(skillsTags.children).find(tag => tag.textContent === skill); // Find the dragged element

    // Insert the dragged element before the element that was dropped on
    const target = event.target;
    if (target && target.className === 'skill-tag') {
        skillsTags.insertBefore(draggedElement, target);
    } else {
        skillsTags.appendChild(draggedElement); // If dropped outside, append to the end
    }
};

function addCustomSkill() {
    const inputField = document.getElementById('skill-input');
    const skill = inputField.value.trim(); // Get the user input and remove leading and trailing whitespace

    if (skill === '') {
        alert('Please enter a skill to add.'); // If the input is empty, prompt the user
        return;
    }

    // Call the addSkill function to add the custom skill to the skill tags
    addSkill(skill);
}
