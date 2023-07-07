import { Container, Sprite, Texture, Ticker,ColorMatrixFilter,Text } from "pixi.js";
import { Manager } from "../../system/Manager";
import * as PIXI from 'pixi.js';

export class Meteor3 extends Container {
  speedMeteorMinX = 0.5;
  speedMeteorMinY = 2;
  isMovingUp = true;
  maxHeight = 0;
  minHeight = Manager.height - 100;

  constructor(value) {
    super();
    this.value = value;
    this._maxScale = 1;
    this.meteorTexture = PIXI.Texture.from('MeteorMax');
    this.meteorSprite = new PIXI.Sprite(this.meteorTexture);
    this.meteorSprite.anchor.set(0.5);
    this.type = "meteorMax";

    this.addChild(this.meteorSprite);
    Ticker.shared.add(this.update, this);
    this.valueText = new PIXI.Text(this.value.toString(), { fill: "black", fontSize: 60  });
    this.valueText.anchor.set(0.5);
    this.meteorSprite.addChild(this.valueText);
    this.valueText.x = this.meteorSprite.x/2;
    this.valueText.y = this.meteorSprite.y/2;
    this.x = 0;
    this.y = 0;
    const meteorTintFilter = new ColorMatrixFilter();
    meteorTintFilter.tint(0xFF0000); 
    this.meteorSprite.filters = [meteorTintFilter];
  }

  update(deltaTime) {

    this.valueText.text = this.value.toString();
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