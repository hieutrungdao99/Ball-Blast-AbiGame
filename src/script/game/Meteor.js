import { Container, Sprite,AnimatedSprite,Texture,Ticker } from "pixi.js";
import { Manager } from "../../system/Manager";
export class Meteor extends Container {
    speedMeteorX=0.5;
    speedMeteorY=1;
    constructor(){
        super();
        this.container = new Container();
        this.createMeteorMin();
        this.createMeteorNormal();
        this.createMeteorMax();
        Ticker.shared.add(this.update, this)

    }
    createMeteorMin() {
        const meteorsMins = [
            "assets/images/meteorMin.png"
        ];
        this.meteorMin = new AnimatedSprite(meteorsMins.map((frame) => Texture.from(frame)));
        this.container.addChild(this.meteorMin);
        this.meteorMin.x = -this.meteorMin.width; // Xuất hiện bên trái màn hình
        this.meteorMin.y = Math.random() * (Manager.height/3 - this.meteorMin.height); // Vị trí ngẫu nhiên theo chiều dọc
        // Ticker.shared.add(this.update, this);
    }
    createMeteorNormal() {
        const meteorsNormals = [
            "assets/images/meteorNormal.png"
        ];
        this.meteorNormal = new AnimatedSprite(meteorsNormals.map((frame) => Texture.from(frame)));
        this.container.addChild(this.meteorNormal);
        this.meteorNormal.x = Manager.width-this.meteorNormal.width ; // Xuất hiện bên phải màn hình
        this.meteorNormal.y = Math.random() * (Manager.height/3 - this.meteorNormal.height); // Vị trí ngẫu nhiên theo chiều dọc
        // Ticker.shared.add(this.update, this);
    }
    
    
    createMeteorMax() {
        const meteorsMaxs = [
            "assets/images/meteorMax.png"
        ];
        this.meteorMax = new AnimatedSprite(meteorsMaxs.map((frame) => Texture.from(frame)));
        this.meteorMax.width= 300
        this.container.addChild(this.meteorMax);
        this.meteorMax.x = Manager.width - this.meteorMax.width; 
        this.meteorMax.y =  Math.random() * (Manager.height/3 - this.meteorMax.height);; // Xuất hiện từ phía trên màn hình
        // Ticker.shared.add(this.update, this);
    }
    
    
    get meteorSpriteMin() {
        return this.meteorMin    
    }   
    get meteorSpriteNormal() {
        return this.meteorNormal
    }   
    get meteorSpriteMax() {
        return this.meteorMax
    }
    update(deltatime) {
        this.meteorMin.x += this.speedMeteorX + deltatime;
        // this.meteorMin.y += this.speedMeteorY+ deltatime;
    
        this.meteorNormal.x -= this.speedMeteorX+ deltatime;
        // this.meteorNormal.y += this.speedMeteorY+ deltatime;
    
        this.meteorMax.x -= this.speedMeteorX+ deltatime;
        // this.meteorMax.y += this.speedMeteorY+ deltatime;
    
        // Khi các meteor di chuyển đến vị trí giữa màn hình, dừng di chuyển
        if (this.meteorMin.x >= Manager.width / 3 - this.meteorMin.width / 2) {
            this.meteorMin.x = Manager.width / 3 - this.meteorMin.width / 2;
            // this.meteorMin.x += this.speedMeteorX + deltatime;
            this.meteorMin.y += this.speedMeteorY+ deltatime;
        }
    
        if (this.meteorNormal.x <= Manager.width*2/3 - this.meteorNormal.width / 2) {
            this.meteorNormal.x = Manager.width*2/3  - this.meteorNormal.width / 2;
            // this.meteorNormal.x -= this.speedMeteorX+ deltatime;
            this.meteorNormal.y += this.speedMeteorY+ deltatime;
        }
    
        if (this.meteorMax.y >= Manager.height / 2 - this.meteorMax.height / 2) {
            this.meteorMax.y = Manager.height / 2 - this.meteorMax.height / 2;
            // this.meteorNormal.x -= this.speedMeteorX+ deltatime;
            this.meteorNormal.y += this.speedMeteorY+ deltatime;
        }
    }
    
   
}



