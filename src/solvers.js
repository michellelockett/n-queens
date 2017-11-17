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

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var count = 0;
  var stencil = Math.pow(2, n) - 1;

  var placeRook = function (columns) {
    if (stencil === columns) {
      count ++;
      return;
    }
    var safe = ~(columns);
    while (safe & stencil) {
      var rook = safe & -safe;
      safe -= rook;
      placeRook (columns | rook);
    }
  }
  placeRook(0);
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

var pattern1 = function (board, i, n) {
  board.togglePiece(i, 2 * i + 1);
  board.togglePiece((n / 2) + i, (2 * i));
};

var pattern2 = function (board, i, n) {
  board.togglePiece(i, ((2 * (i+1) + (n/2) - 3) % n));
  board.togglePiece(n - (i+1), (n - 1 - (2 * (i+1) + (n/2) - 3) % n));
};

window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var result;
  var odd = false;
  if (n === 0 || n === 2 || n === 3) {
    return solution.rows();
  }

  if (n === 1) {
    solution.togglePiece(0, 0);
    return solution.rows();
  }

  for (var i = 0; i < Math.floor((n / 2)); i++) {

    if (n % 2 === 0 && n % 6 !== 2) {
      pattern1(solution, i, n);
    } else if (n % 2 === 0 && n % 6 !== 0) {
      pattern2(solution, i, n);
    } else if (n % 2 === 1 && ((n-1) % 2 === 0 && ((n-1) % 6 !== 2))) {
      odd = true;
      pattern1(solution, i, n - 1);
    } else if (n % 2 === 1 && ((n-1) % 2 === 0 && (n-1) % 6 !== 0)) {
      odd = true;
      pattern2(solution, i, n - 1);
    }
  }

  if (odd) {
    solution.togglePiece(n-1, n-1);
  }

  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var count = 0;
  var stencil = Math.pow(2, n) - 1

  var placeQueen = function (lDiagonal, columns, rDiagonal) {
    if (columns === stencil) {
      count ++;
      return;
    }
    var safe = ~(lDiagonal | columns | rDiagonal);
    while (safe & stencil) {
      var queen = safe & -safe;
      safe -= queen;
      placeQueen ((lDiagonal | queen) >> 1, columns | queen, (rDiagonal | queen) << 1);
    }
  };
  placeQueen(0, 0, 0);
  return count;
};
