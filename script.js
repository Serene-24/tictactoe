let click = new Audio("./sounds/arcade click.mp3")
let gameOver = new Audio("./sounds/game over.mp3")

let turn = "X"
let isgameover = false

const changeTurn = ()=>{
    return turn==="X"?"0":"X"
}

const checkWin = ()=>{
    let boxtexts = document.getElementsByClassName("boxtext")
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    wins.forEach(e =>{
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[0]].innerText) && (boxtexts[e[0]].innerText !== '')){
            isgameover = true
            document.querySelector('.turntext').innerText = boxtexts[e[0]].innerText + " Won"
            gameOver.play()
            document.querySelector('.winnerGIF').style.width = "15vh";

            //adjust the scores

            if (boxtexts[e[0]].innerText === "X"){
                curr = Number(document.querySelector('.scoreXvalue').innerText)
                document.querySelector('.scoreXvalue').innerText = curr + 1
            }
            else{
                curr = Number(document.querySelector('.score0value').innerText)
                document.querySelector('.score0value').innerText = curr + 1
            }
        }
    })
}

//Game Logic

let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext')
    //when any box is clicked
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === '' && !isgameover){
            click.play()
            boxtext.innerText = turn;
            checkWin();
            turn = changeTurn();
            if (!isgameover){
                document.getElementsByClassName("turntext")[0].innerText = "Turn of " + turn;
            }
            
        }
    })
})


//reset
document.getElementById("resetBtn").addEventListener("click", ()=>{
    let boxtexts = document.getElementsByClassName('boxtext')
    Array.from(boxtexts).forEach(element =>{
        element.innerText = '';
        turn = "X"
        document.getElementsByClassName("turntext")[0].innerText = "Turn of " + turn;
        document.querySelector('.winnerGIF').style.width = "0vh";

        isgameover = false;
    })
})

//reset score
document.querySelector('.resetScoreBtn').addEventListener("click", ()=>{
    document.querySelector('.score0value').innerText = 0
    document.querySelector('.scoreXvalue').innerText = 0
})