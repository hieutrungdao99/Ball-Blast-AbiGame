import { Container } from "pixi.js"
import { GameScreen } from "../script/screen/GameScreen";

export class GameScene extends Container {
  constructor() {
    super();

    // Create Background
    const background = new GameScreen();
    this.bg = background.backgroundSprite;
    this.bg2 = background.backgroundSprite2;
    this.addChild(this.bg);
    this.addChild(this.bg2);
  }

  update(framesPassed) {
    this.bg.tilePosition.x -= 2 * framesPassed

  }
  resize() { }
}
