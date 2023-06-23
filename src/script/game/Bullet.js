import { Sprite, Texture } from 'pixi.js';

export class Bullet extends Sprite {
    constructor(texture, x, y, speed) {
        super(texture);
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(framesPassed) {
        this.y -= this.speed * framesPassed;
    }
}
