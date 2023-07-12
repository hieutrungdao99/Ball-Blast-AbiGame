import { Container, Sprite, Texture, Ticker, ColorMatrixFilter, Text } from "pixi.js";
import { Manager } from "../../system/Manager";
import * as PIXI from 'pixi.js';
import { Meteor } from "./MeteorObj";


export class Meteor2 extends Container {
  speedMeteorMinX = 0.5;
  speedMeteorMinY = 2;
  isMovingUp = true;
  maxHeight = 0;
  minHeight = Manager.height - 100;

  constructor(value) {
    super();
    this.value = value;
    this.meteorTexture = PIXI.Texture.from('MeteorNor');
    this.meteorSprite = new PIXI.Sprite(this.meteorTexture);
    this.meteorSprite.anchor.set(0.5);
    this.type = "meteorNor";
    this.addChild(this.meteorSprite);

    Ticker.shared.add(this.update, this);
    this.valueText = new PIXI.Text(this.value.toString(), { fill: "black", fontSize: 40 });
    this.valueText.anchor.set(0.5);
    this.meteorSprite.addChild(this.valueText);
    this.valueText.x = this.meteorSprite.x / 2;
    this.valueText.y = this.meteorSprite.y / 2;
    this.x = 0;
    this.y = 0;
    this.rotationSpeed = 0.005;
    const meteorTintFilter = new ColorMatrixFilter();
    meteorTintFilter.tint(0x0000FF);
    this.meteorSprite.filters = [meteorTintFilter];
  }

  update(deltaTime) {
    this.valueText.text = this.value.toString();
    this.meteorSprite.rotation += this.rotationSpeed;

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
