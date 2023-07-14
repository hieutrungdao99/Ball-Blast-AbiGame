import { Container, Ticker, Texture, AnimatedSprite } from 'pixi.js';
import { GameScreen } from '../script/screen/GameScreen';
import { Canon } from '../script/game/Canon';
import { Bullet } from '../script/game/Bullet';
import { Manager } from './Manager';
import { PointText } from '../script/game/BitmapText';
import { ResultScene } from '../script/screen/ResultScene';
import { StarGame } from '../script/screen/StartGame';
import { Spawner } from '../script/game/SpawnerMeteor';
import { bgm, sfx, audio } from '../utils/Sound';
import { AABBCollision } from '../utils/collision';
import { Meteor2 } from '../script/game/MeteorObj2';
import { Meteor } from '../script/game/MeteorObj';
import { CanonEffect } from '../script/game/CanonEffect';
import { MeteorEffect } from '../script/game/MeteorEffect';

export class GameScene extends Container {
    keys = {};
    minX;
    maxX;
    constructor() {
        super();
        this.started = false;
        this.createBackground();
        this.createStartGame();
        this.createCannon();
        this.effectCanon();
        this.effectMeteor();
        this.sortChildren();
        this.createPoint();
        this.collisionCount = 0;
        this.space = 5;
        this.lastShootTime = 0;
        this.shootInterval = 150; //khoang cach dan
        this.resultDisplayed = false;
        this.meteorSpawner = new Spawner();
        this.pointerIsDown = false;
        // this.position.x = Manager.width / 2;
        // this.position.y = Manager.height / 2;
        document.addEventListener('pointerdown', () => {
            this.pointerIsDown = true;
        });
        let previousX = null;
        document.addEventListener('pointerup', () => {
            this.pointerIsDown = false;
            previousX = null;
        });
        Ticker.shared.add(this.update, this);
    }
    createStartGame() {
        this.startGame = new StarGame();

        this.startGame.on('play', () => {
            this.started = true;
            this.handleMove();
            // this.createMeteor();
            this.startNewGame();
            this.removeChild(this.startGame.container);
        });
        this.addChild(this.startGame.container);
    }
    createBackground() {
        // Create Background
        const background = new GameScreen();
        this.backgroundContainer = new Container();

        this.bg = background.backgroundSprite;
        this.bg.zIndex = 1;
        this.bg2 = background.backgroundSprite2;
        this.bg2.zIndex = 2;
        this.backgroundContainer.addChild(this.bg);
        this.backgroundContainer.addChild(this.bg2);
        // this.bg.anchor.set(0.5)
        // this.bg2.anchor.set(0.5)
        this.backgroundContainer.zIndex = 0;
        this.backgroundContainer.sortChildren();
        this.addChild(this.backgroundContainer);
    }
    createCannon() {
        // Create Canon
        const canon = new Canon();
        this.canonContainer = new Container();
        this._canonSprite = canon.canonSprite;
        this.canonContainer.addChild(this._canonSprite);
        this._canonSprite.zIndex = 10;
        //Create TireCanon
        this.tireCanon = canon.tireCanonSprite;
        this.canonContainer.addChild(this.tireCanon);
        this.tireCanon.zIndex = 10;
        this.tireCanon2 = canon.tireCanonSprite2;
        this.tireCanon2.zIndex = 10;
        this.canonContainer.addChild(this.tireCanon2);
        this.canonContainer.sortChildren();

        this.bulletsContainer = new Container();
        this.addChild(this.bulletsContainer);
        this.canonContainer.zIndex = 100;
        this.addChild(this.canonContainer);

    }
    createPoint() {
        this.bitmapTextContainer = new Container();
        const pointText = new PointText();
        this.bitmapText = pointText.BitmapTextSprite;
        this.bitmapTextContainer.addChild(this.bitmapText);
        this.addChild(this.bitmapTextContainer);
    }
    update(framesPassed) {
        //xử lý khung hình
        this.handleFrame(framesPassed);
        if (this.started) {
            //xử lý bắn
            this.handleShoot(framesPassed);
            //xử lý va chạm
            this.handleCollide(framesPassed);
            this.meteorSpawner.spawns.forEach((meteor) => {
                this.addChild(meteor);
                meteor.update();
            });
        }
        this.effect.update()
        this.effect2.update2()
        this.effect3.update()
    }

    handleMove() {
        let previousX = null;

        document.addEventListener('pointermove', (event) => {
            if (this.pointerIsDown) {
                sfx.play('Shoot', { volume: 0.1 });
                if (previousX !== null) {
                    const distanceX = event.pageX - previousX;
                    this.moveCanon(distanceX);
                }
                previousX = event.pageX;

            }

        });

    }

    moveCanon(distanceX) {
        this.canonContainer.x += distanceX;
        this.tireCanon.rotation += distanceX * 0.1;
        this.tireCanon2.rotation += distanceX * 0.1;
    }
    handleShoot(framesPassed) {
        const currentTime = Date.now();
        if (this.pointerIsDown) {
            const timeSinceLastShoot = currentTime - this.lastShootTime;
            if (timeSinceLastShoot >= this.shootInterval) {
                // Bắn đạn
                const texture = Texture.from('Bullet');
                const bullet = new Bullet(
                    texture,
                    this._canonSprite.x + this.canonContainer.x,
                    this._canonSprite.y - 40,
                    10, //speed
                    0.7, //scale
                );
                this.bulletsContainer.addChild(bullet);
                this.lastShootTime = currentTime;
            }
            this.effect.onPointerDown();
        }
        for (let i = 0; i < this.bulletsContainer.children.length; i++) {
            const bullet = this.bulletsContainer.children[i];
            bullet.update(framesPassed);
            if (bullet.y < -bullet.height) {
                this.bulletsContainer.removeChild(bullet);
            }
        }
    }
    handleFrame(framesPassed, result) {
        if (this.canonContainer.x < this.minX) {
            this.canonContainer.x = this.minX;
        } else if (this.canonContainer.x > this.maxX) {
            this.canonContainer.x = this.maxX;
        }
        this.bg.tilePosition.x -= 2 * framesPassed;
        this.minX = -Manager.width / 2 + this.tireCanon.width;
        this.maxX = Manager.width / 2 - this.tireCanon.width;
    }
    handleCollide(framesPassed, result) {
        for (let i = 0; i < this.bulletsContainer.children.length; i++) {
            const bullet = this.bulletsContainer.children[i];
            if (bullet) {
                bullet.update(framesPassed);
                if (bullet.y < -bullet.height) {
                    this.bulletsContainer.removeChild(bullet);
                } else {
                    for (let j = 0; j < this.meteorSpawner.spawns.length; j++) {
                        const meteor = this.meteorSpawner.spawns[j];
                        let _bullet = bullet.getBounds();
                        let _meteor = meteor.getBounds();
                        if (meteor) {
                            if (
                                AABBCollision(_bullet, _meteor)
                            ) {
                                sfx.play('Hit', { volume: 1 });
                                meteor.value--;
                                if (meteor.value <= 0) {
                                    this.meteorSpawner.spawns.splice(j, 1);
                                    this.removeChild(meteor);
                                    this.effect3._breakEffect()
                                    this.type = new Spawner(meteor.type)
                                    if (meteor.type === "meteorNor") {
                                        // console.log(2);
                                        // this.meteorMin1 = new Meteor(2);
                                        // this.meteorMin2 = new Meteor(2);

                                        // this.meteorSpawner.addChild(this.meteorMin1)
                                        // this.meteorSpawner.spawns.push(this.meteorMin2);

                                        // this.meteorSpawner.addChild(this.meteorMin1)
                                        // this.meteorSpawner.spawns.push(this.meteorMin2);
                                        // console.log(this.meteorSpawner.spawn.length);
                                    }
                                }

                                this.bulletsContainer.removeChild(bullet);
                                this.collisionCount += 1;
                                this.bitmapText.collisionCount =
                                    this.collisionCount;
                                this.bitmapText.text = `Score: + (${this.collisionCount})`;

                                // điều kiện thắng
                                if (
                                    this.collisionCount >= 200 &&
                                    !this.resultDisplayed
                                ) {
                                    if (this.started) {
                                        for (
                                            let i = 0;
                                            i <
                                            this.meteorSpawner.spawns.length;
                                            i++
                                        ) {
                                            const meteor =
                                                this.meteorSpawner.spawns[i];
                                            this.removeChild(meteor);
                                        }
                                        this.meteorSpawner.spawns = [];
                                        this.started = false;
                                    }
                                    this.resultDisplayed = true;
                                    this.resultScene = new ResultScene(
                                        'win',
                                        result,
                                    );
                                    this.resultScene = new ResultScene(
                                        true,
                                        this.collisionCount,
                                    );
                                    this.resultScene.on('replay', () => {
                                        this.startNewGame();
                                    });
                                    this.addChild(this.resultScene.container);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!this.resultDisplayed) {
            for (let i = 0; i < this.canonContainer.children.length; i++) {
                const canon = this.canonContainer.children[i];
                for (let j = 0; j < this.meteorSpawner.spawns.length; j++) {
                    const meteor = this.meteorSpawner.spawns[j];
                    let _canon = this._canonSprite.getBounds();
                    let _meteor = meteor.getBounds();
                    if (meteor) {
                        if (
                            AABBCollision(_canon, _meteor)
                        ) {
                            if (this.started) {
                                for (
                                    let i = 0;
                                    i < this.meteorSpawner.spawns.length;
                                    i++
                                ) {
                                    sfx.play('Dead')
                                    this.effect2._deadEffect()
                                    // this._canonSprite.scale.x = 1
                                    const meteor = this.meteorSpawner.spawns[i];
                                    this.removeChild(meteor);
                                }
                                this.meteorSpawner.spawns = [];
                                this.started = false;
                                // audio.muted(true);
                            }
                            this.resultDisplayed = true;
                            this.resultScene = new ResultScene(
                                result,
                                this.collisionCount,
                            );
                            this.resultScene.on('replay', () => {
                                this.startNewGame();
                                audio.muted(false);
                            });
                            this.addChild(this.resultScene.container);
                            this.canonContainer.removeChild(this.tireCanon);
                            this.canonContainer.removeChild(this.tireCanon2);
                        }
                    }
                }
            }
        }
    }
    startNewGame() {
        for (let i = 0; i < this.meteorSpawner.spawns.length; i++) {
            const meteor = this.meteorSpawner.spawns[i];
            this.removeChild(meteor);
        }
        this.meteorSpawner.spawns = [];

        // Xóa đạn
        for (let i = 0; i < this.bulletsContainer.children.length; i++) {
            const bullet = this.bulletsContainer.children[i];
            this.bulletsContainer.removeChild(bullet);
        }

        this.collisionCount = 0;
        this.bitmapText.collisionCount = 0;
        this.bitmapText.text = 'Score: 0';
        this.resultDisplayed = false;
        this.canonContainer.addChild(this.tireCanon)
        this.canonContainer.addChild(this.tireCanon2)
        this.started = true;

        if (this.resultScene) {
            this.removeChild(this.resultScene.container);
            this.resultScene = null;
        }

        Ticker.shared.start();
    }
    effectCanon() {
        this.effect = new CanonEffect(this.canonContainer);
        this.effect2 = new CanonEffect(this._canonSprite)
    }
    effectMeteor() {
        this.effect3 = new MeteorEffect(this.meteorSpawner)
    }

    resize() {
        this.backgroundContainer.width = Manager.width;
        this.backgroundContainer.height = Manager.height;


        this._canonSprite.x = Manager.width / 2;
        this._canonSprite.y = Manager.height - 100;

        this.tireCanon.x = this._canonSprite.x + 35;
        this.tireCanon.y = this._canonSprite.y + 40;

        this.tireCanon2.x = this._canonSprite.x - 40;
        this.tireCanon2.y = this._canonSprite.y + 40;

    }

}
