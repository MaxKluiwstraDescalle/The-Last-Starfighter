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
        menuConfig.color= '#ADD8E6'
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'New High Score', menuConfig).setOrigin(0.5)
        




    
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.play('gameover')
            this.scene.start('menuScene')
        }
    }

}