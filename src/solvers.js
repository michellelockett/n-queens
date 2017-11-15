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

// function N(Q,u,ee,n,s,H,R){
//  s=0;
//  Q=u?Q:(1<<Q)-1;
//  H=~(u|ee|n)&Q;
//  while(H)H^=R=-H&H,
//  s+=N(Q,(u|R)<<1,ee|R,(n|R)>>1);
//  return s+=ee==Q;
// }//

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }
  return solution.rows();
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
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var result;
  if (n === 0 || n === 2 || n === 3) {
    return solution.rows();
  }
  if (n === 1) {
    solution.togglePiece(0, 0);
    return solution.rows();
  }
  var pattern1 = function (i, n) {
    solution.togglePiece(i, 2 * i + 1);
    solution.togglePiece((n / 2) + i, (2 * i));
  };
  var pattern2 = function (i, n) {
    //make a variable to calculate the second part of toggle piece
    //if the second part is a negative value, translate it to its proper positive version
    //so toggle piece can work properly
    solution.togglePiece(i, (2 * (i+1) + (n/2) - 3 % n));
    solution.togglePiece(n - (i+1), n - 1 - (2 * (i+1) + (n/2) - 3 % n));
  };

  var odd = false;

  for (var i = 0; i < Math.floor((n / 2)); i++) {

    if (n % 2 === 0 && n % 6 !== 2) {
      pattern1(i, n);
    } else if (n % 2 === 0 && n % 6 !== 0) {
      pattern2(i, n);
    } else if (n % 2 === 1 && ((n-1) % 2 === 0 && ((n-1) % 6 !== 2))) {
      odd = true;
      pattern1(i, n - 1);

    } else if (n % 2 === 1 && ((n-1) % 2 === 0 && (n-1) % 6 !== 0)) {
      odd = true;
      pattern2(i, n - 1);
    }
  }

  if (odd) {
      solution.togglePiece(n-1, n-1);
    }

  return solution.rows();


  // var found = false;
  // var result = [];

  // if (n === 2 || n === 3) {
  //   return solution.rows();
  // }

  // var copyBoard = function() {
  //   var rows = solution.rows();
  //   result = [];
  //   var row = [];
  //     for (var i = 0; i < n; i++) {
  //       for (var j = 0; j < n; j++) {
  //         row.push(rows[i][j]);
  //       }
  //       result.push(row);
  //       row = [];
  //     }
  // }

  // var placeQueen = function(row) {
  //   if (row === n) {
  //     copyBoard();
  //     return;
  //   }

  //   for (var i = 0; i < n; i++) {
  //     solution.togglePiece(row, i);
  //     if (!solution.hasAnyQueensConflicts()) {
  //       placeQueen(row + 1);
  //     }
  //     if (found) {
  //       return;
  //     }
  //     solution.togglePiece(row, i);
  //   }
  // }

  // placeQueen(0);
  // return result;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var counter = 0;
  var solution = new Board({n:n});

  var placeQueen = function(row) {
    if (row === n) {
      solutionCount ++;
      return;
    }

    for (var i = 0; i < n; i++) {
      solution.togglePiece(row, i);
      if (!solution.hasAnyQueensConflicts()) {
        placeQueen(row + 1);
      }
      solution.togglePiece(row, i);
    }
  }

  placeQueen(0);
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

