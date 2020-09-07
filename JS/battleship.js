console.log('script started');

// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;

// get the container element
var gameBoardContainer = document.getElementById("gameboard1");

// make the grid columns and rows
for (y = 0; y < cols; y++) {
	for (x = 0; x < rows; x++) {
		
		// create a new div HTML element for each grid square and make it the right size
		var square = document.createElement("div");
		gameBoardContainer.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
		square.id = 's' + x + y;			
		
		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = x * squareSize;
		var leftPosition = y * squareSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';						
	}
}

// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;

// get the container element
var gameBoardContainer2 = document.getElementById("gameboard2");

// make the grid columns and rows
for (y = 0; y < cols; y++) {
	for (x = 0; x < rows; x++) {
		
		// create a new div HTML element for each grid square and make it the right size
		var square = document.createElement("div");
		gameBoardContainer2.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
		square.id = 'c' + x + y;			
		
		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = x * squareSize;
		var leftPosition = y * squareSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';						
	}
}
