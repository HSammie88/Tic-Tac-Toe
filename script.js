//Class with symbol of player
class Player{
    constructor(symbol){
        this.symbol = symbol
    }
}
//Class with board elements and winning combinations
class Board{
    constructor(){
        this.winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.cells = document.querySelectorAll("div.buttons-container div")
        this.reloadButton = document.getElementById("reloadButton")
    }
}
//Class with logic for game
class Game{
    constructor(){
        this.board = new Board
        this.player = [new Player('X'), new Player('O')]
        this.playerMoves = [[], []]
        this.startGame()
        this.currentPlayer = 1
    }
    //Change player from first to second and vise versa
    changePlayer(){
        this.currentPlayer = (this.currentPlayer === 0 ? 1 : 0)
        return this.currentPlayer
    }
    //Initialises cells from board
    startGame(){
        this.board.cells.forEach((cell, index) => {
            cell.dataset.index = index
            cell.addEventListener('click', (event)=>{
                if(!this.playerMoves[0].includes(Number(cell.dataset.index)) && !this.playerMoves[1].includes(Number(cell.dataset.index))){
                    let playerNumber = this.changePlayer()
                    this.playerMoves[playerNumber].push(Number(cell.dataset.index))
                    cell.innerHTML = this.player[playerNumber].symbol
                    this.changeCSS(cell,playerNumber)
                }
            })
        })
    }
    //Removes hovering effect from cell and changes it color
    changeCSS(cell, player){
        cell.classList.remove('hover-button')
        cell.style.cursor = 'not-allowed'
        if(player === 0){
            cell.style.backgroundColor = 'red'
        }
        else{
            cell.style.backgroundColor = 'blue'
        }
    }
}
//Starts game
document.addEventListener("DOMContentLoaded", ()=>{
    new Game()
})