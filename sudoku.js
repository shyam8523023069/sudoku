
function sudokuSolver(puzzle){
    var nonposs ={},imposs = {}, emetysp = 81;
    while (emetysp > 0){
     emetysp = 0;
    for (var vert = 0; vert < puzzle.length; vert++){
        for (var horz =0; horz < puzzle.length; horz++){
             //console.log(puzzle[vert][horz]);
            if (puzzle[vert][horz] === 0){
                nonposs = {}; 
                for (var i=0; i < 9; i++){
                    if (puzzle[vert][i] > 0){
                    nonposs[puzzle[vert][i]] = true;
                     }
                   if (puzzle[i][horz] > 0){
                    nonposs[puzzle[i][horz]] = true;
                    }
                }
                for (var vertbox = Math.floor(vert / 3) * 3; 
                 vertbox < Math.floor(vert / 3) * 3 + 3; vertbox++){
                     for (var horzbox =Math.floor(horz / 3) * 3;
                     horzbox < Math.floor(horz / 3) * 3 + 3; horzbox++){
                        if (puzzle[vertbox][horzbox]){
                            nonposs[puzzle[vertbox][horzbox]] = true;
                     }              
                   }
                }
                 //console.log(nonposs);
                 
                  imposs = Object.keys(nonposs);
                if (imposs.length === 8){
                    for (var i=1; i < 10; i++){
                        if (imposs.indexOf(i.toString())< 0){
                            //console.log(vert,horz);
                            puzzle[vert][horz] = i;

                        }
                    }
                }else{
                    emetysp++;
                } 
            }
            } 
    }
}
    return puzzle;
   
}

var puzzle =[
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
];

console.log(sudokuSolver(puzzle));
=======
const b = null 
//b for blank

const input = [
    [b, b, b, 2, 6, b, 7, b, 1],
    [6, 8, b, b, 7, b, b, 9, b],
    [1, 9, b, b, b, 4, 5, b, b],
    [8, 2, b, 1, b, b, b, 4, b],
    [b, b, 4, 6, b, 2, 9, b, b],
    [b, 5, b, b, b, 3, b, 2, 8],
    [b, b, 9, 3, b, b, b, 7, 4],
    [b, 4, b, b, 5, b, b, 3, 6],
    [7, b, 3, b, 1, 8, b, b, b]
]

function solve(board){
    if(solved(board)){
        return board
    }else{
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}

function searchForSolution(boards){
    if(boards.length < 1){
        return false
    }else{
        var first = boards.shift()
        const tryPath = solve(first)
        if(tryPath != false){
            return tryPath
        }else{
            return searchForSolution(boards)
        }
    }
}

function solved(board){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(board[i][j] == null){
                return false
            }
        }
    }
    return true
}

function nextBoards(board){
    var res = []
    const firstEmpty = findEmptySquare(board)
    if(firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for(var i=1; i<=9; i++){
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

function findEmptySquare(board){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(board[i][j] == null){
                return[i,j]
            }
        }
    }
}

function keepOnlyValid(boards){
    var res = []
    for(var i=0; i<boards.length; i++){
        if(validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
    // return boards.filter(b => validBoard(b))
}

function validBoard(board){
    return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

function rowsGood(board){
    for(var i=0; i<9; i++){
        var cur = []
        for(var j=0; j<9; j++){
            if(cur.includes(board[i][j])){
                return false
            }else if(board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true
}

function columnsGood(board){
    for(var i=0; i<9; i++){
        var cur = []
        for(var j=0; j<9; j++){
            if(cur.includes(board[j][i])){
                return false
            }else if(board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}

function boxesGood(board){
    const boxCoordinates = [
        [0,0],[0,1],[0,2],
        [1,0],[1,1],[1,2],
        [2,0],[2,1],[2,2]
    ]
    for(var y=0; y<9; y+=3){
        for(var x=0; x<9; x+=3){
            var cur = []
            for(var i=0; i<9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if(cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }else if(board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
            
        }
    }
    return true
}

console.log(solve(input))
>>>>>>> 4461ee3e4d624cbbb4c7624a6d23084299696fa1
