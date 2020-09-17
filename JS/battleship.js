// ==========================================
// BOARD
// ==========================================

// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 40;
// let square;

// get the container element
var gameBoardContainer = document.getElementById("gameboard1");

let counter = 0;
// make the grid columns and rows
for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		
		// create a new div HTML element for each grid square and make it the right size
		var square = document.createElement("div");
		square.classList.add('dropper');
		gameBoardContainer.appendChild(square);

    	// give each div element a unique id based on the counter
		square.id = counter++;			
		
		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = i * squareSize;
		var leftPosition = j * squareSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';						
	}
}

// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 40;

// get the container element
var gameBoardContainer2 = document.getElementById("gameboard2");

let counter1 = 100;
// make the grid columns and rows
for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		
		// create a new div HTML element for each grid square and make it the right size
		var square = document.createElement("div");
		gameBoardContainer2.appendChild(square);

    // give each div element a unique id based on the counter1
		square.id = counter1++;			
		
		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = i * squareSize;
		var leftPosition = j * squareSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';						
	}
}


// ================================
// INTERACTIVE gameBoardContainer
// ================================



// gameBoardContainer2.addEventListener('mouseOver', (event) => {
	

// });

gameBoardContainer2.addEventListener('click',(event) => {
    console.log(event.target);
	let x = event.target;
	x.classList.add('bateau');
	// console.log(x.id);
	document.getElementById(x.id*1+1).classList.add('bateau');
	document.getElementById(x.id*1+2).classList.add('bateau');
    document.getElementById(x.id*1+3).classList.add('bateau');
    document.getElementById(x.id*1+4).classList.add('bateau');
	console.log(document.getElementById(x.id*1+4));
	// console.log(x.id*1+1);
});


// gameBoardContainer2.addEventListener('click', (event) => {
// 	console.log(event.target);
// 	let x = event.target;
// 	x.classList.add('hover');
// });

// =======================================
// //Ships
// =======================================
// const shipArray = [
// 	{
// 	  name: 'destroyer',
// 	  directions: [
// 		[0, 1],
// 		[0, width]
// 	  ]
// 	},
// 	{
// 	  name: 'submarine',
// 	  directions: [
// 		[0, 1, 2],
// 		[0, width, width2]
// 	  ]
// 	},
// 	{
// 	  name: 'cruiser',
// 	  directions: [
// 		[0, 1, 2],
// 		[0, width, width2]
// 	  ]
// 	},
// 	{
// 	  name: 'battleship',
// 	  directions: [
// 		[0, 1, 2, 3],
// 		[0, width, width2, width3]
// 	  ]
// 	},
// 	{
// 	  name: 'carrier',
// 	  directions: [
// 		[0, 1, 2, 3, 4],
// 		[0, width, width2, width3, width*4]
// 	  ]
// 	},
//   ]

// =========================================================
// DRAG & DROP
// =========================================================

  (function() {

    var dndHandler = {

        draggedElement: null, // Propriété pointant vers l'élément en cours de déplacement

        applyDragEvents: function(element) {

            element.draggable = true;

            var dndHandler = this; // Cette variable est nécessaire pour que l'événement « dragstart » ci-dessous accède facilement au namespace « dndHandler »

            element.addEventListener('dragstart', function(e) {
                dndHandler.draggedElement = e.target; // On sauvegarde l'élément en cours de déplacement
                e.dataTransfer.setData('text/plain', ''); // Nécessaire pour Firefox
            });

        },

        applyDropEvents: function(dropper) {

            dropper.addEventListener('dragover', function(e) {
                e.preventDefault(); // On autorise le drop d'éléments
                this.className = 'dropper drop_hover'; // Et on applique le style adéquat à notre zone de drop quand un élément la survole
            });

            dropper.addEventListener('dragleave', function() {
                this.className = 'dropper'; // On revient au style de base lorsque l'élément quitte la zone de drop
            });

            var dndHandler = this; // Cette variable est nécessaire pour que l'événement « drop » ci-dessous accède facilement au namespace « dndHandler »

            dropper.addEventListener('drop', function(e) {

                var target = e.target,
                    draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
                    clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément

                while (target.className.indexOf('dropper') == -1) { // Cette boucle permet de remonter jusqu'à la zone de drop parente
                    target = target.parentNode;
                }

                target.className = 'dropper'; // Application du style par défaut

                clonedElement = target.appendChild(clonedElement); // Ajout de l'élément cloné à la zone de drop actuelle
                dndHandler.applyDragEvents(clonedElement); // Nouvelle application des événements qui ont été perdus lors du cloneNode()

                draggedElement.parentNode.removeChild(draggedElement); // Suppression de l'élément d'origine

            });

        }

    };

    var elements = document.querySelectorAll('.draggable'),
        elementsLen = elements.length;

    for (var i = 0; i < elementsLen; i++) {
        dndHandler.applyDragEvents(elements[i]); // Application des paramètres nécessaires aux éléments déplaçables
    }

    var droppers = document.querySelectorAll('.dropper'),
        droppersLen = droppers.length;

    for (var i = 0; i < droppersLen; i++) {
        dndHandler.applyDropEvents(droppers[i]); // Application des événements nécessaires aux zones de drop
    }

})();
  
