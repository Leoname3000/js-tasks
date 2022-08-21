const readlineSync = require('readline-sync');

let numberLength = readlineSync.question('Сколько цифр загадывать? (от 3 до 6): ');

let trueNumber = '';
let trueNumberSet = new Set();

for (let counter = numberLength; counter > 0;) {
    let digit = String(Math.floor(Math.random() * 10));
    if (trueNumberSet.has(digit) == false) {
        trueNumberSet.add(digit);
        trueNumber += `${digit}`;
        counter--;
    }
}

let tries = readlineSync.question('За сколько попыток отгадаете?: ');
let isVictory = false;

for (let counter = 0; counter < tries; counter++) {

    let fullMatchDigits = new Array();
    let matchDigits = new Array();

    let guessNumber = String(readlineSync.question(`(Попытка ${counter + 1}) Введите число: `));

    for (let pos = 0; pos < numberLength; pos++) {
        if (trueNumber[pos] == guessNumber[pos]) {
            fullMatchDigits[fullMatchDigits.length] = guessNumber[pos];
        }
        else if (trueNumberSet.has(guessNumber[pos]) == true) {
            matchDigits[matchDigits.length] = guessNumber[pos];
        }
    }

    if (fullMatchDigits.length == numberLength) {
        console.log('Вы угадали число!');
        isVictory = true;
        break;
    }
    else {
        console.log(`Совпавших цифр не на своих местах - ${matchDigits.length}: (${matchDigits}), цифр на своих местах - ${fullMatchDigits.length}: (${fullMatchDigits}).`);
    }
}

if (isVictory == false) {
    console.log('Попытки закончились!');
}