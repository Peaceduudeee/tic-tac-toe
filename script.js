
const X_CLASS='x'
const CIRCLE_CLASS='circle'
let circleTurn
const board=document.getElementById('board');
const winningMessageElement=document.querySelector('.winning-message')
const winningMessageTextElement=document.querySelector('.data-winning-message-text')
const restartButton=document.querySelector('#restartButton')
const WINNING_COMBINATIONS=[
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0 ,3, 6],[1, 4, 7],[2, 5, 8],[0 ,4, 8],[2, 4, 6]
]
function startGame(){
    circleTurn=false
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
startGame()

restartButton.addEventListener('click', ()=>{
    startGame();
})

// code to handle click on each cell

const cellElements=document.querySelectorAll('[data-cell]');
cellElements.forEach(cell=>{
    cell.addEventListener('click', handleClick, {once:true})
})
function handleClick(e){
    // console.log("clicked");
    //placemark
    const cell=e.target
    const currentClass=circleTurn?CIRCLE_CLASS:X_CLASS
    placeMark(cell, currentClass)
    // Check for Win
    if(checkWin(currentClass)){
        // console.log("winner");
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        // swapTurns()
    }
    // Check for Draw
    //Switch
    swapTurns();
    setBoardHoverClass();
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText="Draw!"
    }
    else{
        winningMessageTextElement.innerText=` ${circleTurn ?"O'S" : "X'S"} Wins!`
    }
    winningMessageElement.classList.add('show');
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
      board.classList.add(CIRCLE_CLASS)  
    }
    else {
        board.classList.add(X_CLASS)
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn=!circleTurn;
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

