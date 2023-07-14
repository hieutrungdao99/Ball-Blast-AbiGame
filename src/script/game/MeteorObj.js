import { Container, Sprite, Texture, Ticker, ColorMatrixFilter, Text } from "pixi.js";
import { Manager } from "../../system/Manager";
import * as PIXI from 'pixi.js';

export class Meteor extends Container {
  speedMeteorMinX = 1;
  speedMeteorMinY = 2;
  isMovingUp = true;
  maxHeight = 0;
  minHeight = Manager.height - 100;

  constructor(value, startX, startY) {
    super();
    this.x = startX;
    this.y = startY;
    this.value = value;
    this.meteorTexture = PIXI.Texture.from('MeteorMin');
    this.meteorSprite = new PIXI.Sprite(this.meteorTexture);
    this.meteorSprite.anchor.set(0.5);
    this.type = "meteorMin";
    this.addChild(this.meteorSprite);

    this.valueText = new PIXI.Text(this.value.toString(), { fill: "black", fontSize: 20 });
    this.valueText.anchor.set(0.5);
    this.meteorSprite.addChild(this.valueText);
    this.valueText.x = this.meteorSprite.x / 2;
    this.valueText.y = this.meteorSprite.y / 2;
    Ticker.shared.add(this.update, this);
    this.x = Math.random() < 0.5 ? 0 : Manager.width;
    this.y = 0;
    this.rotationSpeed = 0.008;
    const meteorTintFilter = new ColorMatrixFilter();
    meteorTintFilter.tint(0x00FF00);
    this.meteorSprite.filters = [meteorTintFilter];
  }

  update(deltaTime) {
    this.valueText.text = this.value.toString();
    this.meteorSprite.rotation += this.rotationSpeed;

    if (this.isMovingUp) {
      this.y -= this.speedMeteorMinY;
      if (this.y <= this.maxHeight) {
        this.isMovingUp = false;
      }
    } else {
      this.y += this.speedMeteorMinY;
      if (this.y >= this.minHeight) {
        this.isMovingUp = true;
      }
    }

    this.x += this.speedMeteorMinX;
    if (this.x <= 0) {
      this.x = 0;
      this.speedMeteorMinX = Math.abs(this.speedMeteorMinX);
      this.scale.x = Math.abs(this.scale.x);
    }
    if (this.x >= Manager.width) {
      this.x = Manager.width;
      this.speedMeteorMinX = -Math.abs(this.speedMeteorMinX);
      this.scale.x = -Math.abs(this.scale.x);
    }
  }

}
