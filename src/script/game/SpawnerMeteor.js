import { Container } from "pixi.js";
import { Manager } from "../../system/Manager";
import { Meteor } from "./MeteorObj";
import { Meteor2 } from "./MeteorObj2";
import { Meteor3 } from "./MeteorObj3";

export class Spawner extends Container {
    constructor() {
        super();
        const spawnInterval = 1000;
        this.maxSpawns = 5;
        this.spawns = [];
        this.isStopped = false;
        setInterval(() => this.spawn(), spawnInterval);
    }
    randomType() {
        let randomType = Math.floor(Math.random() * 6) + 1;
        switch (randomType) {
            case 1:
                return "meteorMin";
                break;
            case 2:
                return "meteorNor";

                break;
            case 3:
                return "meteorMax";
                break;
            case 4:
                return "meteorMin";
                break;
            case 5:
                return "meteorMin";
                break;
            case 6:
                return "meteorNor";
                break;

            default:
                break;
        }
    }
    spawn() {

        // console.log(this.spawns.length);
        if (this.spawns.length < this.maxSpawns) {
            let spawn = null;
            this.type = this.randomType();
            switch (this.type) {
                case 'meteorMin':
                    spawn = new Meteor(5)
                    break;
                case 'meteorNor':
                    spawn = new Meteor2(10);

                    break;
                case 'meteorMax':
                    spawn = new Meteor3(15);
                    break;
                default:
                    break;
            }
            this.spawns.push(spawn);
        }

    }
    stop() {
        clearInterval(this.spawnInterval);
    }
}