document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user')
  const computerGrid = document.querySelector('.grid-computer')
  const displayGrid = document.querySelector('.grid-display')
  const ships = document.querySelectorAll('.ship')
  const destroyer = document.querySelector('.destroyer-container')
  const submarine = document.querySelector('.submarine-container')
  const cruiser = document.querySelector('.cruiser-container')
  const battleship = document.querySelector('.battleship-container')
  const carrier = document.querySelector('.carrier-container')
  const startButton = document.querySelector('#start')
  const rotateButton = document.querySelector('#rotate')
  const randomPlacementButton = document.querySelector('#random')
  const turnDisplay = document.querySelector('#whose-go')
  const infoDisplay = document.querySelector('#info')
  const setupButtons = document.getElementById('setup-button')
  const restartButton = document.getElementById('restart')
  const endgameButton = document.getElementById('endgame')
  const history = document.getElementById('game-info')
  const userSquares = []
  const computerSquares = []
  let isHorizontal = true
  let isGameOver = false
  let currentPlayer = 'user'
  const width = 10

  // let lsOutput = document.getElementById('ls-output');
  // lsOutput.classList.add('lsOutput');
  // lsOutput.innerHTML = localStorage.getItem("username");
  // console.log(localStorage.getItem("username"));

  //Create Board
  function createBoard(grid, squares) {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    }
  }
  createBoard(userGrid, userSquares)
  createBoard(computerGrid, computerSquares)

  //Ships
  const shipArray = [
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, width]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0, 1, 2],
        [0, width, width * 2]
      ]
    },
    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, width, width * 2]
      ]
    },
    {
      name: 'battleship',
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3]
      ]
    },
    {
      name: 'carrier',
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width * 2, width * 3, width * 4]
      ]
    },
  ]

  //Draw the computers ships in random locations
  function generateComputer(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))

    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))

    else generateComputer(ship)
  }
  generateComputer(shipArray[0]) //get destroyer
  generateComputer(shipArray[1]) //get submarine
  // generateComputer(shipArray[2]) //get cruiser            apply generate function
  // generateComputer(shipArray[3]) //get battleship
  generateComputer(shipArray[4]) //get carrier




  function generateUser(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1 //put random ship vertically
    if (randomDirection === 1) direction = 10 //put random ship horizontally
    let randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (ship.directions[0].length * direction)))

    const isTaken = current.some(index => userSquares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => userSquares[randomStart + index].classList.add('taken', ship.name))

    else generateUser(ship)
  }


  generateUser(shipArray[0]) //get destroyer
  generateUser(shipArray[1]) //get submarine
  // generateUser(shipArray[2]) //get cruiser            apply generate function
  // generateUser(shipArray[3]) //get battleship
  generateUser(shipArray[4]) //get carrier

    //Draw the users ship in random location on click
    randomPlacementButton.addEventListener('click', refreshPage);
    function refreshPage(){
      window.location.reload();
    };
  // //Rotate ships
  // function rotate() {
  //   if (isHorizontal) {
  //     destroyer.classList.toggle('destroyer-container-vertical')
  //     submarine.classList.toggle('submarine-container-vertical')
  //     cruiser.classList.toggle('cruiser-container-vertical')
  //     battleship.classList.toggle('battleship-container-vertical')
  //     carrier.classList.toggle('carrier-container-vertical')
  //     isHorizontal = false
  //     console.log(isHorizontal)
  //     return
  //   }
  //   if (!isHorizontal) {
  //     destroyer.classList.toggle('destroyer-container-vertical')
  //     submarine.classList.toggle('submarine-container-vertical')
  //     cruiser.classList.toggle('cruiser-container-vertical')
  //     battleship.classList.toggle('battleship-container-vertical')
  //     carrier.classList.toggle('carrier-container-vertical')
  //     isHorizontal = true
  //     console.log(isHorizontal)
  //     return
  //   }
  // }
  // rotateButton.addEventListener('click', rotate)

  // //move around user ship
  // ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
  // userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
  // userSquares.forEach(square => square.addEventListener('dragover', dragOver))
  // userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
  // userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
  // userSquares.forEach(square => square.addEventListener('drop', dragDrop))
  // userSquares.forEach(square => square.addEventListener('dragend', dragEnd))

  // let selectedShipNameWithIndex
  // let draggedShip
  // let draggedShipLength

  // ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
  //   selectedShipNameWithIndex = e.target.id
  //   console.log(selectedShipNameWithIndex)
  // }))

  // function dragStart() {
  //   draggedShip = this
  //   draggedShipLength = this.childNodes.length
  //   console.log(draggedShip)
  // }

  // function dragOver(e) {
  //   e.preventDefault()
  // }

  // function dragEnter(e) {
  //   e.preventDefault()
  // }

  // function dragLeave() {
  //   console.log('drag leave')
  // }

  // function dragDrop() {
  //   let shipNameWithLastId = draggedShip.lastChild.id
  //   let shipClass = shipNameWithLastId.slice(0, -2)
  //   console.log(shipClass)
  //   let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
  //   let shipLastId = lastShipIndex + parseInt(this.dataset.id)
  //   console.log(shipLastId)
  //   const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
  //   const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]

  //   let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
  //   let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

  //   selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))

  //   shipLastId = shipLastId - selectedShipIndex
  //   console.log(shipLastId)

  //   if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
  //     for (let i=0; i < draggedShipLength; i++) {
  //       let directionClass
  //       if (i === 0) directionClass = 'start'
  //       if (i === draggedShipLength - 1) directionClass = 'end'
  //       userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass)
  //     }
  //   //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
  //   //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
  //   } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
  //     for (let i=0; i < draggedShipLength; i++) {
  //       let directionClass
  //       if (i === 0) directionClass = 'start'
  //       if (i === draggedShipLength - 1) directionClass = 'end'
  //       userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', 'vertical', directionClass, shipClass)
  //     }
  //   } else return

  //   displayGrid.removeChild(draggedShip)
  // }

  // function dragEnd() {
  //   console.log('dragend')
  // }

  //Game Logic
  function playGame() {
    if (isGameOver) return
    if (currentPlayer === 'user') {
      turnDisplay.innerHTML = localStorage.getItem("username");
      computerSquares.forEach(square => square.addEventListener('click', function (e) {
        revealSquare(square)
      }))
    }
    if (currentPlayer === 'computer') {
      turnDisplay.innerHTML = "Computer's Go"
      setTimeout(computerGo, 1000)
    }
  }
  startButton.addEventListener('click', function () {

    setupButtons.style.display = 'none';
    restartButton.style.display = 'flex';
    turnDisplay.style.display = 'flex';
    playGame();

  })

  let destroyerCount = 0
  let submarineCount = 0
  let cruiserCount = 0
  let battleshipCount = 0
  let carrierCount = 0


  function revealSquare(square) {
    if (!square.classList.contains('boom') && !square.classList.contains('miss')) {
      if (square.classList.contains('destroyer')) destroyerCount++
      if (square.classList.contains('submarine')) submarineCount++
      if (square.classList.contains('cruiser')) cruiserCount++
      if (square.classList.contains('battleship')) battleshipCount++
      if (square.classList.contains('carrier')) carrierCount++
    } else {
      return; 
    }

    if (square.classList.contains('taken')) {
      square.classList.add('boom')
      console.log('boom')
    } else {
      square.classList.add('miss')
      console.log('missed')
    }

    checkForWins()
    currentPlayer = 'computer'
    playGame()
  }

  let cpuDestroyerCount = 0
  let cpuSubmarineCount = 0
  let cpuCruiserCount = 0
  let cpuBattleshipCount = 0
  let cpuCarrierCount = 0


  function computerGo() {
    let random = Math.floor(Math.random() * userSquares.length)
    if (!userSquares[random].classList.contains('boom') && !userSquares[random].classList.contains('miss')) {
      const hit = userSquares[random].classList.contains('taken')
      userSquares[random].classList.add(hit ? 'boom' : 'miss')
      if (hit) console.log('boom');
      if (!hit) console.log('missed');
      if (userSquares[random].classList.contains('destroyer')) cpuDestroyerCount++, console.log('destroy all humans')
      if (userSquares[random].classList.contains('submarine')) cpuSubmarineCount++, console.log('destroy all humans')
      if (userSquares[random].classList.contains('cruiser')) cpuCruiserCount++, console.log('destroy all humans')
      if (userSquares[random].classList.contains('battleship')) cpuBattleshipCount++, console.log('destroy all humans')
      if (userSquares[random].classList.contains('carrier')) cpuCarrierCount++, console.log('destroy all humans')
      checkForWins()
    } else computerGo()
    currentPlayer = 'user'
    turnDisplay.innerHTML = localStorage.getItem("username");
  }

  function checkForWins() {
    if (destroyerCount === 2) {
      let infoUserDestroyer = document.createElement('div');
      infoUserDestroyer.innerHTML = "You sunk the computer's destroyer";
      history.appendChild(infoUserDestroyer);
      destroyerCount = 10
    }
    if (submarineCount === 3) {
      let infoUserSubmarine = document.createElement('div');
      infoUserSubmarine.innerHTML = "You sunk the computer's submarine"
      history.appendChild(infoUserSubmarine);
      submarineCount = 10
    }
    if (carrierCount === 5) {
      let infoUserCarrier = document.createElement('div');
      infoUserCarrier.innerHTML = "You sunk the computer's carrier"
      history.appendChild(infoUserCarrier);
      carrierCount = 10
    }
    if (cpuDestroyerCount === 2) {
      //infoDisplay.innerHTML = 'The Computer sunk your Destroyer'
      cpuDestroyerCount = 10
    }
    if (cpuSubmarineCount === 3) {
      //infoDisplay.innerHTML = 'The Computer sunk your Submarine'
      cpuSubmarineCount = 10
    }
    if (cpuCarrierCount === 5) {
      //infoDisplay.innerHTML = 'The Computer sunk your Carrier'
      cpuCarrierCount = 10
    }
    if ((destroyerCount + submarineCount + carrierCount) === 30) {
      infoDisplay.innerHTML = "YOU WIN" + ' ' + localStorage.getItem("username");
      gameOver()
    }
    if ((cpuDestroyerCount + cpuSubmarineCount + cpuCarrierCount) === 30) {
      infoDisplay.innerHTML = "COMPUTER WINS"
      gameOver()
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