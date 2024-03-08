// Max-Emilien Kluiwstra-Descalle
// Death Ball
// 25 Hours
//Creative Tilt: V

/*
    The technically interesting part I did was, in order to add a little bit more randomness to the game, I made it so the spawning of orbs was dependent
on the phaser game timer instead of using an event. This also meant I would divide by 1000 to get seconds, and then make them spawn if the modulo
of 1 of the number was over 0.95 it would spawn orbs. This sometimes spawns one orb and sometimes 3-4. It depends on what the phaser timer feels like doing.
I had been messing around with the timing functions to see if there was an easier way of doing it than events and coudlnt find one but still wanted to include this
in a new fun way. I also added a last score and high score for the Menu screne so you can keep track of your high score. I also found the concept of scrolling in
one direction a little plan so I decided to add a map based on what we learned last class since it replicated the scrolling I wanted better.


I am not an artist so I was trying to make a simple background that highlighted movement but was a fun background for the game. I ended up with the ovals on
a dark blue background. I loved the look, it was simple not incredibly distracting, but still pretty. The monster was intentionally made into a funny green blob.
I didn't want to make him human because i wanted him to kind of scuttle around with a lot of legs. The animation ended up being exactly what I wanted. The orbs
were simple paturn shapes that I thought fit the theme of the game well.

extra Sources: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
*/

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
    scene: [ Load, Menu, Play, GameOver ]
}

let game = new Phaser.Game(config)

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

//let timeSurv = 0

//let highScore = 0

let keySPACE, keyRESET//, keyRIGHT, keyLEFT, keyUP, keyDOWN 