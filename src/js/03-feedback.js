import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
    button: document.querySelector('button')
}
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateInputs();

function populateInputs() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);
    if (parsedData) {
        refs.input.value = parsedData.email;
        refs.textarea.value = parsedData.message;
    }
}

function onFormInputs() {
    if (formData) {}
    formData.email = refs.input.value;
    formData.message = refs.textarea.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    console.log(formData);
    localStorage.clear();
}

refs.form.addEventListener('input', throttle(onFormInputs, 500));
refs.form.addEventListener('submit', onFormSubmit);