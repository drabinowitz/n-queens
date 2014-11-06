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

//we write some function that takes an array of twoples it creates a board of size equal to the 
//length of the array, and then places a piece at row column indexes described be each of the twoples, and returns a board, not knowing if it's correct

/* for example [0,2,2]

[[1,0,0],
 [0,0,1],
 [0,0,1]]

*/
//takes in an array of the column index of each piece, each value represents its own row
window.makeBoard = function(arr){
  var board;
  if (arr.length > 0){  
    board = [];
    var row = _.map(arr, function(){
      return 0;
    });
    _.each(arr, function(val){
      row[val] = 1;
      board.push(row.slice());
      row[val] = 0;
    });
  } else {
    board = {'n':0};
  }
  return new Board(board);

};

window.recursivelyGenerateBoards = function(n,exclusions,exitOnFirstSolution){
  var solution;
  counter = 0;
  var indexes = _.range(n);
  var even = n % 2 === 0;
  var firstHalf = even ? _.range(n/2) : _.range((n+1)/2); 
  var boardSoFar = [];

  var buildBoard = function(rowsLeft){
    //recurse to find all
    //possible outcomes (combinations)
    if(rowsLeft===0){
      // var board = window.makeBoard(boardSoFar);
      // if (!board[test]()){
        if (!even && boardSoFar[0] === firstHalf.length - 1){
          counter++;
        } else {
          counter+=2;
        }
      if (exitOnFirstSolution){
        solution = boardSoFar.slice();
      }
      // }
    } else if (!exitOnFirstSolution || !solution){
      if (boardSoFar.length === 0){
        for (var i = 0; i < firstHalf.length; i++){
          boardSoFar.push(firstHalf[i]);
          buildBoard(rowsLeft-1, boardSoFar );
          boardSoFar.pop();
        }
      } else {
        for (var i = 0; i < indexes.length; i++){
          if (exclusions(indexes[i],boardSoFar)){
            boardSoFar.push(indexes[i]);
            buildBoard(rowsLeft-1, boardSoFar );
            boardSoFar.pop();
          }
        }
      }

    }
  }

  buildBoard(n);

  if (exitOnFirstSolution){
    if (!solution){
      solution = new Board({'n':n}).rows();
    } else {
      solution = window.makeBoard(solution).rows();
    }
    return solution;      
  } else {
    if (n === 0){
      counter--;
    }
    return counter;
  }
};

window.rookException = function(val,boardSoFar){

  return _.every(boardSoFar,function(prevVal){

    return val !== prevVal;

  });

};

//in find NRooksSolution we keep calling 
window.findNRooksSolution = function(n) {

  var solution = window.recursivelyGenerateBoards(n,window.rookException,true);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = window.recursivelyGenerateBoards(n,window.rookException,false);
  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

//[0,1,2]
//tests diagonals and column and row colis

window.queenException = function(val,boardSoFar){
  return _.every(boardSoFar,function(prevVal,row){

    return val !== prevVal && val + boardSoFar.length !== prevVal + row && val - boardSoFar.length !== prevVal - row;

  });

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = window.recursivelyGenerateBoards(n,window.queenException,true);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = window.recursivelyGenerateBoards(n,window.queenException,false);
  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};
