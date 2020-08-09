let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

adjustHealthBars(chosenMaxLife)

const attackHandler = () => {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
    const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= monsterDamage;
    if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        lose.classList.add('block');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        win.classList.add('block');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        draw.classList.add('block');
    }

}


attackBtn.addEventListener('click', attackHandler)