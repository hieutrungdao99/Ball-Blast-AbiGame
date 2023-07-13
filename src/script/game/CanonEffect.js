import fireCanon from '../../../assets/particles/fireCanon.json'
import breakCanon from '../../../assets/particles/breakCanon.json'
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Canon } from './Canon';
import { Container, Texture } from 'pixi.js';
export class CanonEffect {
    constructor(parent) {
        this.parent = parent;
        this.fireEffect()
        this.deadEffect();
    }
    fireEffect() {
        let texture = Texture.from('FireEffect')
        this.emitter = new Emitter(this.parent.parent, upgradeConfig(fireCanon, [texture]))
        this.emitter.emit = false;
        this.emitter.autoUpdate = true;
    }
    deadEffect() {
        let texture2 = Texture.from('BreakCanonEffect')
        this.emitterDead = new Emitter(this.parent, upgradeConfig(breakCanon, [texture2]))
        this.emitterDead.emit = false;
        this.emitterDead.autoUpdate = true;
    }
    update() {
        this.emitter.updateSpawnPos(this.parent.getBounds().x + this.parent.width / 2, this.parent.getBounds().y);
        this.emitter.update();
    }
    onPointerDown() {
        this.emitter.emit = true
    }
    onPointerUp() {
        this.emitter.emit = false;
    }
    update2() {
        this.emitterDead.updateSpawnPos(this.parent.width / 2 + this.parent.width / 2 - 100, this.parent.height / 2);
        this.emitterDead.update();
    }
    _deadEffect() {
        this.emitterDead.emit = true;
    }
}