import { Container, Texture, TilingSprite } from "pixi.js";
import { Manager } from "../../system/Manager";

export class GameScreen {
    constructor() {
        this.container = new Container();
        this.createBackground();
    }
    createBackground() {
        this.bg = new TilingSprite(Texture.from("Bg"), Manager.width, Manager.height);
        this.container.addChild(this.bg);
    }
    get backgroundSprite() {
        return this.bg;
    }
}