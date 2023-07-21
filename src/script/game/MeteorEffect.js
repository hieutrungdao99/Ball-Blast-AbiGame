import breakMeteor from '../../../assets/particles/breakMeteor.json'
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Texture } from 'pixi.js';
export class MeteorEffect {
    constructor(parent) {
        this.parent = parent;
        this.BreakEffect()

    }
    BreakEffect() {
        let texture = Texture.from('BreakMeteorEffect')
        this.emitter = new Emitter(this.parent, upgradeConfig(breakMeteor, [texture]))
        this.emitter.emit = false;
        this.emitter.autoUpdate = true;
    }

    update() {
        // this.emitter.updateSpawnPos(this.parent.x, this.parent.y);
        this.emitter.update();
    }
    _breakEffect() {
        this.emitter.emit = true;
    }
}