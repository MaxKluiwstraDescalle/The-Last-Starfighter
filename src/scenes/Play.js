class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    create(){
        score = 0
        //Make a timer so that the game ends after 5 minutes
        this.totalTime = 300

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        })
        
        //Initiate variables, that will be used
        this.bullets = 20

        this.velMa = 500
        this.velMi = -500

        this.posMax = 1100
        this.posMin = 100


        //make multiple backgrounds to use for parralax scrolling background
        this.bg3 = this.add.image(0,0, 'map').setOrigin(0)
        this.map= this.add.image(0,0,'map').setOrigin(0)
        this.bg2 = this.add.image(0,0,'map').setOrigin(0)
       
        //Create the circle Hud and make it not scroll
        this.hud = this.add.image(0, 0, 'hud').setOrigin(0)
        this.hud.depth = 2
        this.hud.setScrollFactor(0)

        //Make the cross hair and use the state machine
        this.cross = new Cross(this, 200, 150, 'cursor', 0, 'down')
        this.cross.body.setCircle(40)

        //Make keys and crosshair 
        this.keys= this.input.keyboard.createCursorKeys()

        //make debug key for debugging
        this.input.keyboard.on('keydown-D',function(){
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)


        
        //Make the camera follow the cross hair
        this.cameras.main.setBounds(0,0,this.map.width, this.map.height)
        this.cameras.main.startFollow(this.cross, true, 0.5, 0.5)

        //Make it the crosshair cant leave the map
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height)

        //make the ship and all the properties it will have
        this.ship = this.physics.add.sprite(100, 100, 'ship')
        this.ship.setVelocity(Phaser.Math.Between(this.velMi, this.velMa),Phaser.Math.Between(this.velMi, this.velMa))
        this.ship.setCollideWorldBounds(true)
        this.ship.body.setBounce(1)
        this.ship.body.setCircle(75)
        this.ship.setDepth(2)
        this.hud.setDepth(3)
        this.cross.setDepth(3)
        this.cross.setImmovable(true)

        //Add a key for reset and key for shooting
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //create animatin for the boss
        this.anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers('boss',{start: 0, end: 7}),
            frameRate: 1,
            repeat: -1
        })

        //Declare which frame is killable
        this.killableFrame = 1

        
    }

    update(){
        //check if score is equal to current score and if so make the boss
        if(score == 15000){
            score += 1000
            this.boss = this.physics.add.sprite(600,600, 'boss')
            this.boss.play('rotate')
            this.boss.setDepth(2)
            this.ship.destroy()
            this.boss.body.setCircle(200)

        }
        

        this.crossFSM.step()

        //make parrald scrolling happen
        this.bg2.x += 0.5;
        if (this.bg2.x > this.bg2.width) {
            this.bg2.x = 0;
        }
        this.map.x += 0.1;
        if (this.map.x > this.map.width) {
            this.map.x = 0;
        }

        //check if space is press down and shoot if it is, use audio to shoot and stuff
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            
            //make laser beams appear when shooting and make them leave using tween
            this.laser = this.add.image(this.cross.x, this.cross.y+80, 'laser')
            this.laser.setDepth(2)
            this.tweens.add({
                targets: this.laser,
                alpha: 0,
                duration: 200, // Duration of the fade
                onComplete: () => {
                    // Remove the laser image when the tween completes
                    this.laser.destroy();
                }
            });


            this.sound.play('hurt')
            //if you have right score you check if you are at the proper frame to shoot the boss otherwise you reduce the number of bullets and check for collision
            if(score == 16000){
                //console.log(this.boss.anims.currentFrame.index)
                if(this.boss.anims.currentFrame.index === this.killableFrame){
                    //console.log('in loop')
                    this.scene.start('highscoreScene')
                }
            }else{
                if(this.bullets!= 0){
                    this.bullets -= 1
                    if(this.physics.collide(this.cross, this.ship)){
                        this.shotCollision(this.ship)
                    } 
                }else if(this.bullets == 0){
                    //console.log(this.bullets)
                    this.scene.start('gameoverScene')
                }
            }
            
        }
        

        //this.physics.world.collide(this.mon, this.orbGroup, this.orbCollision, null, this)
        //Make reset key
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.play('gameover')
            this.scene.start('menuScene')
        }
    
  
    }



    shotCollision(ship){
        //make emitter and play an explosion sound to show that the ship died.
        this.emitter = this.add.particles('explosion').createEmitter({
            x: ship.x,
            y: ship.y,
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            lifespan: 1000,
            blendMode: 'ADD',
            quantity: 20
        });
        this.sound.play('explosion')

        //this.emitter.destroy


        //Increment Score
        score += 1000
        
        //set the ship to a random speed and a random location 
        this.ship.setVelocity(Phaser.Math.Between(this.velMi, this.velMa),Phaser.Math.Between(this.velMi,this.velMa))
        const posX = Phaser.Math.Between(this.posMin, this.posMax)
        const posY = Phaser.Math.Between(this.posMin, this.posMax)
        
        this.ship.setPosition(posX, posY)

        //stop the emitter after some time
        this.time.delayedCall(1000, ()=>{
            this.emitter.stop()
        })

   
        //console.log(this.bullets)
    }

    //Make the ticker for the timer
    onTimerTick(){
        this.totalTime--;
        //console.log(this.totalTime)
        if(this.totalTime<= 0){
            this.scene.start('gameoverScene')
            this.timerEvent.remove()
        }
    }




}