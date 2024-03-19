class Load extends Phaser.Scene{
    constructor(){
        super("loadScene")
    }

    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });


        //load audio
        this.load.audio('select','./assets/select.wav')
        this.load.audio('gameover', './assets/GameOver.wav')
        //this.load.audio('bgmusic','./assets/music.mp3')
        this.load.audio('hurt','./assets/hurt.wav')
        //this.load.audio('spawn','./assets/spawn.wav')
        this.load.audio('explode','./assets/explosion.wav')

        //load image
        this.load.image('map', './assets/map.png')
        this.load.image('ship', './assets/ship.png')
        this.load.image('cursor', './assets/crosshair.png')
        this.load.image('hud','./assets/hud.png')
        this.load.spritesheet('boss','./assets/boss.png', {frameWidth: 400, frameHeight: 400})
        this.load.image('explosion','./assets/explosion.png')
        this.load.image('laser','./assets/laser.png')
        
        /*this.load.spritesheet('mon','./assets/mon.png', {
            frameWidth: 32,
            frameHeight: 32,
        })*/
    }

    create(){

        this.scene.start('menuScene')
    }
}