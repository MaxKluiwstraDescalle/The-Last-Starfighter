class Hud extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width , this.height )
        this.body.setCollideWorldBounds(true)

        this.direction = direction
        this.hudVelocity = 400

        scene.hudFSM = new StateMachine('idle',{
            idle: new IdleState(),
            move: new MoveState()
        },[ scene, this])
    }
}



class IdleState extends State{
    enter(scene,hud){
        hud.setVelocity(0)
    }

    execute(scene, hud){
        const {left, right, up, down} = scene.keys
        if(left.isDown || right.isDown || up.isDown || down.isDown){
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State{
    execute(scene, hud){
        const{left, right, up , down} = scene.keys
        if(!(left.isDown || right.isDown || up.isDown || down.isDown)){
            this.stateMachine.transition('idle')
        }
        let moveDir = new Phaser.Math.Vector2(0,0)

        if(up.isDown){
            moveDir.y = -1
            hud.direction = 'up'
        }else if(down.isDown){
            moveDir.y = 1
            hud.direction = 'down'
        }else if(right.isDown){
            moveDir.x = 1
            hud.direction = 'right'
        }else if(left.isDown){
            moveDir.x = -1
            hud.direction = 'left'
        }
        //console.log('Hello')
        moveDir.normalize()
        hud.setVelocity(hud.hudVelocity * moveDir.x, hud.hudVelocity * moveDir.y)
    }
    

}