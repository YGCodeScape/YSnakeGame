const board = document.querySelector('.board');
const startBtn = document.querySelector('.start-btn');
const model = document.querySelector('.model');
const startGameModel = document.querySelector('.start-game');
const gameOverModel = document.querySelector('.game-over');

const blockHeight = 50
const blockWidth = 50

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

const blocks = []
const snake = [ {x: 0, y: 3} ]
let direction = 'right'
let intervalId = null
let food = {x: Math.floor(Math.random()* rows), y: Math.floor(Math.random()* cols)}

for(let r = 0; r < rows; r++ ) {
    for(let c = 0; c < cols; c++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);  
        blocks[`${r}-${c}`] = block;
    }
}

startBtn.addEventListener('click', () => {
    model.style.display = "none"
    intervalId = setInterval(() => {
        render()
    }, 300)
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

function render() {
    let head = null

    blocks[`${food.x}-${food.y}`].classList.add("food");

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

    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId)
        model.style.display = "flex"
        startGameModel.style.display = "none"
        gameOverModel.style.display = "flex"
        return;
    }

    if(head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
         food = {x: Math.floor(Math.random()* rows), y: Math.floor(Math.random()* cols)}
        blocks[`${food.x}-${food.y}`].classList.add("food");

        snake.unshift(head)
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");        
    })

    snake.unshift(head)
    snake.pop()

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    })
}

// intervalId = setInterval(() => {
//     render()
// }, 400)