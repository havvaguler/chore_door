
const doorImage1 = document.querySelector('#door1');
const doorImage2 = document.querySelector('#door2');
const doorImage3 = document.querySelector('#door3');
const startButton = document.querySelector('#start');
const currentScore = document.querySelector('#currentScore')
const bestScore = document.querySelector('#bestStreak')

const host = 'https://content.codecademy.com/projects/chore-door/images/'
const botDoorPath = `${host}robot.svg`
const beachDoorPath = `${host}beach.svg`;
const spaceDoorPath = `${host}space.svg`;
const closedDoorPath = `${host}closed_door.svg`

let numClosedDoors = 3;
let openDoor1, openDoor2, openDoor3;
let currentlyPlaying = true;
let currentStreak = 0;
let bestStreak = 0;


const isNotClicked = door => door.src === closedDoorPath
const isBot = door => door.src === botDoorPath


const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors)
    switch (choreDoor) {
        case 0: {
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        }
        case 1: {
            openDoor1 = beachDoorPath;
            openDoor2 = botDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        }
        case 2: {
            openDoor1 = beachDoorPath;
            openDoor2 = spaceDoorPath;
            openDoor3 = botDoorPath;
        }
    }

}


const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        return gameOver('win')

    }
    else if (isBot(door) === true) {
        return gameOver()

    }
}

const gameOver = status => {
    if (status === 'win') {
        startButton.innerText = 'You win! Play again?'
        currentStreak++;
        currentScore.innerText = currentStreak;
        if (currentStreak > bestStreak) {
            bestStreak++;
            bestScore.innerText = bestStreak;

        }
    }
    else {
        startButton.innerText = 'Game over! Play again?'
        currentStreak = 0;
        currentScore.innerText = currentStreak
    }
    currentlyPlaying = false;
}

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    currentlyPlaying = true;
    startButton.innerText = 'Good Luck!'
    randomChoreDoorGenerator()
}

doorImage1.addEventListener('click', () => {
    if (currentlyPlaying && isNotClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
})

doorImage2.addEventListener('click', () => {
    if (currentlyPlaying && isNotClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
})

doorImage3.addEventListener('click', () => {
    if (currentlyPlaying && isNotClicked(doorImage3)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
})

startButton.addEventListener('click', () => {
    if (currentlyPlaying === false) {
        startRound();
    }
})

startRound()






