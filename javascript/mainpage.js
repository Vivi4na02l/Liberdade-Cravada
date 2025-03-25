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

    if (beenDays == 0) {
        beenDays = currentHours;
        document.querySelector("#daysWord").innerHTML = "Horas";
    }

    document.querySelector("#yearsNbr").innerHTML = beenYears;
    document.querySelector("#monthsNbr").innerHTML = beenMonths;
    document.querySelector("#daysNbr").innerHTML = beenDays;

    console.log(beenDays);
    
}