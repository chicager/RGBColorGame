const bgColor = "#232323";
const h1Label = document.querySelector("h1 span");
const btnEasy = document.querySelector("#btnEasy");
const btnHard = document.querySelector("#btnHard");

let playedSquares = 6;


let setGameMode = (firstBtn, secondBtn) => {
    if (!firstBtn.classList.contains('selected')) {
        firstBtn.classList.add("selected");
        secondBtn.classList.remove("selected");
    } else {
        if (secondBtn.classList.contains('selected')) {
            secondBtn.classList.remove("selected");
        }
    }
}

let generateColors = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)})`;
}

// let generateSquares = playedSquares =>{
//     let container = document.querySelector(".container");

//     for (let i = 0; i < playedSquares; i++) {
//         let square = document.createElement("div");
//         square.style.background = "yellow";
//         container.appendChild(square);       
//     }    
// }

let init = () => {

    let colors = [];
    let squares = document.querySelectorAll(".square");
    let pickedColor = "";

    for (let i = 0; i < squares.length; i++) {
        squares[i].style.background = bgColor;

        squares[i].removeEventListener('click', event => {
            if (event.target.style.background ===
                squares[pickedColor].style.background) {
                console.log("cool");
            } else {
                event.target.style.background = bgColor;
            }
        });
    }

    pickedColor = Math.floor(Math.random() * playedSquares);

    console.log(pickedColor);
    for (let i = 0; i < playedSquares; i++) {
        colors.push(generateColors());
        squares[i].style.background = colors[i];
        squares[i].addEventListener('click', event => {
            if (event.target.style.background ===
                squares[pickedColor].style.background) {
                console.log("cool");
            } else {
                event.target.style.background = bgColor;
            }
        });
    }

    h1Label.textContent = colors[pickedColor];
}

init();

btnEasy.addEventListener('click', () => {
    setGameMode(btnEasy, btnHard);
    playedSquares = 3;
    init();
});
btnHard.addEventListener('click', () => {
    setGameMode(btnHard, btnEasy);
    playedSquares = 6;
    init();
});