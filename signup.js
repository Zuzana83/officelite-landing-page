import get from "./getElement.js";

const deadlineEl = get("#deadline_date");
const items = [...document.querySelectorAll(".time_value")];
const signupCountdownItems = [...document.querySelectorAll(".time_value_signup")];

// Months array
const months = ["jan", "feb", "march", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// Dynamic approach, always 10 days ahead
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// months are zero index base;
const futureDate = new Date(tempYear, tempMonth, tempDay + 10);

const year = futureDate.getFullYear();
const month = futureDate.getMonth();
const day = futureDate.getDate();

deadlineEl.textContent = `${day} ${months[month]} ${year}`;

// COUNTER
const futureTime = futureDate.getTime();

function countRemainingTime() {
    const today = new Date().getTime();
    const d = futureTime - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60min
    // 1day = 24hr

    // values in milliseconds
    const oneDay= 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(d/oneDay);
    const hours = Math.floor((d % oneDay)/oneHour);
    const minutes = Math.floor((d % oneHour)/oneMinute);
    const seconds = Math.floor((d% oneMinute)/1000);

    const values = [days, hours, minutes, seconds];

    // function to add 0 if it is less than 10 
    function format(num) {
        if(num < 10) {
            return num = `0${num}`
        } else {
            return num
        }
    }

    items.forEach((item, index) => {
        item.textContent = format(values[index]);
    });

    signupCountdownItems.forEach((item, index) => {
        item.textContent = format(values[index]);
    });

    // Real world countdown - date wash reach and countdown is over
    if(d < 0) {
        clearInterval(countdown);
        // Message to user that countdown is over
        alert("Countdown is over");
    }
}

let countdown = setInterval(countRemainingTime, 1000);

// set initial value
countRemainingTime();

// Name & Email validation
const nameEl = get("#fullName");
const emailEl = get("#emailAddress");
const signupFormEl = get("#signupForm");
const errMsgEl = get(".error");
const submitBtn = get("#submitBtn");

// FORM VALIDATION
const emailPattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

const showError = (el, message) => {
    const element = document.getElementById(el);
    element.classList.add("err")
    errMsgEl.classList.add("show");
    const textMsgEl = errMsgEl.querySelector("span");
    textMsgEl.textContent = message;
}

const clearValidation = (el) => {
    const element = document.getElementById(el);
    element.classList.remove("err");
    errMsgEl.classList.remove("show");
}

const validateName = (fName) => {
    if(fName === "") {
        showError("fullName", "Full name can not be blank");
        return false;
    }
    errMsgEl.classList.remove("show");
    return true;
}

const validateEmail = (email) => {
    // Empty value
    if(!email) {
        showError("emailAddress", "Email can not be blank!")
        return false;   
    }
    if(!isValidEmailFormat(email)) {
        showError("emailAddress","Please enter valid email format.")
        return false;
    }
    errMsgEl.classList.remove("show");
    return true;
}

const isValidEmailFormat = (email) => {
    return emailPattern.test(email);
}

const submissionSuccessful = () => {
    submitBtn.disabled = true;
    setTimeout(() => {
        alert("Thank you! We will contact you soon.");
        signupFormEl.reset();
        // clearValidation();
        submitBtn.disabled = false;
    }, 1500);
}

const validationAndSubmission = () => {
    const email = emailEl.value.trim();
    const fullName = nameEl.value.trim();

    if(validateName(fullName) && validateEmail(email)) {
        submissionSuccessful();
    }
}

signupFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    validationAndSubmission();
});

emailEl.addEventListener("input", () => {
    clearValidation("emailAddress");
});

nameEl.addEventListener("input", () => {
    clearValidation("fullName");
});


