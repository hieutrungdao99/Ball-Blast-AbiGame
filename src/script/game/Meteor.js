import { Container, Sprite, AnimatedSprite, Texture, Ticker } from "pixi.js";
import { Manager } from "../../system/Manager";

export class Meteor extends Container {
  speedMeteorX = 1;
  speedMeteorY = 5;
  isMovingUp = true;
  maxDistance = 0;

  constructor() {
    super();
    this.container = new Container();
    this.createMeteorMin();
    this.createMeteorNormal();
    this.createMeteorMax();
    Ticker.shared.add(this.update, this);
  }

  createMeteorMin() {
    const meteorsMins = ["assets/images/meteorMin.png"];
    this.meteorMin = new AnimatedSprite(meteorsMins.map((frame) => Texture.from(frame)));
    this.container.addChild(this.meteorMin);
    this.meteorMin.x = -this.meteorMin.width;
    this.meteorMin.y = Math.random() * (0);
  }

  createMeteorNormal() {
    const meteorsNormals = ["assets/images/meteorNormal.png"];
    this.meteorNormal = new AnimatedSprite(meteorsNormals.map((frame) => Texture.from(frame)));
    this.container.addChild(this.meteorNormal);
    this.meteorNormal.x = Manager.width - this.meteorNormal.width;
    this.meteorNormal.y = Math.random() * (0);
  }

  createMeteorMax() {
    const meteorsMaxs = ["assets/images/meteorMax.png"];
    this.meteorMax = new AnimatedSprite(meteorsMaxs.map((frame) => Texture.from(frame)));
    this.meteorMax.width = 300;
    this.container.addChild(this.meteorMax);
    this.meteorMax.x = Manager.width - this.meteorMax.width;
    this.meteorMax.y = Math.random() * (0);
  }

  get meteorSpriteMin() {
    return this.meteorMin;
  }

  get meteorSpriteNormal() {
    return this.meteorNormal;
  }

  get meteorSpriteMax() {
    return this.meteorMax;
  }

  update(deltatime) {
    this.meteorMin.x += this.speedMeteorX * deltatime;
    this.meteorNormal.x -= this.speedMeteorX * deltatime;
    this.meteorMax.x -= this.speedMeteorX * deltatime;

    if (this.isMovingUp) {
      this.meteorMin.y -= this.speedMeteorY * deltatime;
      this.meteorNormal.y -= this.speedMeteorY * deltatime;
      this.meteorMax.y -= this.speedMeteorY * deltatime;

      if (this.meteorMin.y <= Manager.height/3) {
        this.isMovingUp = false;
      }
    } else {
      this.meteorMin.y += this.speedMeteorY * deltatime;
      this.meteorNormal.y += this.speedMeteorY * deltatime;
      this.meteorMax.y += this.speedMeteorY * deltatime;

      if (this.meteorMin.y >= Manager.height - this.meteorMin.height) {
        this.isMovingUp = true;
      }
    }
  }
}
