import { Container, Sprite } from "pixi.js";
import { Manager } from "../scene/Manager";

export class Game extends Container {
    constructor() {
        super()
        this.createClampy();
    }
    createClampy() {
        this.clampy = Sprite.from("Clampy")
        this.clampy.anchor.set(0.5)
        this.clampy.x = Manager.width / 2
        this.clampy.y = Manager.height / 2
        this.addChild(this.clampy)

        this.clampyVelocity = 5
    }
    update(framesPassed) {
        this.clampy.x += this.clampyVelocity * framesPassed

        if (this.clampy.x > Manager.width) {
            this.clampy.x = Manager.width
            this.clampyVelocity = -this.clampyVelocity
        }

        if (this.clampy.x < 0) {
            this.clampy.x = 0
            this.clampyVelocity = -this.clampyVelocity
        }
    }
}