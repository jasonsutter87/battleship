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

        createGUI("playersGameBoardGuesses")
        createGUI("playersGameBoard")
    }

    let createGUI = board => {

        
        const gameBoard = $('#' + board + '');
        const gameletters = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

        for (let k = 0; k < 11; k++) {
            let row = $(`<div class="row" rowNum="${k}"></div>`);
        
          for (let j = 0; j < 11; j++) {
            let spot;
            
            if(k == 0  && j >= 1) {
                spot = $(`<div class="spot" spotNum="${j}">${j}</div>`);
            } else if(j == 0 && k > 0) {
                spot = $(`<div class="spot" spotNum="${j}">${gameletters[k].toUpperCase()}</div>`);

            }else {
                spot = $(`<div class="spot" spotNum="${j}"></div>`);
            }
            row.append(spot);
          }
        
          gameBoard.append(row);
        }

    }

    let startGame = () => {
        gameStarted = true;
        init()
        $('#startGame').css('display', 'none')
        $('#playGame').css('display', 'block')
        $('.all-pieces').css('display', 'block')
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




    //click handlers
    $(".draggable").draggable({
        grid: [50, 50],
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

        $('.ship').find('img').css('cursor', 'default')

    })
});