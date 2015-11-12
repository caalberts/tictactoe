// select HTML elements and store them in variables
var update = document.querySelector('.status-text') // status bar
var tiles = Array.from(document.querySelectorAll('.tile')) // monitor tiles for 'X' and 'O'
var playAgain = document.querySelector('.play-again')
// create variables for the tic tac toe game
var player = true
var moves = 1
var winner = ''
var score = {
  x: 0,
  y: 0
}

updateScore()
update.textContent = player ? 'X\'s turn' : 'O\'s turn'
resetBoard()

playAgain.addEventListener('click', resetBoard)

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

function updateScore () {
  document.querySelector('.score-x').textContent = score.x
  document.querySelector('.score-y').textContent = score.y
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
