const boxs = document.querySelectorAll(".box");
const btn = document.querySelector(".resetBtn");
const statusGame = document.querySelector(".statusGame");

const winMasiv = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let displayNow = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let activeGame = false;

startGame();

// вход в игру 
function startGame(){
    console.log('start Game');
    boxs.forEach(box => box.addEventListener("click",boxClicked))
    statusGame.textContent = `${currentPlayer}'s turn`;
    btn.addEventListener('click',resetGame);
    activeGame = true;
}

// нажатие на ячейку и изменение
function boxClicked(){
    const boxIndex = this.getAttribute('identificator');

    if(displayNow[boxIndex] != "" || !activeGame){
        return;
    }

    updateBox(this,boxIndex);
    checkWinner();
}

// обновление ячейки
function updateBox(box, index){
    console.log("box изменился");
    displayNow[index] = currentPlayer;
    box.textContent = currentPlayer;
}

// обновление игрока
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusGame.textContent = `${currentPlayer}'s turn`;
}

// проверка победителя  
function checkWinner(){
    let checkWin = false;

    for (let i = 0; i < winMasiv.length; i++) {
        const condition = winMasiv[i];
        const rowA = displayNow[condition[0]];
        const rowB = displayNow[condition[1]];
        const rowC = displayNow[condition[2]];
        
        if(rowA == "" || rowB == "" || rowC == ""){
            continue;
        }
        if(rowA == rowB && rowB == rowC){
            checkWin = true;
            break;
        }
    }

    if(checkWin){
        statusGame.textContent = `${currentPlayer} wins!`;
        activeGame = false;
    }
    else if(!displayNow.includes("")){
        statusGame.textContent = `Draw!`;
        activeGame = false;
    }
    else{
        changePlayer();
    }
}


// обновление игры
function resetGame(){
    currentPlayer = "X";
    displayNow = ["", "", "", "", "", "", "", "", ""];
    statusGame.textContent = `${currentPlayer}'s turn`;
    boxs.forEach(box => box.textContent = "");
    activeGame = true;
}
