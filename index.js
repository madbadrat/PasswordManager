import Entry from "./entry.js";

const passwordList = document.getElementById('passwordList');

// действие на кнопку сохранения пароля
document.getElementById('add').addEventListener('click', () => {
    const url = document.getElementById('url').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const newEntry = new Entry(url, login, password);

    saveEntry(newEntry);
    clearInputs();
    showEntries();
});

function clearInputs() {
    const url = document.getElementById('url').value = '';
    const login = document.getElementById('login').value = '';
    const password = document.getElementById('password').value = '';
}

// действие на кнопку генерации пароля
document.getElementById('generate').addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    const length = document.getElementById('length').value;

    passwordInput.value = generatePassword(length);
});

function saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));

    showEntries();
}

function showEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    passwordList.innerHTML = '';

    entries.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${entry.url}" target="_blank"> ${entry.url}</a> ${entry.login} ${entry.password} `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteEntry(index));

        li.appendChild(deleteButton);
        passwordList.appendChild(li);
    });
}

function generatePassword(length) {
    const checkboxes = document.querySelectorAll('input[name="symbols"]:checked');
    const selectedValues = Array.from(checkboxes).map(checkbox => checkbox.value);

    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (selectedValues.includes('numbers')) {
        chars += '0123456789';
    }
    if (selectedValues.includes('minus')) {
        chars += '-';
    }
    if (selectedValues.includes('underline')) {
        chars += '_';
    }
    if (selectedValues.includes('brackets')) {
        chars += '(){}[]';
    }
    if (selectedValues.includes('special')) {
        chars += '!@#$%^&*';
    }

    let password = '';

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}

showEntries();