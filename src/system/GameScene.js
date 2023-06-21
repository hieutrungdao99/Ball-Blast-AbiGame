import { Container } from "pixi.js"
import { GameScreen } from "../script/screen/GameScreen";
import { Canon } from "../script/game/Canon";
import { TireCanon } from "../script/game/TireCanon";

export class GameScene extends Container {
  constructor() {
    super();

    // Create Background
    const background = new GameScreen();
    this.bg = background.backgroundSprite;
    this.addChild(this.bg);
    // Create Canon
    const canon = new Canon();
    this._canon = canon.canonSprite;
    this.addChild(this._canon);
    this.tireCanon = canon.tireCanonSprite;
    this.addChild(this.tireCanon)
    console.log(this.tireCanon.height,'tireCanon')
    
  }

  update(framesPassed) {
    this.bg.tilePosition.x -= 2 * framesPassed
  }
  resize() { }
}
