import { Container, Sprite, Texture, Ticker, ColorMatrixFilter, Text } from "pixi.js";
import { Manager } from "../../system/Manager";
import * as PIXI from 'pixi.js';
import { Meteor } from "./MeteorObj";

export class Meteor3 extends Container {
  speedMeteorMinX = 0.5;
  speedMeteorMinY = 1;
  isMovingUp = true;
  maxHeight = 0;
  minHeight = Manager.height - 100;

  constructor(value, startX, startY) {
    super();
    this.x = startX;
    this.y = startY;
    this.value = value;
    this.meteorTexture = PIXI.Texture.from('MeteorMax');
    this.meteorSprite = new PIXI.Sprite(this.meteorTexture);
    this.meteorSprite.anchor.set(0.5);
    this.type = "meteorMax";

    this.addChild(this.meteorSprite);
    Ticker.shared.add(this.update, this);
    this.valueText = new PIXI.Text(this.value.toString(), { fill: "black", fontSize: 60 });
    this.valueText.anchor.set(0.5);
    this.meteorSprite.addChild(this.valueText);
    this.valueText.x = this.meteorSprite.x / 2;
    this.valueText.y = this.meteorSprite.y / 2;
    this.x = Math.random() < 0.5 ? 0 : Manager.width;
    this.y = 0;
    this.rotationSpeed = 0.005;
    const meteorTintFilter = new ColorMatrixFilter();
    meteorTintFilter.tint(0xFF0000);
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
