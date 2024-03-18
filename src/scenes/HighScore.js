class HighScore extends Phaser.Scene{
    constructor(){
        super("highscoreScene")
    }
    create(){
        console.log('credits')
        let menuConfig= {
            fontFamily: 'Georgia',
            fontSize: '144px',
            color: '#FF0000',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        
        menuConfig.fontSize = '70px'
        menuConfig.color= '#FF0000'
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'New High Score', menuConfig).setOrigin(0.5)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)




    
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.play('gameover')
            this.scene.start('menuScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.sound.play('select')
            this.scene.start('gameoverScene')
        }
        
    }

}