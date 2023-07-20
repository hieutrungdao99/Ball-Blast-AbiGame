import { Container, Sprite, Texture, Ticker, ColorMatrixFilter, Text, Graphics } from "pixi.js";
import { Manager } from "../../system/Manager";
import * as PIXI from 'pixi.js';

export class Meteor extends Container {
  speedMeteorMinX = 1;
  speedMeteorMinY = 2;
  isMovingUp = false;
  maxHeight = 0;
  minHeight = Manager.height - 100;

  constructor(value, startX = Math.random() < 0.5 ? 0 : Manager.width, startY = 0) {
    super();
    this.x = startX;
    this.y = startY;
    this.value = value;
    this.meteorTexture = PIXI.Texture.from('MeteorMin');
    this.meteorSprite = new PIXI.Sprite(this.meteorTexture);
    this.meteorSprite.anchor.set(0.5);
    this.type = "meteorMin";
    this.addChild(this.meteorSprite);

    this.container = new Graphics();
    this.container.x = 0;
    this.container.y = 0;
    this.container.beginFill('0xFFFFFF');
    this.container.drawCircle(0, 0, this.meteorSprite.width / 2 * 0.4);
    this.container.endFill();
    this.container.alpha = 0;
    this.meteorSprite.addChild(this.container);

    this.valueText = new PIXI.Text(this.value.toString(), { fill: "black", fontSize: 20 });
    this.valueText.anchor.set(0.5);
    this.meteorSprite.addChild(this.valueText);
    this.valueText.x = this.meteorSprite.x / 2;
    this.valueText.y = this.meteorSprite.y / 2;
    Ticker.shared.add(this.update, this);


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
