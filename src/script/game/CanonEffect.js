import breakCanon from '../../../assets/particles/breakCanon.json'
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Texture } from 'pixi.js';
export class CanonEffect {
    constructor(parent) {
        this.parent = parent;
        this.deadEffect();
    }

    deadEffect() {
        let texture = Texture.from('BreakCanonEffect')
        this.emitterDead = new Emitter(this.parent, upgradeConfig(breakCanon, [texture]))
        this.emitterDead.emit = false;
        this.emitterDead.autoUpdate = true;
    }
    update() {
        this.emitterDead.updateSpawnPos(this.parent.width / 2 + this.parent.width / 2 - 100, this.parent.height / 2);
        this.emitterDead.update();
    }
    _deadEffect() {
        this.emitterDead.emit = true;
    }
}