const screens = document.querySelectorAll('.screen');
const startButton = document.querySelector('.start');
const timeList = document.querySelector('.time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;

let countClick = 0;

startButton.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    const item = event.target;

    if (item.classList.contains('time-btn')) {
        time = +item.dataset.time;

        startGame();
    }

});

board.addEventListener('click', (event) => {
    const item = event.target;

    if (item.classList.contains('circle')) {
        countClick++;
        item.remove();

        getCircle();
    }
})

function startGame() {
    screens[1].classList.add('up');

    setTime(time);
    getCircle();
    setInterval(decreaseTime, 1000);
}

function decreaseTime() {
    if (time=== 0) {
        finishGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${time}`;
        }

        setTime(currentTime);
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;

}

function finishGame() {
    board.innerHTML = `<h1>Score: <span class="primary">${countClick}</span></h1>`

    const timetable = document.querySelector('#time-table');
    timetable.style.opacity = 0;
}

function getCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    let size = randomCircleSize(10, 30);

    const {width, height} = board.getBoundingClientRect();

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${randomCircleSize(0, width - size)}px`;
    circle.style.left = `${randomCircleSize(0, height - size)}px`;


    board.append(circle);
}

function randomCircleSize(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


