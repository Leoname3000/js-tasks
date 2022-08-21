const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

const wizard = {
    maxHealth: 0,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

let monsterCooldowns = [0, 0, 0];
let wizardCooldowns = [0, 0, 0, 0];

const readlineSync = require('readline-sync');

wizard.maxHealth = readlineSync.question('Установите здоровье мага: ');
console.log('');

while (monster.maxHealth > 0 && wizard.maxHealth > 0) {
    
    let monsterMove;
    do {
        monsterMove = Math.floor(Math.random() * 3);
    } while (monsterCooldowns[monsterMove] > 0);
    
    console.log(`${monster.name} использует ${monster.moves[monsterMove].name}`);
    console.log(`(PhysDmg: ${monster.moves[monsterMove].physicalDmg}, MagDmg: ${monster.moves[monsterMove].magicDmg}, PhysArm: ${monster.moves[monsterMove].physicArmorPercents}%, MagArm: ${monster.moves[monsterMove].magicArmorPercents}%)`);

    function wizardMoveStats(moveNumber) {
        return `Ход ${moveNumber} - ${wizard.moves[moveNumber].name} (PD: ${wizard.moves[moveNumber].physicalDmg}, MD: ${wizard.moves[moveNumber].magicDmg}, PA: ${wizard.moves[moveNumber].physicArmorPercents}%, MA: ${wizard.moves[moveNumber].magicArmorPercents}%) Cooldown: ${wizard.moves[moveNumber].cooldown} ходов`;
    }

    console.log('\nДоступные ходы: ')
    for (let moveCounter in wizard.moves) {
        if (wizardCooldowns[moveCounter] == 0)
        console.log(wizardMoveStats(moveCounter));
    }

    let wizardMove;
    wizardMove = readlineSync.question('Ваш ход: ');
    while (wizardMove < 0 || wizardMove > 3 || wizardCooldowns[wizardMove] > 0) {
        console.log('Ход недоступен!');
        wizardMove = readlineSync.question('Ваш ход: ');
    }

    monster.maxHealth -= wizard.moves[wizardMove].physicalDmg*(100-monster.moves[monsterMove].physicArmorPercents)/100 + wizard.moves[wizardMove].magicDmg*(100-monster.moves[monsterMove].magicArmorPercents)/100;
    wizard.maxHealth -= monster.moves[monsterMove].physicalDmg*(100-wizard.moves[wizardMove].physicArmorPercents)/100 + monster.moves[monsterMove].magicDmg*(100-wizard.moves[wizardMove].magicArmorPercents)/100;

    monster.maxHealth = Math.round(monster.maxHealth * 10) / 10;
    wizard.maxHealth = Math.round(wizard.maxHealth * 10) / 10;

    for (moveCounter in monsterCooldowns) {
        if (monsterCooldowns[moveCounter] > 0) {
            monsterCooldowns[moveCounter]--;
        }
    }
    for (moveCounter in wizardCooldowns) {
        if (wizardCooldowns[moveCounter] > 0) {
            wizardCooldowns[moveCounter]--;
        }
    }

    monsterCooldowns[monsterMove] += monster.moves[monsterMove].cooldown;
    wizardCooldowns[wizardMove] += wizard.moves[wizardMove].cooldown;

    if (monster.maxHealth < 0) {
        monster.maxHealth = 0;
    }
    if (wizard.maxHealth < 0) {
        wizard.maxHealth = 0;
    }

    console.log(`\n${monster.name} (HP: ${monster.maxHealth})`);
    console.log(`${wizard.name} (HP: ${wizard.maxHealth})`);
    console.log('------------=====================------------');
}

if (wizard.maxHealth < 0 && monster.maxHealth < 0) {
    console.log('Ничья!');
}
else if (monster.maxHealth > 0) {
    console.log(`Победил монстр ${monster.name}!`);
}
else {
    console.log(`Победил маг ${wizard.name}!`);
}
