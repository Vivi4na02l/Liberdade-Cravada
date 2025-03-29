for (const btnBall of document.querySelectorAll(".btnBall")) {
    btnBall.addEventListener("click", () => {
        let clickedYear = btnBall.id.slice(0, -1);
        let device = btnBall.id[btnBall.id.length-1]; /* finds out which html is being used since it changes depending on the device */

        btnBall.classList.remove("inactiveBall");
        btnBall.classList.add("activeBall");
        btnBall.parentElement.classList.add("bgRed");
        btnBall.parentElement.classList.remove("bgBeige");

        let buttons = ["1928", "1933", "1945", "1958", "1961", "1968", "1974"];
        let year = buttons.findIndex(year => year == clickedYear);
        
        //* "marks" any button preceding the one clicked */
        if (year != buttons.length-1) {
            let previousYears = year;

            for (let i = 0; i < year; i++) {
                previousYears--
                console.log(buttons[year-previousYears]);
                
                document.getElementById(`${buttons[year-previousYears]}${device}`).classList.remove("inactiveBall");
                document.getElementById(`${buttons[year-previousYears]}${device}`).classList.add("activeBall");
                document.getElementById(`${buttons[year-previousYears]}${device}`).parentElement.classList.add("bgRed");
                document.getElementById(`${buttons[year-previousYears]}${device}`).parentElement.classList.remove("bgBeige");
            }
        }
        
        //* "unmarks" any button following the one clicked */
        if (year != buttons[0]) {
            let followingYears = 0

            for (let i = 0; i < buttons.length-1-year; i++) {
                followingYears++

                console.log(year+followingYears);
                

                document.getElementById(`${buttons[year+followingYears]}${device}`).classList.remove("activeBall");
                document.getElementById(`${buttons[year+followingYears]}${device}`).classList.add("inactiveBall");
                document.getElementById(`${buttons[year+followingYears]}${device}`).parentElement.classList.add("bgBeige");
                document.getElementById(`${buttons[year+followingYears]}${device}`).parentElement.classList.remove("bgRed");
            }
        }
    });
}