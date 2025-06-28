// TIMER
timer({ day: 25, month: 4, year: 1974 })
function timer(revolutionDate) {
    const date = new Date();

    let currentDay = date.getDate();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    let currentHours = date.getHours();

    //* year's count */
    let beenYears = currentYear - revolutionDate.year - 1;

    //* month's count */
    let monthsIn1974 = 12 - revolutionDate.month;
    let beenMonths = currentMonth + monthsIn1974;

    //* days' count */
    let beenDays;
    if (currentDay < 25) {
        beenDays = currentDay + 6;
    } else if (currentDay > 25) {
        beenMonths += 1;
        beenDays = currentDay - 25;
    } else {
        beenMonths += 1;
        beenDays = 0;
    }

    // when it's a month-niversary show "years-months-hours" instead of "years-months-days"
    if (beenDays == 0) {
        beenDays = currentHours;
        document.querySelector("#daysWord").innerHTML = "Horas";
    }

    // when it's withing the month of the anniversary, after the 25th, show "years-days-hours" instead of "years-months-days"

    // when it's an anniversary show "years-hours-minutes" instead of "years-hours-days"

    if (beenMonths == 12) {
        beenYears++;
        document.querySelector("#monthsNbr").innerHTML = beenDays;
        document.querySelector("#monthsWord").innerHTML = "Dias";
        beenDays = currentHours;
        document.querySelector("#daysNbr").innerHTML = beenDays;
        document.querySelector("#daysWord").innerHTML = "Horas";
    } else if (beenMonths < 12) {
        document.querySelector("#monthsNbr").innerHTML = beenMonths;
        document.querySelector("#daysNbr").innerHTML = beenDays;
    } else {
        beenYears = beenYears + 1;
        document.querySelector("#monthsNbr").innerHTML = beenMonths - 12;
        document.querySelector("#daysNbr").innerHTML = beenDays;
    }

    document.querySelector("#yearsNbr").innerHTML = beenYears;

    // console.log(beenDays);
    
}