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

        this.load.audio('select','./assets/select.wav')
        this.load.audio('gameover', './assets/GameOver.wav')
        this.load.audio('bgmusic','./assets/music.mp3')
        this.load.audio('hurt','./assets/hurt.wav')
        this.load.audio('spawn','./assets/spawn.wav')

        this.load.image('map', './assets/map.png')
        this.load.image('ship', './assets/ship.png')
        this.load.image('cursor', './assets/crosshair.png')
        this.load.image('hud','./assets/hud.png')
        /*this.load.spritesheet('mon','./assets/mon.png', {
            frameWidth: 32,
            frameHeight: 32,
        })*/
    }

    create(){
        /*this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mon',{start: 0, end: 3})
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mon',{start: 4, end: 7})
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mon',{start: 8, end: 11})
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mon',{start: 12, end: 15})
        })*/

        this.scene.start('menuScene')
    }
}