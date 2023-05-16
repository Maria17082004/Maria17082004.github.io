
const enableValidationData = {
    formSelector: '.form-popup__form',
    inputSelector: '.form-popup__input',
    submitButtonSelector: '.form-popup__button',
    inactiveButtonClass: 'disabled',
    inputErrorClass: 'error',
    errorClass: 'error_visible'
};

const formPopup = document.querySelector(".form-popup");
const formPopupForm = document.querySelector(".form-popup__form");
const formClosePopupButton = document.querySelector(".form-popup__close-button");
const formButtonContact = document.querySelector(".button-contact");
const buttonFormPopup = document.querySelector(".form-popup__button");

const validationPopup = document.querySelector(".validation-popup");
const validationPopupCloseButton = document.querySelector(".validation-popup__close-button");

const popupLinkR = document.querySelector(".popup__link_right");
const popupLinkL = document.querySelector(".popup__link_left");

const popupItems = document.querySelectorAll(".link_popup");

const popupImage = document.querySelector(".popup__image");

const popupAppear = document.querySelector(".appear-popup");

const appearPopupButton = document.querySelector(".appear-popup__close-button");

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function showInputError(formElement, inputElement, errorMessage, parametrs) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(parametrs.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(parametrs.errorClass);
}

function hideInputError(formElement, inputElement, parametrs) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(parametrs.inputErrorClass);
    errorElement.classList.remove(parametrs.errorClass);
    errorElement.textContent = '';
}

function isValid(formElement, inputElement, parametrs) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, parametrs);
    } else {
        hideInputError(formElement, inputElement, parametrs);
    }
}

function setEventListeners(formElement, parametrs) {
    const inputList = Array.from(formElement.querySelectorAll(parametrs.inputSelector));
    const buttonElement = formElement.querySelector(parametrs.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, parametrs);
            toggleButtonState(inputList, buttonElement, parametrs.inactiveButtonClass);
        });
    });
}

function enableValidation(parametrs){
    const formList = Array.from(document.querySelectorAll(parametrs.formSelector));
    formList.forEach((formElement) => {setEventListeners(formElement, parametrs)});
}

enableValidation(enableValidationData);



formPopupForm.addEventListener('submit',  (evt)  =>{
    evt.preventDefault();
    buttonFormPopup.textContent = "Отправляется...";
    const {tel, email, text} = evt.currentTarget.elements;
    createPost({
        tel: tel.value,
        email: email.value,
        text: text.value
    })
})

const createPost =  (post) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'charset=UTF-8'
        },
        body: JSON.stringify({
            name: post.name,
            tel: post.tel,
            email: post.email
        })
    })
        .then(successfulValid)
}


const successfulValid = function () {
    buttonFormPopup.textContent = "Отправить";
    closePopup(formPopup, "form-popup_open");
    openPopup(validationPopup, "validation-popup_open");
}

validationPopupCloseButton.addEventListener('click',  (evt)  =>{
    closePopup(validationPopup,"validation-popup_open");
})



const checkLinks =  (img) =>{
    const imgParent = img.parentElement;
    if (imgParent.nextElementSibling) {
        popupLinkR.setAttribute('style', 'display: block');
    }
    else {
        popupLinkR.setAttribute('style', 'display: none');
    }
    if (imgParent.previousElementSibling) {
        popupLinkL.setAttribute('style', 'display: block');
    }
    else {
        popupLinkL.setAttribute('style', 'display: none');
    }
}


const popup = document.querySelector(".popup");
popupItems.forEach((item) => {
    item.addEventListener('click', (evt) => {
        evt.preventDefault();
        openPopup(popup,"popup_open");
        const imgLink = evt.currentTarget.getAttribute('href');
        const img = evt.currentTarget;
        img.classList.add('active');
        popupImage.innerHTML = `<img src="${imgLink}"alt="Картинка" style="max-width: 100%">`;
        checkLinks(img);
    })
})

popupLinkR.addEventListener('click', (evt)  =>{
    evt.preventDefault();
    const img = document.querySelector(".active");
    const imgLink = img.parentElement.nextElementSibling.firstElementChild.getAttribute("href");
    popupImage.innerHTML = `<img src="${imgLink}"alt="Картинка" style="max-width: 100%">`;
    img.classList.remove("active");
    const nextImg = img.parentElement.nextElementSibling.firstElementChild;
    nextImg.classList.add("active");
    checkLinks(nextImg);
})

popupLinkL.addEventListener('click', (evt) => {
    evt.preventDefault();
    const img = document.querySelector(".active");
    const imgLink = img.parentElement.previousElementSibling.firstElementChild.getAttribute("href");
    popupImage.innerHTML = `<img src="${imgLink}"alt="Картинка" style="max-width: 100%">`;
    img.classList.remove("active");
    const previousImg = img.parentElement.previousElementSibling.firstElementChild;
    previousImg.classList.add("active");
    checkLinks(previousImg);
})



const popupOpen = document.querySelector(".popup");

document.addEventListener('click', (evt) =>{
    if(evt.target === popupOpen && popupOpen.classList.contains("popup_open")){
        const img = document.querySelector(".active");
        img.classList.remove("active");
        closePopup(popupOpen,"popup_open");
        popupOpen.querySelectorAll('.popup').forEach((popupItem) => {
            popupItem.classList.remove("popup_active");
        });
    }

});




setTimeout(() => {
    openPopup(popupAppear,"appear-popup_open");
}, 30000);

appearPopupButton.addEventListener('click',  (evt)  =>{
    evt.preventDefault();
    closePopup(popupAppear,"appear-popup_open");
})

function openPopup(popup, popupClass) {
    popup.classList.add(popupClass);
}
function closePopup(popup, popupClass) {
    popup.classList.remove(popupClass);
}

formClosePopupButton.addEventListener('click',  (evt) => {
    closePopup(formPopup, 'form-popup_open');
})

formButtonContact.addEventListener('click',  (evt) => {
    openPopup(formPopup, 'form-popup_open');
})


document.addEventListener('click', (evt) =>{
    if (evt.target === formPopup && formPopup.classList.contains("form-popup_open")) {
        closePopup(formPopup, 'form-popup_open');
    }
    if (evt.target === popupAppear && popupAppear.classList.contains("appear-popup_open")) {
        closePopup(popupAppear, "appear-popup_open");
    }
    if (evt.target === validationPopup && validationPopup.classList.contains("validation-popup_open")) {
        closePopup(validationPopup,"validation-popup_open");
    }
});


const formButtonTheme = document.querySelector(".header__button");
const page = document.querySelector(".page");
formButtonTheme.addEventListener('click',  (evt)  =>{
    page.classList.toggle("page_dark");
    
})



const rainAnimation = document.querySelector(".rain");
const rainButton = document.querySelector(".button-rain");
rainButton.addEventListener('click',  (evt) => {
    evt.preventDefault();
    if (window.innerWidth >= 800) {
        const rain = document.querySelector(".rain");
        rain.classList.add("rain_active");
        rain.classList.add("rain_animation");
    }
})
rainAnimation.addEventListener('click',  ()  =>{
    if (rainAnimation.classList.contains("rain_active")) {
        rainAnimation.classList.remove("rain_active");
    }
})
window.addEventListener('resize',  () => {
    if (rainAnimation.classList.contains("rain_active")) {
        rainAnimation.classList.toggle("rain_animation");
    }
})

