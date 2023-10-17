$(document).ready(function() {
    console.log('loading the script')
    let gameStarted;
    let currentPlayer;
    let playersBoard;
    let playersGuesses;
    let opponentGuesses;
    let opponentBoard;
    let winner;
    let playersScore;
    let opponentScore;
    let isPlayerDonePlacing;
    let isOpponentDonePlacing;


//    open = O
//    hit = x
//    aircraft carrier = a
//    battleship = b
//    destroyer = d
//    cruiser = c
//    sub = s




    let init = () => {
        console.log('init')
        currentPlayer = "you"
        playersScore = 0;
        opponentScore = 0;
        playersBoard = createBoard(playersBoard)
        playersGuesses = createBoard(playersGuesses)
        opponentGuesses = createBoard(opponentGuesses)
        opponentBoard  = createBoard(opponentBoard)

        createGUI()
    }

    let createGUI = () => {
        console.log('TODO: Create GUI: grid with 11 columns 11 rows')
        console.log('TODO: Create GUI: headers first col/row with A-J or 1-10')
    }
 
    let startGame = () => {
        gameStarted = true;
        gameloop()
    }

    let createBoard = boardType => {
        boardType = new Array()
        for(var k = 0; k < 10; k++) {
            let row = new Array()
            
            for(var j = 0; j < 10; j++) {
                let spot = new Array('O')
                row.push(spot)
            }
            boardType.push(row)
        }

        return boardType
    }     

    let gameloop = () => {
        if(gameStarted){
            console.log('game has started')

            if(isPlayerDonePlacing && isOpponentDonePlacing) {
                checkForWinner()
            } else {
                nextToPlacePiece()
                

            }
        }   
    }

    let nextToPlacePiece = () => {
        if(currentPlayer == "you") {
            //todo: 
        } else {
            //todo: 
        }
    }

    let reduceBoard = board => {
        if (!Array.isArray(board)) {
            return '';
          }

          return board.reduce((acc, current) => {
            if (Array.isArray(current)) {
              return acc + reduceBoard(current);
            }

            return acc + current;
          }, "");
    }

    let countOccurrences = (str, char) => {
        const regex = new RegExp(char, 'g');
        const matches = str.match(regex);
        return matches ? matches.length : 0;
    }
    
    let checkForWinner = () => {
        let resultPlayer = reduceBoard(playersBoard)
        let resultOpponent = reduceBoard(opponentBoard)

        let countPlayer = countOccurrences(resultPlayer, "X");
        let countOpponent = countOccurrences(resultOpponent, "X");

        if(countPlayer == 18 || countOpponent == 18) {
            gameWon()
        }
    }

    let gameWon = () => {
        winner = currentPlayer
        alert(`The game has been won by: ${winner}`)
    }


    //runner
    init()

    //click handlers
    $(".draggable").draggable({
        stop: function(event, ui) {
            // 'ui.position' contains the final position of the element
            var left = ui.position.left;
            var top = ui.position.top;

            // Log the final position
            console.log("Left: " + left + ", Top: " + top);
        }
    });

    $('.rotatable').on('dblclick', e => {
        console.log($(e.target))
        if($(e.target).attr('rotated') == "false" ) {
            $(e.target).css('transform', 'rotate(90deg)')
            $(e.target).attr('rotated', 'true')
        } else {
            $(e.target).css('transform', 'rotate(0deg)')
            $(e.target).attr('rotated', 'false')
        }
    })

    $('#startGame').on('click', () => {
        startGame();
    })

    $('#playGame').on('click', () => {
       // Remove the draggable functionality and unbind its event handlers
        $('.ship').draggable('destroy');

        // Remove the rotatable functionality and unbind its event handlers
        $('.ship').off('dblclick');


    })
});