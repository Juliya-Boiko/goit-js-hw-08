import throttle from "lodash.throttle";

// const refs = {
//     form: document.querySelector('.feedback-form'),
//     input: document.querySelector('input'),
//     textarea: document.querySelector('textarea'),
//     button: document.querySelector('button')
// }

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateInputs();

function populateInputs() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);
    if (parsedData) {
        form.elements.email.value = parsedData.email;
        form.elements.message.value = parsedData.message;
    }
}

function onFormInputs(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
    evt.preventDefault();
    if (form.elements.email.value === '' || form.elements.message.value === '') {
        alert('Все поля должны быть заполнены!');
        return;
    }
    evt.currentTarget.reset();
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
}

form.addEventListener('input', throttle(onFormInputs, 500));
form.addEventListener('submit', onFormSubmit);