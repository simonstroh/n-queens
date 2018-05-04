/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

window.findNRooksSolution = function(n) {
  var matrix = makeEmptyMatrix(n);
  for (; n - 1 >= 0; n--) {
    matrix[n - 1][n - 1] = 1;
  }
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorialize(n);

  function factorialize(n) {
    if (n < 0) { return -1; } else if (n === 0) { return 1; } else { return (n * factorialize(n - 1)); }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var theMatrix = new Board({ n: n });
  var qY = 0;
  var qX = 0;
  var currentPieces = [];
  var conflictToggler = function() {
    console.log("This is the two values for the coordinates of the first chess piece where we begin the function:", qY, qX);

    theMatrix.togglePiece(qY, qX);
    currentPieces.push([qY, qX]);
    console.log('this is n:', n);
    for (var y = 0; y < n; y++) {
      console.log('in outer for loop')
      console.log('x', x);
      console.log('y', y);
      for (var x = 0; x < n; x++) {
        console.log('in inner for loop')
        console.log('x', x);
        console.log('y', y);
        var canAddPiece = currentPieces.reduce((accum, piece) => {
          return (!(piece[0] - y === piece[1] - x || (piece[0] - y) * -1 === piece[1] - x || piece[0] === y || piece[1] === x)) ? accum : false;
        }, true);
        if (canAddPiece) {
          console.log("This is the two values for the coordinates of the chess piece where we place the chess piece:", y, x);
          theMatrix.togglePiece(y, x);
          currentPieces.push([y, x])
        }
      }
    }
    console.log("Current pieces are", currentPieces);
    if (currentPieces.length === n) {
      console.log('currentPieces.length === n');
      return theMatrix.rows();
    } else if (currentPieces.length < n) {
      console.log('currentPieces.length < n')
      console.log('currentPieces', currentPieces)
      currentPieces = [];
      theMatrix = new Board({ n: n });
      if (qY < n - 1) {
        qY++;
      } else if (qY === n - 1 && qX < n - 1) {
        qY = 0;
        qX++;
      }
      console.log('about to run conflict togger')
      conflictToggler();
    }
  }
  // debugger;
  conflictToggler();
  console.log("final pieces are ", currentPieces);
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};