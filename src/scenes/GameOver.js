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
        //Create Text for the game over Scene
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, `Game Over!`, menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '50px'
        menuConfig.color= '#FFFF00'
        this.add.text(game.config.width/2, game.config.height/1.1 , 'Press (R) to Reset', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/1.5 , 'Press SPACE to see Credits', menuConfig).setOrigin(0.5)

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        
   
    }

    update(){
        //make the keyboard inputs fro reseting and going to credits
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.play('gameover')
            this.scene.start('menuScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //console.log('Credits?')
            this.sound.play('select')
            this.scene.start('creditScene')
        }
    }

}