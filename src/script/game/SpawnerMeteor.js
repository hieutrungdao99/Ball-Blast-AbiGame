import { Manager } from "../../system/Manager";
import { Meteor, meteor1 } from "./MeteorObj";
import { MeteorNormalHandle } from "./MeteorObj";
import { MeteorMaxHandle } from "./MeteorObj";
export class Spawner {
    constructor() {

        const spawnInterval = 1000;
        this.maxSpawns = 5;
        this.spawns = [];
        this.isStopped = false;
        setInterval(() => this.spawn(), spawnInterval);
    }
    spawn() {
      
        // console.log(this.spawns.length);
        if (this.spawns.length < this.maxSpawns) {
            const rand = Math.floor(Math.random() * 100) + 1;
            let spawn = new Meteor(rand);
            this.spawns.push(spawn);
        }
    }
    stop() {
        clearInterval(this.spawnInterval);
    }
}