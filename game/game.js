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
resetBoard()

function resetBoard () {
  moves = 1
  winner = ''
  update.textContent = player ? 'X\'s turn' : 'O\'s turn'
  if (player) {
    document.body.classList.add('x')
  } else {
    document.body.classList.add('o')
  }
  tiles.forEach(tile => {
    tile.textContent = ''
    tile.classList.add('active')
    tile.addEventListener('click', tictactoe)
  })
  playAgain.classList.toggle('button-on')
}

function disableBoard () {
  tiles.forEach(tile => {
    tile.removeEventListener('click', tictactoe)
    tile.classList.remove('active')
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
  tile.removeEventListener('click', tictactoe)
  tile.classList.remove('active')
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
    playAgain.addEventListener('click', resetBoard)
    playAgain.classList.toggle('button-on')
  } else if (moves === 9) {
    // it's a tie
    update.textContent = 'It\'s a tie!'
    disableBoard()
    updateScore()
    playAgain.addEventListener('click', resetBoard)
    playAgain.classList.toggle('button-on')
  } else {
    moves = moves + 1
    player = !player
    document.body.classList.toggle('x')
    document.body.classList.toggle('o')
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
