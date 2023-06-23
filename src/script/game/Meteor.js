import { Container, Sprite,AnimatedSprite,Texture,Ticker } from "pixi.js";
export class Meteor extends Container {
    speedMeteorX=1;
    speedMeteorY=5;
    constructor(){
        super();
        this.container = new Container();
        this.createMeteor();
    }
    createMeteor() {
        const meteors = [
            "assets/images/meteor.png"
        ]
        this.meteor = new AnimatedSprite(meteors.map((frame) => Texture.from(frame)));
        // this.meteor = Sprite.from('assets/images/meteor.png')
        this.meteor.width = 100;
        this.meteor.height = 100;
        this.container.addChild(this.meteor)
        this.meteor.x = 0;
        this.meteor.y = 100;
        Ticker.shared.add(this.update, this)


    }
    get meteorSprite() {
        return this.meteor;
    }
    update(deltatime){
        this.meteor.x += this.speedMeteorX
        this.meteor.y += this.speedMeteorY + deltatime;

    }
}



