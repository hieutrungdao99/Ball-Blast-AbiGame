import { Container, Sprite, AnimatedSprite, Texture, Ticker } from "pixi.js";
import { Manager } from "../../system/Manager";

export class Meteor extends Container {
  speedMeteorMinX = 2;
  speedMeteorMinY = 5;
  speedMeteorNormalX = 2;
  speedMeteorNormalY = 4;
  speedMeteorMaxX = 1;
  speedMeteorMaxY = 4;
  isMovingUpMin = true;
  isMovingUpNormal = true;
  isMovingUpMax = true;
  maxHeight = 0; 
  minHeight = Manager.height - 100;
  minHeight2 = Manager.height - 200; 
  minHeight3 = Manager.height - 300; 


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
    this.meteorNormal.y = Math.random() * (0 - this.meteorNormal.height); 
  }

  createMeteorMax() {
    const meteorsMaxs = ["assets/images/meteorMax.png"];
    this.meteorMax = new AnimatedSprite(meteorsMaxs.map((frame) => Texture.from(frame)));
    // this.meteorMax.width = 250;
    this.container.addChild(this.meteorMax);
    this.meteorMax.x = Manager.width - this.meteorMax.width;
    this.meteorMax.y = Math.random() * (0 - this.meteorMax.height); 
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
    // Meteor Min
    if (this.isMovingUpMin) {
      this.meteorMin.y -= this.speedMeteorMinY * deltatime;
      if (this.meteorMin.y <= Manager.height / 3) {
        this.isMovingUpMin = false;
      }
    } else {
      this.meteorMin.y += this.speedMeteorMinY * deltatime;
      if (this.meteorMin.y >= this.minHeight) {
        this.isMovingUpMin = true;
      }
    }
    this.meteorMin.x += this.speedMeteorMinX * deltatime;
    if (this.meteorMin.x <= 0) {
      this.meteorMin.x = 0;
      this.speedMeteorMinX = Math.abs(this.speedMeteorMinX);
      this.meteorMin.scale.x = Math.abs(this.meteorMin.scale.x);
    }
    if (this.meteorMin.x >= Manager.width - this.meteorMin.width) {
      this.meteorMin.x = Manager.width - this.meteorMin.width;
      this.speedMeteorMinX = -Math.abs(this.speedMeteorMinX);
      this.meteorMin.scale.x = -Math.abs(this.meteorMin.scale.x);
    }

    // Meteor Normal
    if (this.isMovingUpNormal) {
      this.meteorNormal.y -= this.speedMeteorNormalY * deltatime;
      if (this.meteorNormal.y <= this.maxHeight+200) {
        this.isMovingUpNormal = false;
      }
    } else {
      this.meteorNormal.y += this.speedMeteorNormalY * deltatime;
      if (this.meteorNormal.y >= this.minHeight2) {
        this.isMovingUpNormal = true;
      }
    }
    this.meteorNormal.x += this.speedMeteorNormalX * deltatime;
    if (this.meteorNormal.x <= 0 ) {
      this.meteorNormal.x = 0;
      this.speedMeteorNormalX = Math.abs(this.speedMeteorNormalX);
      this.meteorNormal.scale.x = -Math.abs(this.meteorNormal.scale.x);
    }
    if (this.meteorNormal.x >= Manager.width + this.meteorMin.width) {
      this.meteorNormal.x = Manager.width + this.meteorMin.width;
      this.speedMeteorNormalX = -Math.abs(this.speedMeteorNormalX);
      this.meteorNormal.scale.x = -Math.abs(this.meteorNormal.scale.x);
    }

    // Meteor Max
    if (this.isMovingUpMax) {
      this.meteorMax.y -= this.speedMeteorMaxY * deltatime;
      if (this.meteorMax.y <= this.maxHeight) {
        this.isMovingUpMax = false;
      }
    } else {
      this.meteorMax.y += this.speedMeteorMaxY * deltatime;
      if (this.meteorMax.y >= this.minHeight3) {
        this.isMovingUpMax = true;
      }
    }
    this.meteorMax.x += this.speedMeteorMaxX * deltatime;
    if (this.meteorMax.x <= 0) {
      this.meteorMax.x = 0;
      this.speedMeteorMaxX = Math.abs(this.speedMeteorMaxX);
      this.meteorMax.scale.x = Math.abs(this.meteorMax.scale.x);
    }
    if (this.meteorMax.x >= Manager.width + this.meteorMin.width) {
      this.meteorMax.x = Manager.width + this.meteorMin.width ;
      this.speedMeteorMaxX = -Math.abs(this.speedMeteorMaxX);
      this.meteorMax.scale.x = -Math.abs(this.meteorMax.scale.x);
    }
  }
}
