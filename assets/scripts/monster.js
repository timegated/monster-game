const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 15;
const HEALTH_SELECT = [100, 150, 200, 250]
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let bonusLife = true;

adjustHealthBars(chosenMaxLife);

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal to more than your max initial health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endTurn();
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endTurn()
}

function reset() {
    currentPlayerHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame();
}

function endTurn() {
    const initialPlayerHealth = currentPlayerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (currentPlayerHealth <= 0 && bonusLife) {
        bonusLife = false;
        alert('you would be dead but you have a bonus life!')
        removeBonusLife();
        setPlayerHealth(initialPlayerHealth);
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

function createMonsterHealthDisplay(value) {
    let monsterTag = document.querySelector('.MONSTER')
    let healthDisplay = document.createElement('H5')
    healthDisplay.innerText = `Monster Health:${ value }`;
    monsterTag.insertAdjacentElement('afterend', healthDisplay)
}

function createPlayerHealthDisplay(value) {
    let playerTag = document.querySelector('.PLAYER')
    console.log(playerTag)
    let healthDisplay = document.createElement('H5')
    healthDisplay.innerText = `Player Health:${ value }`
    playerTag.insertAdjacentElement('afterend', healthDisplay)


}

function healthSelection() {

    for (let value in HEALTH_SELECT) {
        let button = document.createElement('BUTTON')
        button.setAttribute('class', 'healthButton')
        button.setAttribute('value', HEALTH_SELECT[value])
        button.innerHTML = HEALTH_SELECT[value]
        health[0].appendChild(button)
    }
    let setHealth = document.querySelector('.health')
    console.log(setHealth)
    setHealth.addEventListener('click', function (event) {
        createMonsterHealthDisplay(event.target.value)
        createPlayerHealthDisplay(event.target.value)
        resetGame(event.target.value)
    })


}
healthSelection()
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler)