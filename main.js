const bgColor = "#232323";
const h1Label = document.querySelector("h1 span");
const btnEasy = document.querySelector("#btnEasy");
const btnHard = document.querySelector("#btnHard");
const gameResult = document.querySelector("#gameResult");
const btnPlayAgain = document.querySelector("#btnPlayAgain");

const difficulty = new Map()
    .set('easy', 3)
    .set('hard', 6);

let playedSquares = difficulty.get('hard');


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

let generateSquares = playedSquares => {
    let container = document.querySelector(".container");

    for (let i = 0; i < playedSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        container.appendChild(square);
    }
}

let removeSquares = () => {
    let container = document.querySelector(".container");
    let squares = document.querySelectorAll(".square");

    if (squares.length !== 0) {
        for (let i = 0; i < squares.length; i++) {
            container.removeChild(container.childNodes[0]);
        }
    }
    
}

let setLabels = (text, color) => {

    gameResult.innerText = text;
    gameResult.style.color = color
    gameResult.style.visibility = "visible";
    btnPlayAgain.innerText = "play again";
}

let init = () => {

    removeSquares();

    generateSquares(playedSquares);

    let colors = [];
    let squares = document.querySelectorAll(".square");
    let pickedColor = 0;

    gameResult.style.visibility = "hidden";
    btnPlayAgain.innerText = "new colors";

    pickedColor = Math.floor(Math.random() * playedSquares);
    console.log(`Answer:  ${pickedColor + 1}`);

    for (let i = 0; i < squares.length; i++) {
        colors.push(generateColors());
        squares[i].style.background = colors[i];
    }

    let restSquares = squares.length;

    let checkSquare = event => {
        if (event.target.style.background ===
            squares[pickedColor].style.background) {
            squares.forEach(square => {
                square.removeEventListener('click', checkSquare);

                for (let i = 0; i < squares.length; i++) {
                    if (squares[i] === squares[pickedColor])
                        continue;
                    else
                        squares[i].style.background = bgColor;
                }
                restSquares = squares.length;
            });

            setLabels("you win!!!", "green");

        } else {

            restSquares--;

            if (restSquares === 1) {
                setLabels("you lose!!!", "red");
                squares[pickedColor].removeEventListener('click', checkSquare);
            }
            event.target.style.background = bgColor;
        }
    }

    squares.forEach(square => {
        square.addEventListener('click', checkSquare)
    });

    h1Label.textContent = colors[pickedColor];
}


init();

btnEasy.addEventListener('click', () => {
    setGameMode(btnEasy, btnHard);
    playedSquares = difficulty.get('easy');
    removeSquares();
    init();
});
btnHard.addEventListener('click', () => {
    setGameMode(btnHard, btnEasy);
    playedSquares = difficulty.get('hard');
    removeSquares();
    init();
});

btnPlayAgain.addEventListener('click', init);