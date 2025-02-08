

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
    console.log(currentDate.getFullYear())

    // For all errors

    const daysInMonth = getMonthsFromDays(yearInput, monthInput - 1);
    if (days.value == "" && days.value == "" && days.value == "") {
    days.classList.add("error");
    months.classList.add("error");
    years.classList.add("error");
    inputTitle.forEach((element) => {
        element.classList.add("error-color")
    });
    errorD.classList.remove("hidden");
    errorM.classList.remove("hidden");
    errorY.classList.remove("hidden");
    return;

    } else if (monthInput < 1 || monthInput > 12) {
    errorD.classList.add("hidden");
    errorY.classList.add("hidden");
    days.classList.add("error");
    months.classList.add("error");
    years.classList.add("error");
    inputTitle.forEach((element) => {
        element.classList.add("error-color")
    });

    errorM.textContent = "Must be a valid month"
    errorM.classList.remove("hidden");
    return;
    } else if (dayInput < 0 || dayInput > daysInMonth) {
    errorM.classList.add("hidden");
    errorY.classList.add("hidden");
    days.classList.add("error");
    months.classList.add("error");
    years.classList.add("error");
    inputTitle.forEach((element) => {
    element.classList.add("error-color")
    });

    errorD.textContent = "Must be a valid day"
    errorD.classList.remove("hidden");
    return;
    } else if (yearInput > currentDate.getFullYear()) {
    errorM.classList.add("hidden");
    errorD.classList.add("hidden");
    days.classList.add("error");
    months.classList.add("error");
    years.classList.add("error");
    inputTitle.forEach((element) => {
    element.classList.add("error-color")
    });

    errorY.textContent = "Must be in the past"
    errorY.classList.remove("hidden");
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

function getMonthsFromDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
}