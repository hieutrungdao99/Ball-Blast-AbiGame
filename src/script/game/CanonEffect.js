import fireCanon from '../../../assets/particles/fireCanon.json'
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Canon } from './Canon';
import { Container, Texture } from 'pixi.js';
export class CanonEffect {
    constructor(parent) {
        this.parent = parent;

        this.fireEffect()
    }
    fireEffect() {
        let texture = Texture.from('FireEffect')
        this.emitter = new Emitter(this.parent.parent, upgradeConfig(fireCanon, [texture]))
        console.log(this.parent.parent);
        this.emitter.emit = false;
        this.emitter.autoUpdate = true;
    }
    update() {
        console.log(this.parent.getBounds().y);
        console.log(this.parent.getBounds().x);
        this.emitter.updateSpawnPos(this.parent.getBounds().x + this.parent.width / 2, this.parent.getBounds().y);
        this.emitter.update();
    }
    onPointerDown() {
        this.emitter.emit = true
    }
    onPointerUp() {
        this.emitter.emit = false;
    }

}