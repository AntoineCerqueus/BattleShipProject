document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user');
  const computerGrid = document.querySelector('.grid-computer');
  const startButton = document.querySelector('#start');
  const randomPlacementButton = document.querySelector('#random');
  const turnDisplay = document.querySelector('#whose-go');
  const infoDisplay = document.querySelector('#info');
  const setupButtons = document.getElementById('setup-button');
  const restartButton = document.getElementById('restart');
  const endgameButton = document.getElementById('endgame');
  const history = document.getElementById('game-info');

  const userSquares = [];
  const computerSquares = [];

  let isGameOver = false;
  let currentPlayer = 'user';
  const width = 10;

  // ======================================================
  //                      Create Board
  // ======================================================

  function createBoard(grid, squares) {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard(userGrid, userSquares);
  createBoard(computerGrid, computerSquares);

  // ======================================================
  //                      Create Ships
  // ======================================================

  const shipArray = [
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, width]
      ]
    }
  ]
  // ========================================================
  //      Draw the computers ships in random locations
  // ========================================================

  function generateComputer(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) {
      direction = 1;
    }
    if (randomDirection === 1) {
      direction = 10;
    }
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)));

    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'));
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1);
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0);

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
      current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
    } else {
      generateComputer(ship)
    }
  }
  generateComputer(shipArray[0]); //get destroyer

  function generateUser(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) { //put random ship vertically
      direction = 1;
    }
    if (randomDirection === 1) { //put random ship horizontally
      direction = 10;
    }
    let randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (ship.directions[0].length * direction)));

    const isTaken = current.some(index => userSquares[randomStart + index].classList.contains('taken'));
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1);
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0);

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
      current.forEach(index => userSquares[randomStart + index].classList.add('taken', ship.name))
    } else {
      generateUser(ship)
    }
  }

  generateUser(shipArray[0]); //get destroyer

  // ========================================================
  //     Draw the users ship in random location on click
  // ========================================================

  randomPlacementButton.addEventListener('click', refreshPage);
  function refreshPage() {
    window.location.reload();
  }

  // ======================================================
  //                      Game Logic
  // ======================================================

  function playGame() {
    if (isGameOver) {
      return;
    }
    if (currentPlayer === 'user') {
      turnDisplay.innerHTML = " Your turn " + localStorage.getItem("username");
      computerSquares.forEach(square => square.addEventListener('click', function (e) {
        revealSquare(square);
      }))
    }
    if (currentPlayer === 'computer') {
      turnDisplay.innerHTML = "Computer's turn";
      setTimeout(computerGo, 1000);
    }
  }
  startButton.addEventListener('click', function () {

    setupButtons.style.display = 'none';
    restartButton.style.display = 'flex';
    turnDisplay.style.display = 'flex';
    playGame();
  })

  let destroyerCount = 0;

  function revealSquare(square) {
    if (!square.classList.contains('boom') && !square.classList.contains('miss')) {
      if (square.classList.contains('destroyer')) {
        destroyerCount++;
      }
      if (square.classList.contains('submarine')) {
        submarineCount++;
      }
      if (square.classList.contains('cruiser')) {
        cruiserCount++;
      }
      if (square.classList.contains('battleship')) {
        battleshipCount++;
      }
      if (square.classList.contains('carrier')) {
        carrierCount++;
      }
    } else {
      return;
    }
    if (square.classList.contains('taken')) {
      square.classList.add('boom');
      console.log('boom');
    } else {
      square.classList.add('miss');
      console.log('missed');
    }

    checkForWins();
    currentPlayer = 'computer';
    playGame();
  }

  let cpuDestroyerCount = 0;

  function computerGo() {
    let random = Math.floor(Math.random() * userSquares.length);
    if (!userSquares[random].classList.contains('boom') && !userSquares[random].classList.contains('miss')) {
      const hit = userSquares[random].classList.contains('taken');
      userSquares[random].classList.add(hit ? 'boom' : 'miss'); // ? = Si Hit Tu mets "boom" sinon tu mets "miss"
      if (hit) console.log('boom');
      if (!hit) console.log('missed');
      if (userSquares[random].classList.contains('destroyer')) {
        cpuDestroyerCount++;
        console.log('destroy all humans');
      }
      checkForWins();
    } else {
      computerGo();
    }
    currentPlayer = 'user';
    turnDisplay.innerHTML = " Your Turn " + localStorage.getItem("username");
  }

  function checkForWins() {
    if (destroyerCount === 2) {
      let infoUserDestroyer = document.createElement('div');
      infoUserDestroyer.innerHTML = "You sunk the computer's destroyer";
      history.appendChild(infoUserDestroyer);
      destroyerCount = 10;
    }
   
    if (cpuDestroyerCount === 2) {
      //infoDisplay.innerHTML = 'The Computer sunk your Destroyer'
      cpuDestroyerCount = 10;
    }
    if ((destroyerCount) === 10) {
      infoDisplay.innerHTML = "YOU WIN" + ' ' + localStorage.getItem("username");
      gameOver();
    }
    if ((cpuDestroyerCount) === 10) {
      infoDisplay.innerHTML = "COMPUTER WINS";
      gameOver();
    }
  }

  function gameOver() {
    isGameOver = true
    endgameButton.style.display = 'flex';
    restartButton.style.display = 'none';
    turnDisplay.style.display = 'none';
    //startButton.removeEventListener('click', playGame)
  }

})