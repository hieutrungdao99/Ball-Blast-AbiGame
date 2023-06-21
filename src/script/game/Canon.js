import { Container,  Sprite } from "pixi.js";
import { Manager } from "../../system/Manager";

export class Canon {
    constructor(){
        // super()
        this.container = new Container();
        this.createCanon();
        this.getTireCanon();
    }
    createCanon(){
        this._canon =  Sprite.from('/assets/images/Canon.png')
        this._canon.width = 100;
        this._canon.height =100;
        this._canon.anchor.set(0.5)
        this._canon.x = Manager.width /2;
        this._canon.y = Manager.height  - 100;

        this.container.addChild(this._canon)
    }
    getTireCanon(){
        this.tireCanon =  Sprite.from('/assets/images/TireCanon.png')
        this.tireCanon.width = 50;
        this.tireCanon.height =50;
        // this.tireCanon.anchor.set(0.5)
        this.tireCanon.x = this._canon.x;
        this.tireCanon.y =  this._canon.y;

        this.container.addChild(this.tireCanon)
    }
    get canonSprite(){
        return this._canon;
    }
    get tireCanonSprite(){
        return this.tireCanon;
    }
}
