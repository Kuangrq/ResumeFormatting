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
