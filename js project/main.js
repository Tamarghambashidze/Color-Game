let btnHard = document.getElementById('hard');
let btnEasy = document.getElementById('easy');
let divHard = document.getElementById('container1');
let divEasy = document.getElementById('container2');
let boxHard = document.querySelectorAll('.box-hard');
let boxEasy = document.querySelectorAll('.box-easy');
let rgb = document.querySelector('span');
let right = document.getElementById('right');
let wrong = document.getElementById('wrong');
let wrongBtn = document.getElementById('wrong-btn');
let rightBtn = document.getElementById('right-btn');

let isEasyMode = false;
let correctColor = "";

function switchMode(activeBtn, activeContainer, inactiveBtn, inactiveContainer, easyMode) {
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
    activeContainer.classList.remove('hide');
    inactiveContainer.classList.add('hide');
    rgb.classList.remove('hide');
    isEasyMode = easyMode;

    if (easyMode) {
        setEasyMode();
    } else {
        resetGame(boxHard, 5);
    }
}

function getRandomColor() {
    let randomNum = () => Math.floor(Math.random() * 256);
    return `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
}

btnHard.onclick = () => {
    switchMode(btnHard, divHard, btnEasy, divEasy, false);
};

btnEasy.onclick = () => {
    switchMode(btnEasy, divEasy, btnHard, divHard, true);
};

function setEasyMode() {
    boxEasy.forEach(box => {
        box.classList.remove('hide');
        box.style.backgroundColor = getRandomColor();
    });

    setTargetColor(boxEasy);
}

function setTargetColor(boxes) {
    let randomIndex = Math.floor(Math.random() * boxes.length);
    correctColor = boxes[randomIndex].style.backgroundColor;
    rgb.textContent = correctColor;
    attachClickHandlers(boxes);
}

function attachClickHandlers(boxes) {
    boxes.forEach(box => {
        box.onclick = () => {
            if (box.style.backgroundColor.trim() === correctColor.trim()) {
                right.classList.add('popafter');

                if (isEasyMode) {
                    boxEasy.forEach(box => box.classList.remove('hide'));
                    setEasyMode(); 
                } else {
                    resetGame(boxHard, 5);
                }
            } else {
                wrong.classList.add('popafter');

                if (isEasyMode) {
                    box.classList.add('hide');
                } else {
                    resetGame(boxHard, 5);
                }
            }
        };
    });
}

function resetGame(boxes, maxIndex) {
    boxes.forEach(box => {
        box.style.backgroundColor = getRandomColor();
        box.classList.remove('hide');
    });

    setTargetColor(boxes);
}

rightBtn.onclick = () => {
    right.classList.remove('popafter');

    if (isEasyMode) {
        boxEasy.forEach(box => box.classList.remove('hide'));
        setEasyMode(); 
    } else {
        resetGame(boxHard, 5);
    }
};

wrongBtn.onclick = () => {
    wrong.classList.remove('popafter');
    
    if (!isEasyMode) {
        resetGame(boxHard, 5);
    }
};


