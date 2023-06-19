import { Container, Sprite } from "pixi.js"
import { Manager } from "./Manager"
import { Game } from "../game/Game";

export class GameScene extends Container {
  constructor() {
    super();
    this.createClampy();
  }

  createClampy(){
    this.Clamp = new Game();
    this.addChild(this.Clamp);
  }

  update(framesPassed) {
    this.Clamp.update(framesPassed)
  }
  resize() {}
}
