// Inputs
const gameInputs = document.querySelectorAll('.inputs li');
const resetBtn = document.querySelector('.reset');
const autoplayBtn = document.querySelector('.autoplay');

// Visual Feedback
const userMove = document.querySelector('.userMove');
const computerMove = document.querySelector('.computerMove');
const message = document.querySelector('.message');
const logsOutput = document.querySelector('.logs');
const scoreBoard = {
    'w': document.querySelector('.wins'),
    'l': document.querySelector('.lost'),
    'd': document.querySelector('.draw')
};

function renderMove(param1, param2) {
    userMove.textContent = param1;
    computerMove.textContent = param2;

    const restartClassAnimation = (el, cls) => {
        el.classList.remove(cls);
        void el.offsetWidth;   // reflow
        el.classList.add(cls);
    };

    restartClassAnimation(userMove, 'animateInFromLeft');
    restartClassAnimation(computerMove, 'animateInFromRight');
};

function renderScore() {
    const maxScore = Math.max(score.w, score.l, score.d);
    const width = Math.max(2, String(maxScore).length);
    scoreBoard.w.textContent = String(score.w).padStart(width, '0');
    scoreBoard.l.textContent = String(score.l).padStart(width, '0');
    scoreBoard.d.textContent = String(score.d).padStart(width, '0');
};

const renderMessage = (move1, move2, result) => `<p>Your Move ${move1}, Computer Move ${move2}. ${result}</p>`;

let logs = localStorage.getItem('logs');

if (logs) {
    try {
        logs = JSON.parse(logs);
    } catch {
        logs = logs.split(',');
    }
} else {
    logs = ['Start Playing'];
}

function renderLogsOutput(param) {
    if (logs.length >= 8) logs.shift();
    logs.push(param);
    localStorage.setItem('logs', JSON.stringify(logs));
    logsOutput.innerHTML = logs
        .map(item => `<li>${item}</li>`)
        .join('');
}

document.addEventListener('DOMContentLoaded', () => {
    if (!logsOutput) return;
    logsOutput.innerHTML = logs
        .map(item => `<li>${item}</li>`)
        .join('');
});

let dots = '';
const blinker = () => {
    if (dots.length < 3) {
        dots += '.';
    } else {
        dots = '.';
    }
    return dots;
}

// Audibal feedback
// Ai generated code for audio feedback
const sounds = {
    rock: new Audio('sounds/rock.mp3'),
    paper: new Audio('sounds/paper.mp3'),
    scissor: new Audio('sounds/scissor.mp3'),
    reset: new Audio('sounds/reset.mp3'),
    autplayStart: new Audio('sounds/autoplay_start.mp3'),
    autplayStop: new Audio('sounds/autoplay_stop.mp3')
};

// Functional
const score = JSON.parse(localStorage.getItem('score')) || {
    'w': 0,
    'l': 0,
    'd': 0
};

const legalMove = {
    'rock': '✊',
    'paper': '🤚',
    'scissor': '✌️'
}

const legalMoveKeys = Object.keys(legalMove);

const randomIndex = () => {
    return Math.floor(Math.random() * legalMoveKeys.length)
};

// Capture user input
gameInputs.forEach((value, index) => {
    value.addEventListener('click', () => {
        playGame(index);
        if (index == 0) {
            sounds.rock.play();
        } else if (index == 1) {
            sounds.paper.play();
        } else if (index == 2) {
            sounds.scissor.play();
        }
    });
});

function playGame(userIndex) {
    const compIndex = randomIndex();
    const total = legalMoveKeys.length;
    const winIndex = (userIndex - 1 + total) % total;
    const loseIndex = (userIndex + 1) % total;
    const uiOutputUserMove = legalMove[legalMoveKeys[userIndex]];
    const uiOutputComputerMove = legalMove[legalMoveKeys[compIndex]];

    if (compIndex === userIndex) {
        score.d++;
        message.innerHTML = renderMessage(uiOutputUserMove, uiOutputComputerMove, 'It\'s a draw.');
        renderLogsOutput('Draw');
    } else if (compIndex === loseIndex) {
        score.l++;
        message.innerHTML = renderMessage(uiOutputUserMove, uiOutputComputerMove, 'You lost.');
        renderLogsOutput('Loss');
    } else if (compIndex === winIndex) {
        score.w++;
        message.innerHTML = renderMessage(uiOutputUserMove, uiOutputComputerMove, 'You won.');
        renderLogsOutput('Victory');
    }

    localStorage.setItem('score', JSON.stringify(score));
    renderMove(uiOutputUserMove, uiOutputComputerMove);
    renderScore();
}

resetBtn.addEventListener('click', resetScore);

function resetScore() {
    sounds.reset.play();
    Object.keys(score).forEach(k => score[k] = 0);
    if (isAutoplayRunning) {
        clearInterval(intervalId);
        isAutoplayRunning = false;
        autoplayBtn.textContent = 'Autoplay';
        autoplayBtn.classList.remove('running');
        renderLogsOutput('Autoplay Stopped!');
    }
    localStorage.removeItem('score');
    message.innerHTML = '<p>The score was reset!</p>';
    renderMove('🧑', '🤖');
    renderScore();
    renderLogsOutput('Score was reset');
    setTimeout(() => {
        message.innerHTML = '<p>Make a move!</p>';
    }, 2000);
}


// render score on dom load if exists on localStorage
renderScore();

let isAutoplayRunning = false;
let intervalId;

function autoPlayGame() {
    if (!isAutoplayRunning) {
        isAutoplayRunning = true;
        sounds.autplayStart.play();
        autoplayBtn.textContent = 'Running';
        autoplayBtn.classList.add('running');
        renderLogsOutput('Autoplay Started!');
        intervalId = setInterval(() => {
            const userIndex = randomIndex();
            autoplayBtn.textContent = 'Running' + blinker();
            playGame(userIndex);
        }, 2000)
    } else {
        clearInterval(intervalId);
        sounds.autplayStop.play();
        isAutoplayRunning = false;
        autoplayBtn.textContent = 'Autoplay';
        autoplayBtn.classList.remove('running');
        renderLogsOutput('Autoplay Stopped!');
    };
}

autoplayBtn.addEventListener('click', () => autoPlayGame());

// Enable shortcut key
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (e.altKey && key === 'r') {
        resetScore();
        return;
    }
    if (isAutoplayRunning && key !== 'a') {
        return;
    }
    switch (key) {
        case 'r':
            playGame(0);
            sounds.rock.play();
            break;
        case 'p':
            playGame(1);
            sounds.paper.play();
            break;
        case 's':
            playGame(2);
            sounds.scissor.play();
            break;
        case 'a':
            autoPlayGame();
            break;
    }
});
