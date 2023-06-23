import { Sprite, Texture } from 'pixi.js';

export class Bullet extends Sprite {
    constructor(texture, x, y, speed, scale = 1) {
        super(texture);
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.scale.set(scale);
    }

    update(framesPassed) {
        this.y -= this.speed * framesPassed;
    }
}
