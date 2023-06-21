import { Container, Texture, TilingSprite, Sprite } from "pixi.js";
import { Manager } from "../../system/Manager";

export class GameScreen {
    constructor() {
        this.container = new Container();
        this.createBackground();
    }
    createBackground() {
        this.bg = new TilingSprite(Texture.from("Bg"), Manager.width, Manager.height);
        // this.bg.y = 0
        this.container.addChild(this.bg);
        this.bg2 = new Sprite(Texture.from("assets/images/envirenement.png"));
        this.bg2.y = Manager.height - this.bg.height + 150;
        this.bg2.width = Manager.width
        this.bg2.height = Manager.height
        this.container.addChild(this.bg2);

    }
    get backgroundSprite() {
        return this.bg;

    }
    get backgroundSprite2() {
        return this.bg2;

    }
}