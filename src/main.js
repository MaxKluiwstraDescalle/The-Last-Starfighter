// Max-Emilien Kluiwstra-Descalle
// Death Ball
// 25 Hours
//Phaser major components: Physics System, Cameras, Particle Effects, The Animation Manager, the Tween Manager, Timers

/*
    

extra Sources: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
*/

//Making Initial game config

'use strict';
let config = {
    parent: 'endGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Menu, Play, GameOver, Credits, HighScore ]
}

let game = new Phaser.Game(config)

//Make some universal variables that will be used in multiple files.

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let score = 0

//let highScore = 0

let keySPACE, keyRESET//, keyRIGHT, keyLEFT, keyUP, keyDOWN 

