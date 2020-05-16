const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.getElementById('winningMessageText')
const restartButton = document.getElementById('restartButton')
const X_CLASS = 'x'
const O_CLASS = 'o'
// array of winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
// "O" turn if true, "X" turn if false
let circleTurn

// start game
startGame()

// reset game
restartButton.addEventListener('click', startGame)

function startGame() {
  // "X" goes first
  circleTurn = false
  // call "handleClick" when cell is clicked
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  // display hover symbols
  setBoardHoverClass()
  // hide winning message
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? O_CLASS : X_CLASS
  // place mark
  placeMark(cell, currentClass)
  // check for win
  if (checkWin(currentClass)) {
    endGame(false)
  // check for draw
  } else if (isDraw()) {
    endGame(true)
  } else {
    // switch turns
    swapTurns()
    // display hover symbols
    setBoardHoverClass()
  }
}

// place mark on cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// swap turns
function swapTurns() {
  circleTurn = !circleTurn
}

// handles hover symbols
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  if (circleTurn) {
    board.classList.add(O_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

// checks if theres a winning combo with the current class
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

// shows proper endgame message
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

// checks for draw
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}