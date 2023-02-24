


let log = new Log(document.querySelector('.log'));
let char = new Knight('Léo');
let monster = new LittleMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    document.querySelector('.img'),
    log
)
stage.start();