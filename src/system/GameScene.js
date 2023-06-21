import { Container } from 'pixi.js';
import { GameScreen } from '../script/screen/GameScreen';
import { Canon } from '../script/game/Canon';

export class GameScene extends Container {
    constructor() {
        super();

        // Create Background
        const background = new GameScreen();
        this.bg = background.backgroundSprite;
        this.bg2 = background.backgroundSprite2;
        this.addChild(this.bg);
        this.addChild(this.bg2);
        // Create Canon
        const canon = new Canon();
        this._canon = canon.canonSprite;
        this.addChild(this._canon);
        this.tireCanon = canon.tireCanonSprite;
        this.addChild(this.tireCanon);
        this.tireCanon2 = canon.tireCanonSprite2;
        this.addChild(this.tireCanon2);
    }

    update(framesPassed) {
        this.bg.tilePosition.x -= 2 * framesPassed;
    }
    resize() {}
}
