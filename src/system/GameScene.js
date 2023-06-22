import { Container } from 'pixi.js';
import { GameScreen } from '../script/screen/GameScreen';
import { Canon } from '../script/game/Canon';

export class GameScene extends Container {
    constructor() {
        super();
        this.createBackground();
        this.createCannon();
        this.space = 5;
        // event keydown
        this.onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this.onKeyDown);
    }
    createBackground() {
        // Create Background
        const background = new GameScreen();
        this.bg = background.backgroundSprite;
        this.bg2 = background.backgroundSprite2;
        this.addChild(this.bg);
        this.addChild(this.bg2);
    }
    createCannon() {
        // Create Canon
        const canon = new Canon();
        this._canon = canon.canonSprite;
        this.addChild(this._canon);
        //Create TierCanon
        this.tireCanon = canon.tireCanonSprite;
        this.addChild(this.tireCanon);
        this.tireCanon2 = canon.tireCanonSprite2;
        this.addChild(this.tireCanon2);
    }
    static onKeyDown(event) {
        const keyCode = event.keyCode;
        // di chuyen theo phim mui ten
        if (keyCode === 37) {
            this._canon.moveLeft(this.space);
        } else if (keyCode === 38) {
            this._canon.moveUp(this.space);
        }
    }
    update(framesPassed) {
        this.bg.tilePosition.x -= 2 * framesPassed;
    }
    update2(deltaTime) {
        this._canon.update2(deltaTime);
    }
    resize() {}
}
