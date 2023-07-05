import { Container, Sprite, AnimatedSprite, Texture, Ticker,ColorMatrixFilter } from "pixi.js";
import { Manager } from "../../system/Manager";
import * as PIXI from 'pixi.js';


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
  minHeight2 = Manager.height - 100; 
  minHeight3 = Manager.height-100; 
  

  constructor() {
    super();
    this.container = new Container();
    this.createMeteorMin(10);
    this.createMeteorNormal(20);
    this.createMeteorMax(40);
    Ticker.shared.add(this.update, this);
    // this.initialScore = score;
  }
  
  createMeteorMin(score) {
    const meteorsMins = ["MeteorMin"];
    this.meteorMin = new AnimatedSprite(meteorsMins.map((frame) => Texture.from(frame)));
    this.container.addChild(this.meteorMin);
    this.meteorMin.anchor.set(0.5)
    this.meteorMin.rotation = 0
    this.meteorMin.x = Math.random() < 0.5 ? 0 : Manager.width; 
    this.meteorMin.y = Math.random() * (Manager.height/2 - this.meteorMin.height); 
    // this.meteorMin.score = scoreMin;
    // Các dòng mã khác...

    // Tạo bộ lọc màu cho thiên thạch
    const meteorTintFilter = new ColorMatrixFilter();
    meteorTintFilter.tint(0x00FF00); // Màu xanh lá
    this.meteorMin.filters = [meteorTintFilter];


    const numberTintFilter = new ColorMatrixFilter();
    numberTintFilter.tint(0x000000); 
  
    const point = new PIXI.Text(score.toString(), { fill: "white", fontSize: 20 });
    point.anchor.set(0.5);
    point.position.set(0,0);
    point.filters = [numberTintFilter];
    this.meteorMin.addChild(point);
  }

  createMeteorNormal(score) {
    const meteorsNormals = ["MeteorNor"];
    this.meteorNormal = new AnimatedSprite(meteorsNormals.map((frame) => Texture.from(frame)));
    this.container.addChild(this.meteorNormal);
    this.meteorNormal.x = Math.random() < 0.5 ? 0 : Manager.width
    this.meteorNormal.y = Math.random() * (Manager.height/2 - this.meteorNormal.height); 
    this.meteorNormal.anchor.set(0.5)
    this.meteorNormal.rotation = 0
    const meteorTintFilter = new ColorMatrixFilter();
    meteorTintFilter.tint(0x0000FF); 
    this.meteorNormal.filters = [meteorTintFilter];

  
    const numberTintFilter = new ColorMatrixFilter();
    numberTintFilter.tint(0x000000);
    const point = new PIXI.Text(score.toString(), { fill: "white", fontSize: 40 });


    point.anchor.set(0.5);
    point.position.set(0,0);
    point.filters = [numberTintFilter];
    this.meteorNormal.addChild(point);
  }

  createMeteorMax(score) {
    const meteorsMaxs = ["MeteorMax"];
    this.meteorMax = new AnimatedSprite(meteorsMaxs.map((frame) => Texture.from(frame)));
    this.container.addChild(this.meteorMax);
    this.meteorMax.x = Math.random() < 0.5 ? 0 : Manager.width;
    this.meteorMax.y = Math.random() * (Manager.height/3 - this.meteorMax.height); 
    // this.meteorMax.score = scoreMax;

    this.meteorMax.anchor.set(0.5)
    this.meteorMax.rotation = 0
    const meteorTintFilter = new ColorMatrixFilter();
    meteorTintFilter.tint(0xFF0000); 
    this.meteorMax.filters = [meteorTintFilter];

  
    const numberTintFilter = new ColorMatrixFilter();
    numberTintFilter.tint(0x000000);
    const point = new PIXI.Text(score.toString(), { fill: "white", fontSize: 60 });
    console.log(point)
  console.log(score)
    point.anchor.set(0.5);
    point.position.set(0,0);
    point.filters = [numberTintFilter];
    this.meteorMax.addChild(point);
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
    this.meteorMin.rotation +=0.01*deltatime
    this.meteorNormal.rotation +=0.01*deltatime
    this.meteorMax.rotation +=0.01*deltatime
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
      if (this.meteorNormal.y <= this.maxHeight+100) {
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
