

// input tags

let days = document.getElementById("day");
let months = document.getElementById("month");
let years = document.getElementById("year");

// submission

let arrowBtn = document.querySelector(".arrow-container");


// calculated values

let calcYear = document.getElementById("years-value");
let calcMonth = document.getElementById("months-value");
let calcDay = document.getElementById("days-value");


// Input-titles

const inputTitle = document.querySelectorAll(".title");


// for errors 

const errorD = document.querySelector(".error-d.hidden");
const errorM = document.querySelector(".error-m.hidden");
const errorY = document.querySelector(".error-y.hidden");


// event for the arrow button
arrowBtn.addEventListener("click", calcAge);



function calcAge() {

    let dayInput = days.value;
    let monthInput = months.value;
    let yearInput = years.value;

    const birthDate = new Date(`${yearInput}-${monthInput}-${dayInput}`);
    const currentDate = new Date();


    // For all errors
    resetErrors();
    const daysInMonth = getMonthsFromDays(yearInput, monthInput - 1);

     // Check if all fields are empty or invalid
     if (!dayInput && !monthInput && !yearInput) {
        showError("All fields are required", [errorD, errorM, errorY], [days, months, years]);
        return;
    }

    if (monthInput < 1 || monthInput > 12 &&
        dayInput < 1 || dayInput > daysInMonth &&
        yearInput > currentDate.getFullYear()
    ) {
        showError("Must be a valid month", [errorM], [months]);
        showError("Must be in the past", [errorY], [years]);
        showError("Must be a valid day", [errorD], [days]);
        return;
    }

    if (monthInput < 1 || monthInput > 12) {
        showError("Must be a valid month", [errorM], [months, years, days]);
        return;
    }

    if (dayInput < 1 || dayInput > daysInMonth) {
        showError("Must be a valid day", [errorD], [days, months, years]);
        return;
    }

    if (yearInput > currentDate.getFullYear()) {
        showError("Must be in the past", [errorY], [years, months, days]);
        return;
    }

    /* ---------------------------------------- */

    let y = currentDate.getFullYear() - birthDate.getFullYear();
    let m = currentDate.getMonth() - birthDate.getMonth();
    let d = currentDate.getDate() - birthDate.getDate();

    if (m < 0) {
        y -= 1;
        m += 12;
    }

    if (d < 0) {
        m -= 1;
        d += getMonthsFromDays(currentDate.getFullYear(), currentDate.getMonth() - 1);
    }

    calcYear.textContent = y;
    calcMonth.textContent = m;
    calcDay.textContent = d;
}


function showError(message, errorElements, inputElements) {
    inputElements.forEach(element => element.classList.add("error"));
    inputTitle.forEach(element => element.classList.add("error-color"));
    errorElements.forEach(errorElement => {
        errorElement.classList.remove("hidden");
        errorElement.textContent = message;
    });
    days.value = "";
    months.value = "";
    years.value = "";
}

// Function to reset error messages and input styles
function resetErrors() {
    [errorD, errorM, errorY].forEach(errorElement => errorElement.classList.add("hidden"));
    [days, months, years].forEach(input => input.classList.remove("error"));
    inputTitle.forEach(element => element.classList.remove("error-color"));
}



function getMonthsFromDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
}