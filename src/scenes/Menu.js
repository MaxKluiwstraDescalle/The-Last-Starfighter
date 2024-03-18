class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    create(){
        let menuConfig= {
            fontFamily: 'Georgia',
            fontSize: '100px',
            color: '#FF0000',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Make text for menu
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'The Last Starfighter', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '32px'

        menuConfig.color = '#FFFF00'
        
        this.add.text(game.config.width/2, game.config.height/1.3, 'Use Arrows Keys to Move and SPACE to shoot, Shoot the Ships!', menuConfig).setOrigin(0.5)

        menuConfig.color = '#FFFF00'
        this.add.text(game.config.width/2, game.config.height/1.2 + borderUISize + borderPadding, 'Press SPACE to Start', menuConfig).setOrigin(0.5)

        //Make key to start
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)



    
    }

    update(){
        //Check if key is down
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.sound.play('select')
            this.scene.start('playScene')
        }
    }

}