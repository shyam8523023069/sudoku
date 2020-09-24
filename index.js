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

