class Character {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;
    constructor(name) {
        this.name = name;
    }
    get life() {
        return this._life
    }
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name); //acessa o constructor do extends, no caso, o Character
        this.life = 100;
        this.maxLife = this.life;
        this.attack = 10;
        this.defense = 8;
        this.img = 'magoAttack'
    }
}
class Sorcerer extends Character {
    constructor(name) {
        super(name); //acessa o constructor do extends, no caso, o Character
        this.life = 80;
        this.maxLife = this.life;
        this.attack = 15;
        this.defense = 3;
        this.img = 'magoAttack'
    }
}
class LittleMonster extends Character {
    constructor() {
        super('Little Monster'); //acessa o constructor do extends, no caso, o Character
        this.life = 40;
        this.maxLife = this.life;
        this.attack = 4;
        this.defense = 4;
        this.img = 'littleMonster'
    }
}
class BigMonster extends Character {
    constructor() {
        super('Big Monster'); //acessa o constructor do extends, no caso, o Character
        this.life = 120;
        this.maxLife = this.life;
        this.attack = 16;
        this.defense = 6;
        this.img = 'BigMonster'
    }
}
class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, img, logObj){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.img = img;
        this.log = logObj;
    }
    start() {
        this.update();
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1,this.fighter2))
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2,this.fighter1))
    }
    updateScrollLog() { // MANTER O SCROLL SEMPRE PRA BAIXO
        document.querySelector('.log').scrollTop = document.querySelector('.log').scrollHeight;
    }
    update() {
        this.updateScrollLog();
        // Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} -- ${this.fighter1.life.toFixed(1)} HP`
        let f1Porcentagem = (this.fighter1.life / this.fighter1.maxLife) * 100; //pegando a porcentagem de life
        this.fighter1El.querySelector('.bar').style.width = `${f1Porcentagem}%` // Alterando o width da barra de life
        // Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} -- ${this.fighter2.life.toFixed(1)} HP`
        let f2Porcentagem = (this.fighter2.life / this.fighter2.maxLife) * 100; //pegando a porcentagem de life
        this.fighter2El.querySelector('.bar').style.width = `${f2Porcentagem}%` // Alterando o width da barra de life
    }

    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
           this.log.addMessage(`Atacando cachorro morto.`)
           this.updateScrollLog();
            return;
        }




        if(attacking.name === 'Big Monster' || attacking.name === 'Little Monster') {
            document.querySelector('.imgRight').innerHTML = `<img src="assets/images/${attacking.img}.gif">`;

            setTimeout( function() {
                document.querySelector('.imgRight').innerHTML ='';
              }, 2000 );

        } else {
            document.querySelector('.imgLeft').innerHTML = `<img src="assets/images/${attacking.img}.gif">`;

            setTimeout( function() {
                document.querySelector('.imgLeft').innerHTML ='';
              }, 1000 );

        }




        let attackFactor =  (Math.random() * 2).toFixed(2); // criando um numero emtre 0.01 ate 2.00
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor; // criando um valor de atack, multiplicando o numero criado * o valor do attack da classe
        let actualDefense = attacking.defense * defenseFactor;

        if(actualAttack > actualDefense) { // SE HOUVE DANO
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} casou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else { //SE NAO HOUVE DANO
            this.log.addMessage(`${attacked.name} conseguiu defender`)
        }
        this.update();
    }
}

class Log {
    list = [];
    constructor(listEl){
        this.listEl = listEl;
    }
    addMessage(msg){
        this.list.push(msg);
        this.render();
    }
    render() {
        this.listEl.innerHTML = '';
        for(let i in this.list) {
            this.listEl.innerHTML += `<li> ${this.list[i]} </li>`
        }
    }
}