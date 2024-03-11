class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    create(){

        this.orbGroup = this.add.group({
            runChildUpdate: true
        })

        const velMa = 300
        const velMi = -300


        this.map=this.add.image(0,0,'map').setOrigin(0)
        this.hud = this.add.image(0, 0, 'hud').setOrigin(0)
        this.hud.depth = 1
        this.hud.setScrollFactor(0)
        this.cross = new Cross(this, 200, 150, 'cursor', 0, 'down')
        //this.hud = new Hud(this, 200, 150, 'hud',0 ,'down')

        this.keys= this.input.keyboard.createCursorKeys()


        this.input.keyboard.on('keydown-D',function(){
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)


        
        
        this.cameras.main.setBounds(0,0,this.map.width, this.map.height)
        this.cameras.main.startFollow(this.cross, true, 0.5, 0.5)
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height)


        
        this.ship = this.physics.add.sprite(100, 100, 'ship')
        this.ship.setVelocity(Phaser.Math.Between(velMi, velMa),Phaser.Math.Between(velMi, velMa))
        this.ship.setCollideWorldBounds(true)
        this.ship.body.setBounce(1)


        

        
    }

    update(){
 
        this.crossFSM.step()
        //this.hubFSM.step()

        //this.physics.world.collide(this.mon, this.orbGroup, this.orbCollision, null, this)

  
    }



    orbCollision(){
        this.sound.play('hurt')
        this.bgMusic.stop()
        this.scene.start('gameoverScene')
    }



}