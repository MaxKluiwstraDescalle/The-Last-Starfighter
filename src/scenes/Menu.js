class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    create(){
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


        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'The Last Starfighter', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '32px'

        menuConfig.color = '#FFFF00'
        
        this.add.text(game.config.width/2, game.config.height/1.3, 'Use Arrows Keys to Move and space to shoot, Shoot the Ships!', menuConfig).setOrigin(0.5)

        menuConfig.color = '#FFFF00'
        this.add.text(game.config.width/2, game.config.height/1.2 + borderUISize + borderPadding, 'Press SPACE to Start', menuConfig).setOrigin(0.5)

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)



    
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.sound.play('select')
            this.scene.start('playScene')
        }
    }

}