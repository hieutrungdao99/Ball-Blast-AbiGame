import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { Manager } from "../../system/Manager";
import * as PIXI from 'pixi.js';

export class Meteor2 extends Container {
  speedMeteorMinX = 1;
  speedMeteorMinY = 4;
  isMovingUp = true;
  maxHeight = 0;
  minHeight = Manager.height - 100;

  constructor(value) {
    super();
    this.value = value;
    this._maxScale = 1;
    this.meteorTexture = PIXI.Texture.from('MeteorNormal');
    this.meteorSprite = new PIXI.Sprite(this.meteorTexture);
    this.meteorSprite.anchor.set(0.5);
    this.type = "meteorNormal";
    this.addChild(this.meteorSprite);
    Ticker.shared.add(this.update, this);

    this.x = 0;
    this.y = 0;
  }

  update(deltaTime) {
    if (this.isMovingUp) {
      this.meteorSprite.y -= this.speedMeteorMinY
      if (this.meteorSprite.y <= Manager.height / 3) {
        this.isMovingUp = false;
      }
    } else {
      this.meteorSprite.y += this.speedMeteorMinY
      if (this.meteorSprite.y >= this.minHeight) {
        this.isMovingUp = true;
      }
    }
    this.meteorSprite.x += this.speedMeteorMinX
    if (this.meteorSprite.x <= 0) {
      this.meteorSprite.x = 0;
      this.speedMeteorMinX = Math.abs(this.speedMeteorMinX);
      this.meteorSprite.scale.x = Math.abs(this.meteorSprite.scale.x);
    }
    if (this.meteorSprite.x >= Manager.width) {
      this.meteorSprite.x = Manager.width;
      this.speedMeteorMinX = -Math.abs(this.speedMeteorMinX);
      this.meteorSprite.scale.x = -Math.abs(this.meteorSprite.scale.x);
    }
  }
}
