import { Container, Texture, TilingSprite, Sprite } from 'pixi.js';
import { Manager } from '../../system/Manager';

export class GameScreen {
    constructor() {
        this.container = new Container();
        this.createBackground();
    }
    createBackground() {
        //Cloud
        this.bg = new TilingSprite(
            Texture.from('Cloud'),
            Manager.width,
            Manager.height,
        );
        this.container.addChild(this.bg);
        //Mountain
        this.bg2 = new Sprite(Texture.from('Bg'));
        this.bg2.y = Manager.height - this.bg.height + 150;
        this.bg2.width = Manager.width;
        this.bg2.height = Manager.height;
        this.container.addChild(this.bg2);
    }
    get backgroundSprite() {
        return this.bg;
    }
    get backgroundSprite2() {
        return this.bg2;
    }
}