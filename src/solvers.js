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
  var solution;
  var theMatrix = new Board({ n: n });
  var qY = 0;
  var qX = 0;
  var currentPieces = [];
  var conflictToggler = function() {
    theMatrix.togglePiece(qY, qX);
    currentPieces.push([qY, qX]);
    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++) {
        var canAddPiece = currentPieces.reduce((accum, piece) => {
          return (!(piece[0] - y === piece[1] - x || (piece[0] - y) * -1 === piece[1] - x || piece[0] === y || piece[1] === x)) ? accum : false;
        }, true);
        if (canAddPiece) {
          theMatrix.togglePiece(y, x);
          currentPieces.push([y, x]);
        }
      }
    }
    if (currentPieces.length === n) {
      console.log('final thing', currentPieces);
      solution = theMatrix;
      return;
    } else if (currentPieces.length < n) {
      currentPieces = [];
      theMatrix = new Board({ n: n });
      if (qY < n - 1) {
        qY++;
      } else if (qY === n - 1) {
        qY = 0;
        qX++;
      }
      conflictToggler();
    }
  }
  conflictToggler();
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  console.log('solutions', solution.rows());
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  var solution
  var count = 0;
  var theMatrix = new Board({ n: n });
  var qY = 0;
  var qX = 0;
  var currentPieces = [];
  var conflictToggler = function() {
    theMatrix.togglePiece(qY, qX);
    currentPieces.push([qY, qX]);
    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++) {
        var canAddPiece = currentPieces.reduce((accum, piece) => {
          return (!(piece[0] - y === piece[1] - x || (piece[0] - y) * -1 === piece[1] - x || piece[0] === y || piece[1] === x)) ? accum : false;
        }, true);
        if (canAddPiece) {
          theMatrix.togglePiece(y, x);
          currentPieces.push([y, x]);
        }
      }
    }

    if (qX === n) {
      console.log('count', count);
      solution = count;
      return;
    }

    if (currentPieces.length === n) {
      count++;
      currentPieces = [];
      theMatrix = new Board({ n: n });
      if (qY < n - 1) {
        qY++;
      } else if (qY === n - 1) {
        qY = 0;
        qX++;
      }
      conflictToggler();
    } else if (currentPieces.length < n) {
      currentPieces = [];
      theMatrix = new Board({ n: n });
      if (qY < n - 1) {
        qY++;
      } else if (qY === n - 1) {
        qY = 0;
        qX++;
      }
      conflictToggler();
    }
  }
  conflictToggler();
  console.log('QUEENCOUNT solution', solution)
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};

// console.log(window.countNQueensSolutions(0));
// console.log(window.countNQueensSolutions(1));
// console.log(window.countNQueensSolutions(4));
// console.log(window.countNQueensSolutions(8));
// console.log(window.countNQueensSolutions(6));
// console.log(window.countNQueensSolutions(7));
// console.log(window.countNQueensSolutions(8));
window.findNQueensSolution(8);