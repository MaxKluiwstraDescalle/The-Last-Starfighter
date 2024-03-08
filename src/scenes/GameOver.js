class GameOver extends Phaser.Scene{
    constructor(){
        super("gameoverScene")
    }

    create(){
        let menuConfig= {
            fontFamily: 'Georgia',
            fontSize: '60px',
            color: '#FF0000',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //this.bgMusic.stop()
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, `Game Over! Points:`, menuConfig).setOrigin(0.5)
        
        menuConfig.fontSize = '70px'
        menuConfig.color= '#ADD8E6'
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'Credits', menuConfig).setOrigin(0.5)
        
        menuConfig.fontSize = '40px'
        menuConfig.color = '#00FF00'
        this.add.text(game.config.width/4, game.config.height/2.8, 'Audio and Music:', menuConfig).setOrigin(0.5)
        
        menuConfig.fontSize='20px'
        this.add.text(game.config.width/4, game.config.height/2, 'https://jfxr.frozenfractal.com/', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/4, game.config.height/1.5, 'https://uppbeat.io/browse/music/lo-fi-beats', menuConfig).setOrigin(0.5)
        
        menuConfig.fontSize='40px'
        this.add.text(game.config.width*0.75, game.config.height/2.8 , 'Visuals made by Me with:', menuConfig).setOrigin(0.5)
        
        menuConfig.fontSize='20px'
        this.add.text(game.config.width*0.75, game.config.height/2 , 'https://apps.lospec.com/pixel-editor', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width*0.75, game.config.height/1.5 , 'https://www.piskelapp.com/', menuConfig).setOrigin(0.5)
        
        menuConfig.fontSize = '50px'
        menuConfig.color= '#FFFF00'
        this.add.text(game.config.width/2, game.config.height/1.1 , 'Press (R) to Reset', menuConfig).setOrigin(0.5)

        menuConfig.fontSize = '15px'
        menuConfig.color= "#00FF00"
        this.add.text(140, 10,"Made by Max-Emilien Kluiwstra-Descalle", menuConfig).setOrigin(0.5)

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.play('gameover')
            this.scene.start('menuScene')
        }
    }

}