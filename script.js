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
        this.winText = document.getElementById("winText")
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
                    this.winCheckout()
                }
            })
        })
    }
    //Comparing winning combinations with user inputs
    winCheckout(){
        for(let i = 0; i < this.playerMoves.length; i++){
            for(const combination of this.board.winningCombinations){
                if(combination.every(index => this.playerMoves[i].includes(index))){
                    this.board.winText.innerHTML = `Победил ${i+1} игрок.`
                    this.blockAllButtons()
                    this.winHighlighter(combination, i)
                }
            }
        }
        if(this.playerMoves[0].length + this.playerMoves[1].length === 9)
            this.board.winText.innerHTML = "Ничья"
    }
    //Blocks all buttons if someone wins
    blockAllButtons(){
        this.board.cells.forEach(cell =>{
            cell.classList.remove('hover-button')
            cell.style.cursor = 'not-allowed'
        })
    }
    //Highlights winning combination
    winHighlighter(combination, playerID){
        combination.forEach(index =>{
            const cell = this.board.cells[index]
            cell.style.backgroundColor = 'yellow'
            cell.style.border = '1px orange solid'
            cell.style.boxShadow = '0 0 30px orange'
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