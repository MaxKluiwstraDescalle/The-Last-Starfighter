class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    create(){

        this.totalTime = 300

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        })
        
        this.orbGroup = this.add.group({
            runChildUpdate: true
        })

        this.bullets = 20

        this.velMa = 500
        this.velMi = -500

        this.posMax = 1100
        this.posMin = 100

        this.bg3 = this.add.image(0,0, 'map').setOrigin(0)
        this.map= this.add.image(0,0,'map').setOrigin(0)
        this.bg2 = this.add.image(0,0,'map').setOrigin(0)
       
        this.hud = this.add.image(0, 0, 'hud').setOrigin(0)
        this.hud.depth = 2
        this.hud.setScrollFactor(0)
        this.cross = new Cross(this, 200, 150, 'cursor', 0, 'down')
        this.cross.body.setCircle(40)
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
        this.ship.setVelocity(Phaser.Math.Between(this.velMi, this.velMa),Phaser.Math.Between(this.velMi, this.velMa))
        this.ship.setCollideWorldBounds(true)
        this.ship.body.setBounce(1)
        this.ship.body.setCircle(75)
        this.ship.setDepth(2)
        this.hud.setDepth(3)
        this.cross.setDepth(3)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers('boss',{start: 0, end: 7}),
            frameRate: 1,
            repeat: -1
        })


        this.killableFrame = 1

        
        

        
        

       

        

        
    }

    update(){
  
       


        
        if(score == 15000){
            score += 1000
            this.boss = this.physics.add.sprite(600,600, 'boss')
            this.boss.play('rotate')
            this.boss.setDepth(2)
            this.ship.destroy()
        }
        
        

        this.crossFSM.step()
        this.bg2.x += 0.5;
        if (this.bg2.x > this.bg2.width) {
            this.bg2.x = 0;
        }
        this.map.x += 0.1;
        if (this.map.x > this.map.width) {
            this.map.x = 0;
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            
            this.sound.play('hurt')
            if(score == 16000){
                //console.log(this.boss.anims.currentFrame.index)
                if(this.boss.anims.currentFrame.index === this.killableFrame){
                    //console.log('in loop')
                    this.scene.start('gameoverScene')
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
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.play('gameover')
            this.scene.start('menuScene')
        }
    
  
    }



    shotCollision(ship){
        //console.log(ship.x, ship.y)
        //this.emitter.emitParticle(400, 400, 'explosion', 0, true)
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

        //this.emitter.destroy


        
        //onsole.log(this.bullets)
        score += 1000
        //console.log(score)
        this.ship.setVelocity(Phaser.Math.Between(this.velMi, this.velMa),Phaser.Math.Between(this.velMi,this.velMa))
        const posX = Phaser.Math.Between(this.posMin, this.posMax)
        const posY = Phaser.Math.Between(this.posMin, this.posMax)
        //console.log(posX, posY)
        this.ship.setPosition(posX, posY)
        //this.cross.setPosition(400,400)
        this.time.delayedCall(1000, ()=>{
            this.emitter.stop()
        })

   
        //console.log(this.bullets)
    }

    onTimerTick(){
        this.totalTime--;
        //console.log(this.totalTime)
        if(this.totalTime<= 0){
            this.scene.start('gameoverScene')
            this.timerEvent.remove()
        }
    }




}