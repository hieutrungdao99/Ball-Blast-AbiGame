import { Container, Ticker } from 'pixi.js';
import { GameScreen } from '../script/screen/GameScreen';
import { Canon } from '../script/game/Canon';

export class GameScene extends Container {
    keys = {};
    constructor() {
        super();
        this.createBackground();
        this.createCannon();
        this.sortChildren();
        this.space = 5;
        // //Event
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            console.log(e.key);
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
            console.log(e.key);
        });

        Ticker.shared.add(this.update, this);
    }
    createBackground() {
        // Create Background
        const background = new GameScreen();
        this.backgroundContainer = new Container();

        this.bg = background.backgroundSprite;
        this.bg.zIndex = 1;
        this.bg2 = background.backgroundSprite2;
        this.bg2.zIndex = 2;
        this.backgroundContainer.addChild(this.bg);
        this.backgroundContainer.addChild(this.bg2);

        this.backgroundContainer.zIndex = 0;
        this.backgroundContainer.sortChildren();
        this.addChild(this.backgroundContainer);
    }
    createCannon() {
        // Create Canon
        const canon = new Canon();
        this.canonContainer = new Container();
        this._canonSprite = canon.canonSprite;
        this.canonContainer.addChild(this._canonSprite);
        this._canonSprite.zIndex = 0;
        //Create TierCanon
        this.tireCanon = canon.tireCanonSprite;
        this.canonContainer.addChild(this.tireCanon);
        this.tireCanon.zIndex = 1;
        this.tireCanon2 = canon.tireCanonSprite2;
        this.tireCanon2.zIndex = 1;
        this.canonContainer.addChild(this.tireCanon2);
        this.canonContainer.sortChildren();

        this.canonContainer.zIndex = 100;
        this.addChild(this.canonContainer);
    }
    update(framesPassed) {
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.canonContainer.x -= 5;
            this.tireCanon.rotation +=1;
            this.tireCanon2.rotation +=1;
        }
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.canonContainer.x += 5;
            this.tireCanon.rotation +=1;
            this.tireCanon2.rotation +=1;

        }
        this.bg.tilePosition.x -= 2 * framesPassed;
    }
    resize() {}
}
