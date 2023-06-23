import { Container, Sprite, Ticker } from 'pixi.js';
import { Manager } from '../../system/Manager';

export class Canon {
    moveX = 0;
    constructor() {
        // super()
        this.container = new Container();
        this.createCanon();
        this.getTireCanon();
        this.getTireCanon2();
    }
    createCanon() {
        this._canon = Sprite.from('/assets/images/Canon.png');
        this._canon.width = 100;
        this._canon.height = 100;
        this._canon.anchor.set(0.5);
        this._canon.x = Manager.width / 2;
        this._canon.y = Manager.height - 100;
        console.log(this._canon.height);
        console.log(this._canon.width);

        this.container.addChild(this._canon);
    }
    getTireCanon() {
        this.tireCanon = Sprite.from('/assets/images/TireCanon.png');
        this.tireCanon.width = 50;
        this.tireCanon.height = 50;
        this.tireCanon.x = this._canon.x + 35;
        this.tireCanon.y = this._canon.y + 40;
        this.tireCanon.anchor.set(0.5);

        this.container.addChild(this.tireCanon);
    }
    getTireCanon2() {
        this.tireCanon2 = Sprite.from('/assets/images/TireCanon.png');
        this.tireCanon2.width = 50;
        this.tireCanon2.height = 50;
        // this.tireCanon.anchor.set(0.5)
        this.tireCanon2.x = this._canon.x - 40;
        this.tireCanon2.y = this._canon.y + 40;
        this.tireCanon2.anchor.set(0.5);

        this.container.addChild(this.tireCanon2);
    }
    get canonSprite() {
        return this._canon;
    }
    get tireCanonSprite() {
        return this.tireCanon;
    }
    get tireCanonSprite2() {
        return this.tireCanon2;
    }
}
