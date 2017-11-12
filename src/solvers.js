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

//rook, row conflict, column conflict

//queen, row, column and diagonals both ways


//var hasQueenConflicts = function

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  var counter = 0;

  //recursion base cases
    //found a solution, return solution board, (number of rooks = n, no conflicts)
    //find a dead end, where we can't place a piece in that row return nothing?

  var placeRook = function(row) {
    //place the rook at the first available slot that won't cause conflict
    //after placing rook, if we have n rooks, we win, return the board
    if (row === n) {
      return solution.rows();
    }

    for (var i = 0; i < n; i++) {
      solution.togglePiece(row, i);
      counter ++;

      //check to see if we have a conflict
      var conflict = solution.hasAnyRooksConflicts();

      //if there is a conflict, reset to 0, continue trying to place the same piece
      //if no conflict, we move on to placing a new piece on a new row
      if (conflict) {
        //change the 1 back to a 0
        solution.togglePiece(row, i);
        counter --;
      } else {
        //if not, call placeRook on the next row, as long as row is <= n
        if (row < n) {
          return placeRook(row + 1);
        }
      }
    }
    //if there are no safe spaces available in the whole row, return -1;
    return -1
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return placeRook(0);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var counter = 0;
  var solution = new Board({n:n});

  var placeRook = function(row) {
    if (row === n) {
      solutionCount ++;
      return;
    }

    for (var i = 0; i < n; i++) {
      solution.togglePiece(row, i);
      if (!solution.hasAnyRooksConflicts()) {
        placeRook(row + 1);
      }
      solution.togglePiece(row, i);
    }
  }

  placeRook(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
