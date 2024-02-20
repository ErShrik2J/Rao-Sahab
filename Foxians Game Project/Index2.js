const n = 10;
const matrixArray = [];

const ladderMap = {
    3: ["After arriving at the office, I created and submitted the DPT.\n DPT stands for Daily Plan Task, where we outline the tasks we need to accomplish after arriving at the office.", 18],
    7: ["Upon receiving the task, I created and submitted the WBS.\n WBS stands for Work Breakdown Structure, which involves breaking down assigned tasks into smaller components to create a structured plan. We then use this plan to create the DPT.", 41],
    15: ["I completed 6 tasks and created a unique project for the company.", 95],
    21: ["Whenever there were any problems related to tasks, I asked questions on Allemp.\n Allemp is a Gmail group where we raise and resolve questions.", 62],
    43: ["I created a BDD for the project.\n BDD stands for Behaviour Driven Development. When creating a project, we first develop a BDD to explain the entire project through behavior scenarios.", 80],
    35: ["I sent the P&L statement.\n 	P&L stands for Profit and Loss. Through this, we analyze tasks and ourselves to improve.", 30],
    55: ["I presented during Rising career session and participated in group discussions.\n Rising career session. ye ek session hai jisme hum apne soft skill ko enhance karte hai jiase communication presentation group disscution etc.", 87],
    64: ["I asked questions during the session.", 72]
};

const snakeMap = {
    26: ["After coming to the office, I forgot to send the DPT \n DPT ka matlab daily plan task office mai aane ke baad jo kaam hume karna hota hai isko iske ander likha jaata hai.", 4],
    39: ["I forgot send the WBS. after receiving the task . \n WBS stands for Work Breakdown Structure, which involves breaking down assigned tasks into smaller components to create a structured plan. We then use this plan to create the DPT.", 19],
    63: ["Although I completed the task but I forgot to submit them.", 23],
    76: ["I did not raise any questions on Allemp regarding any problems related to tasks. \n Allemp is a Gmail group where we raise and resolve questions.", 47],
    88: ["I did not create a BDD for the project.\n BDD stands for Behaviour Driven Development. When creating a project, we first develop a BDD to explain the entire project through behavior scenarios.", 28],
    46: ["I did not send the Profit and Loss P&L statement.\n 	P&L stands for Profit and Loss. Through this, we analyze tasks and ourselves to improve.", 57],
    69: ["I didn't present anything or speak during Rising career session.", 33],
    97: ["I didn't ask any questions during the session.", 77],
};

const LADDER_CLASS = "ladder";
const SNAKE_CLASS = "snake";

function createMatrix() {
    let block = n * n + 1;
    for (let column = 1; column <= n; column++) {
        let rows = [];
        if (column % 2 === 0) {
            block = block - n;
            let value = block;
            for (let row = 1; row <= n; row++) {
                rows.push(value);
                value++;
            }
        } else {
            for (let row = 1; row <= n; row++) {
                block = block - 1;
                rows.push(block);
            }
        }
        matrixArray.push(rows);
    }
    createBoard(matrixArray);
}

function createBoard(matrixArray) {
    const board = document.querySelector(".main-board");
    let str = "";
    matrixArray.map((row) => {
        str += `<div class="row">`;
        row.map((block) => {
            str += `
                <div class="block ${ladderMap[block] ? LADDER_CLASS : ""} ${snakeMap[block] ? SNAKE_CLASS : ""
            } ${block === 1 ? "active" : ""} " data-value=${block}>
                  ${block}
                </div>
            `;
        });
        str += `</div>`;
    });
    board.innerHTML = str;
}

function roll() {
    const dice = document.querySelector("img");
    dice.classList.add("shake");
    setTimeout(() => {
        dice.classList.remove("shake");
        const diceValue = Math.ceil(Math.random() * 6);
        document.querySelector("#dice-id").setAttribute("src", `assets/dice${diceValue}.png`);
        changeCurrentPosition(diceValue);
    }, 1000);
}

function changeCurrentPosition(diceValue) {
    const activeBlock = document.querySelector(".active");
    const activeBlockValue = parseInt(activeBlock.outerText);
    let presentValue = diceValue + activeBlockValue;

    // Check if the presentValue is in the ladderMap
    if (ladderMap[presentValue]) {
        // Show ladder message using SweetAlert2
        Swal.fire({
           // title: 'A!',
            html: `${ladderMap[presentValue][0].replace(/\n/g, '<br> <br>')}'<br> ${ladderMap[presentValue][1]}`,
            confirmButtonText: "OK"
        });
        // Set presentValue to the ladder's destination
        presentValue = ladderMap[presentValue][1];
    }

    // Check if the presentValue is in the snakeMap
    if (snakeMap[presentValue]) {
        // Show snake message using SweetAlert2
        Swal.fire({
           // title: "A!",
            html: `${snakeMap[presentValue][0].replace(/\n/g, '<br> <br>')}<br>${snakeMap[presentValue][1]}`,
            confirmButtonText: "OK"
        });
        // Set presentValue to the snake's destination
        presentValue = snakeMap[presentValue][1];
    }

    // Move the user to the next position
    if (presentValue <= n * n) {
        changeActiveClass(presentValue);
    } else {
        if (isGameComplete()) {
            Swal.fire({
                title: "Congratulations!",
                text: "You have successfully completed InternShip Part-I.",
                icon: "success ",
                confirmButtonText: "Restart"
            }).then((result) => {
                if (result.isConfirmed) {
                    restart();
                }
            });
        } else {
            Swal.fire({
                title: "You've reached the end!",
                text: "But the game is not complete. Keep playing!",
                icon: "info",
                confirmButtonText: "OK"
            });
        }
    }
}

function changeActiveClass(presentValue) {
    const activeBlock = document.querySelector(".active");
    activeBlock.classList.remove("active");
    const block = document.querySelector(`[data-value="${presentValue}"]`);
    block.classList.add("active");
}

function isGameComplete() {
    const activeBlock = document.querySelector(".active");
    const lastBlock = document.querySelector(`[data-value="${n * n}"]`);
    return activeBlock === lastBlock;
}

function restart() {
    matrixArray.length = 0;
    createMatrix();
    Swal.fire({
        title: "Game restarted",
        text: "Good luck!",
        icon: "success"
    });
}

// Initialize the game board
//createMatrix();
