import { Container, Sprite, Graphics, Text } from 'pixi.js';
import { Manager } from '../../system/Manager';

export class ResultScene {
    constructor() {
        this.container = new Container();
        this.createResult();
    }

    createResult() {
        this.onresult = Sprite.from('/assets/images/bgresult.png');
        this.onresult.width = 500;
        this.onresult.height = 500;
        this.onresult.anchor.set(0.5);
        this.onresult.x = Manager.width / 2;
        this.onresult.y = Manager.height / 2;
        this.container.addChild(this.onresult);
    }

    get ResultSprite() {
        return this.onresult;
    }
}
