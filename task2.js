var formElement = document.forms['formElement'];

formElement.addEventListener("focus", () => formElement.classList.add('focused'), true);
formElement.addEventListener("blur", () => formElement.classList.remove('focused'), true);