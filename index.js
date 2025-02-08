

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


// event for the arrow button
arrowBtn.addEventListener("click", calcAge);



function calcAge() {
    let dayInput = days.value;
    let monthInput = months.value;
    let yearInput = years.value;

    const birthDate = new Date(`${yearInput}-${monthInput}-${dayInput}`);
    const currentDate = new Date();
    console.log(birthDate);
    console.log(currentDate);
    console.log(birthDate.getDate());
    console.log(birthDate.getMonth());
    console.log(birthDate.getFullYear());

    if (birthDate > currentDate || isNaN(birthDate)) {
        alert("Enter a valid BirthDate!")
        days.value = "";
        months.value = "";
        years.value = "";
        return;
    }

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