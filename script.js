const board = document.querySelector('.board');
const blockHeight = 50
const blockWidth = 50

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

const blocks = []

for(let r = 0; r < rows; r++ ) {
    for(let c = 0; c < cols; c++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);  
        block.innerText = `${r}${c}`;
        blocks[`${r}-${c}`] = block;
    }
}