//Game Constant and Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../Audio/Food.mp3');
const gameOverSound = new Audio('../Audio/GameOver.mp3');
const moveSound = new Audio('../Audio/Move.mp3');
const musicSound = new Audio('../Audio/BgMusic.mp3');
let speed = 15;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };


//Game Functions
const main = (ctime) => {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

//game over logics
const isColides = (snake) => {
    //if you hit yourself with your head
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you hit the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

//game engine
const gameEngine = () => {
    // Part 1: Updating the snake array and Foods
    if (isColides(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press any key to play again");
        score = 0;
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();   
    }

    // If you have eaten the food , increase the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        foodSound.play();

        //increase the score
        score++;
        if(score>highScoreValue){
            highScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue));
            highScorBox.innerHTML="#High Score: " + highScoreValue;
        }
        scoreBox.innerHTML = "#Score: " + score;

        //regenerate the food
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }



    // moving the snake
    for (let i = snakeArr.length - 1; i > 0; i--) {
        // snakeArr[i].x = snakeArr[i - 1].x;
        // snakeArr[i].y = snakeArr[i - 1].y;
        snakeArr[i] = { ...snakeArr[i - 1] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part 2: Display 
    // Display snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//main logic starts
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    highScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreValue));
}
else {
    highScoreValue =JSON.parse(highScore)
    highScorBox.innerHTML="#High Score: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {   
    inputDir = { x: 0, y: 0 }
    moveSound.play();
    // musicSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})