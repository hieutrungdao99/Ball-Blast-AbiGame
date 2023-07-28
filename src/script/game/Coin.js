import { AnimatedSprite, Container, Texture, Ticker } from "pixi.js";
import { Manager } from "../../system/Manager";

export class Coin extends Container {

    sprite;
    speedCoin = 3;
    spinSpeed = 0.25;

    constructor(x, y) {
        super();
        const frames = [
            'Coin1',
            'Coin2',
            'Coin3',
            'Coin4',
            'Coin5',
            'Coin6',
        ];
        this.sprite = new AnimatedSprite(frames.map((frame) => Texture.from(frame)));
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.play();
        this.sprite.animationSpeed = this.spinSpeed;
        Ticker.shared.add(this.update, this)
        this.addChild(this.sprite)
    }
    update(deltaTime) {
        this.sprite.y += this.speedCoin * deltaTime;
        if (this.sprite.y + this.sprite.height >= Manager.height) {
            Ticker.shared.remove(this.update, this)
            this.removeChild(this.sprite)
        }
    }

}
