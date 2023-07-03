import { Container, Texture, Sprite } from 'pixi.js';
import { Canon } from './Canon';
export class TireCanon {
    constructor() {
        this.container = new Container();
        this.createTireCanon();
    }
    createTireCanon() {
        this.tireCanon = Sprite.from('TireCanon');
        this.tireCanon.width = 50;
        this.tireCanon.height = 50;
        // this.tireCanon.anchor.set(0.5)
        this.tireCanon.x = 100;
        this.tireCanon.y = 100;

        this.container.addChild(this.tireCanon);
    }
    get tireCanonSprite() {
        return this.tireCanon;
    }
}
