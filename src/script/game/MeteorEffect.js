import emitter from '../../../assets/particles/emitter.json'
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Texture } from 'pixi.js';
export class MeteorEffect {
    constructor(parent) {
        this.parent = parent;
        this.BreakEffect()

    }
    BreakEffect() {
        let texture = Texture.from('BreakMeteorEffect')
        this.emitter = new Emitter(this.parent, upgradeConfig(emitter, [texture]))
        this.emitter.emit = false;
        this.emitter.autoUpdate = true;
    }

    update() {
        this.emitter.update();
    }
    _breakEffect() {
        this.emitter.emit = true;
    }
}