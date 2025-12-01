const board = document.querySelector('.board');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const model = document.querySelector('.model');
const startGameModel = document.querySelector('.start-game');
const gameOverModel = document.querySelector('.game-over');

const highScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');

const upBtn = document.querySelector('.up-btn');
const rightBtn = document.querySelector('.right-btn');
const downBtn = document.querySelector('.down-btn');
const leftBtn = document.querySelector('.left-btn');


let highScore = localStorage.getItem("highScore") || 0
let score = 0
let time = `00-00`

highScoreElement.innerHTML = highScore

const blockHeight = 50
const blockWidth = 50

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

const blocks = []
let snake = [ {x: 0, y: 3} ]
let direction = 'right'
let intervalId = null
let timerIntervalId = null

let food = {x: Math.floor(Math.random()* rows), y: Math.floor(Math.random()* cols)}  // random values for food 

// create board row and columns by screen 
for(let r = 0; r < rows; r++ ) {
    for(let c = 0; c < cols; c++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);  
        blocks[`${r}-${c}`] = block;
    }
}

// on start remove model and start render function and start timing
startBtn.addEventListener('click', () => {
    model.style.display = "none"
    intervalId = setInterval(() => {
        render()
    }, 300)
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split('-').map(Number)
        if(sec == 59) {
            min += 1
            sec = 0
        }
        else {
            sec += 1
        }
        time = `${min}-${sec}`
        timeElement.innerHTML = time
    }, 1000)

})

// map users pressed key, to direction
addEventListener('keydown', (event) => {
    if(event.key === "ArrowLeft") {
        direction = "left"
    }
    else if(event.key === "ArrowRight") {
        direction = "right"
    }
    else if(event.key === "ArrowUp") {
        direction = "up"
    }
    else if(event.key === "ArrowDown") {
        direction = "down"
    }
})
// map direction by button click
function Controller() {
     upBtn.addEventListener('click', () => {
         direction = "up"
     })

     rightBtn.addEventListener('click', () => {
         direction = "right"
     })

     downBtn.addEventListener('click', () => {
         direction = "down"
     })

     leftBtn.addEventListener('click', () => {
         direction = "left"
     })
}
Controller()

// render function to check direction and render snake by direction value 
function render() {
    let head = null
    
    blocks[`${food.x}-${food.y}`].classList.add("food");  // render food at random block 

    if(direction === "left") {
        head = {x: snake[0].x, y: snake[0].y-1}
    }
    else if(direction === "right") {
        head = {x: snake[0].x, y: snake[0].y+1}
    }
    else if(direction === "up") {
        head = {x: snake[0].x-1, y: snake[0].y}
    }
    else if(direction === "down") {
        head = {x: snake[0].x+1, y: snake[0].y}
    }
    
    // check if snake hits wall then over game
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId)
        model.style.display = "flex"
        startGameModel.style.display = "none"
        gameOverModel.style.display = "flex"
        score = 0
        scoreElement.innerHTML = score
        time = `00-00`
        return;
    }

    // check if snake hits food block then re render the food
    if(head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
         food = {x: Math.floor(Math.random()* rows), y: Math.floor(Math.random()* cols)}
        blocks[`${food.x}-${food.y}`].classList.add("food");

        snake.unshift(head) // add new head to snake without removing tail

        score += 10  // increase score
        scoreElement.innerHTML = score // update score display
        if(score > highScore) {
            highScore = score
            localStorage.setItem("highScore", highScore.toString())
        }
    }

    snake.forEach(segment => {  // remove previous snake position
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");        
    })

    snake.unshift(head)  // add new head to snake
    snake.pop()  // remove tail

    snake.forEach(segment => { // render new snake position
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    })
}


restartBtn.addEventListener("click", restartGame)

function restartGame() {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })

    score = 0
    time = `00-00`
    scoreElement.innerHTML = score
    timeElement.innerHTML = time
    highScoreElement.innerHTML = highScore

    model.style.display = "none"
    direction = "down"
    snake = [ {x: 1, y: 3} ]
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random()* cols)}
    intervalId = setInterval(() => {
        render()
    }, 300)
}