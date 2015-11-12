// select HTML elements and store them in variables
var body = document.querySelector('body') // body element to listen for clicks
var update = document.querySelector('.status-text') // status bar
var tiles = Array.from(document.querySelectorAll('.tile')) // monitor tiles for 'X' and 'O'
var reset = document.querySelector('.reset') // reset button to reset the game
var playAgain = document.querySelector('.play-again')
// create variables for the tic tac toe game
var player = true,
    moves = 1,
    winner = '',
    score = {
      x: 0,
      y: 0
    }

updateScore()
update.textContent = player ? 'X\'s turn' : 'O\'s turn'
resetBoard()
// Event listener on reset button
// reset.addEventListener('click', resetBoard)

playAgain.addEventListener('click', resetBoard)

// function to start the game
function startGame () {


}

function resetBoard () {
  moves = 1
  winner = ''
  tiles.forEach(tile => {
    tile.textContent = ''
    tile.addEventListener('click', tictactoe)
  })
}

function disableBoard () {
  tiles.forEach(tile => {
    tile.removeEventListener('click', tictactoe)
  })
}

function tictactoe (event) {
  var tile = event.target
  if (!tile.className.includes('tile')) return
  if (tile.textContent) return
  tile.textContent = player ? 'X' : 'O'
  // find winner by checking tiles for 'X' and 'O'
  winner = findWinner()
  if (winner) {
    update.textContent = winner + ' wins!'
    if (winner === 'X') {
      score.x += 1
      player = false
    } else {
      score.y += 1
      player = true
    }
    disableBoard()
    updateScore()
    playAgain.disabled = false
  } else if (moves === 9) {
    // it's a tie
    update.textContent = 'It\'s a tie!'
  } else {
    moves = moves + 1
    player = !player
    update.textContent = player ? 'X\'s turn' : 'O\'s turn'
  }
}

function findWinner () {
  // tiles layout by index
  // [0] [1] [2]
  // [3] [4] [5]
  // [6] [7] [8]
  var winningCombination = [ [0, 1, 2], [3, 4, 5], [6, 7, 8],
                             [0, 3, 6], [1, 4, 7], [2, 5, 8],
                             [0, 4, 8], [2, 4, 6]]

  if (winningCombination.some(combo =>
    combo.every(tileIndex =>
      tiles[tileIndex].textContent === 'X'))) return 'X'
  else if (winningCombination.some(combo =>
    combo.every(tileIndex =>
      tiles[tileIndex].textContent === 'O'))) return 'O'
}

function updateScore () {
  document.querySelector('.score-x').textContent = score.x
  document.querySelector('.score-y').textContent = score.y
}
