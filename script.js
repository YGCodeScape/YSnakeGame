const board = document.querySelector('.board');
const blockHeight = 30
const blockWidth = 30

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

for(let b = 0; b < rows * cols; b++) {
    const block = document.createElement('div');
    block.classList.add('block');
    board.appendChild(block);
}