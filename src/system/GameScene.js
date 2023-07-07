import { Container, Ticker, Texture, AnimatedSprite } from 'pixi.js';
import { GameScreen } from '../script/screen/GameScreen';
import { Canon } from '../script/game/Canon';
import { Bullet } from '../script/game/Bullet';
import { Manager } from './Manager';
import { PointText } from '../script/game/BitmapText';
import { ResultScene } from '../script/screen/ResultScene';
import { StarGame } from '../script/screen/StartGame';
import { Spawner } from '../script/game/SpawnerMeteor';
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
        this.sortChildren();
        this.createPoint();
        this.collisionCount = 0;
        this.space = 5;
        this.lastShootTime = 0;
        this.shootInterval = 150; //khoang cach dan
        this.resultDisplayed = false;
        this.meteorSpawner = new Spawner();

        // //Event
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        this.pointerIsDown = false;
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
        this._canonSprite.zIndex = 0;
        //Create TireCanon
        this.tireCanon = canon.tireCanonSprite;
        this.canonContainer.addChild(this.tireCanon);
        this.tireCanon.zIndex = 1;
        this.tireCanon2 = canon.tireCanonSprite2;
        this.tireCanon2.zIndex = 1;
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
    update(framesPassed, deltaTime) {


        //xử lý khung hình
        this.handleFrame(framesPassed);
        //xử lý bắn
        if (this.started){ this.handleShoot(framesPassed);}
        //xử lý va chạm
        if (this.started){this.handleCollide(framesPassed);
            this.meteorSpawner.spawns.forEach((meteor) => {
                this.addChild(meteor);
                meteor.update();
            });
    
        }

        
    }

    handleMove() {
        let previousX = null;

        document.addEventListener('pointermove', (event) => {
            if (this.pointerIsDown) {
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
            // Tính toán khoảng cách giữa thời điểm bắn đạn cuối cùng và thời điểm hiện tại
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
        }
        //xóa đạn khi vượt khỏi khung hình
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
                    for (
                        let j = 0;
                        j < this.meteorSpawner.spawns.length;
                        j++
                    ) {
                        const meteor = this.meteorSpawner.spawns[j];
                        let _bullet = bullet.getBounds();
                        let _meteor = meteor.getBounds();
                        if (meteor) {
                            if (
                                this.hitTestRectangle(
                                    _bullet.x,
                                    _bullet.y,
                                    bullet.width,
                                    bullet.height,
                                    _meteor.x,
                                    _meteor.y,
                                    meteor.width,
                                    meteor.height,
                                )
                            ) {


                                // console.log('hit')
                                this.meteorSpawner.spawns.splice(j, 1);
                                this.removeChild(meteor)
                                this.bulletsContainer.removeChild(bullet);

                               
                                this.collisionCount += 1;
                                this.bitmapText.collisionCount =
                                    this.collisionCount;
                                this.bitmapText.text = `Score: + (${this.collisionCount})`;

                                // điều kiện thắng
                                if (
                                    this.collisionCount >= 10 &&
                                    !this.resultDisplayed
                                ) {

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
                    let _canon = canon.getBounds();
                    let _meteor = meteor.getBounds();
                    if (meteor) {
                        if (
                            this.hitTestRectangle(
                                _canon.x,
                                _canon.y,
                                canon.width,
                                canon.height,
                                _meteor.x,
                                _meteor.y,
                                meteor.width,
                                meteor.height,
                            )
                        ) {
                            console.log('hit')
                           
                            Ticker.shared.stop();
                            this.resultDisplayed = true;
                            this.resultScene = new ResultScene(result, this.collisionCount,);
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
    startNewGame() {
        // xóa thiên thạch cũ
        this.meteorSpawner.spawns = [];
        for (let i = 0; i < this.meteorSpawner.spawns.length; i++) {
            const meteor = this.meteorSpawner.spawns[i];
            this.removeChild(meteor);
            this.meteorSpawner.removeSpawns();
            this.meteorSpawner.removeAllSpawns();

        }


        for (let i = 0; i < this.bulletsContainer.children.length; i++) {
            const bullet = this.bulletsContainer.children[i];
            this.bulletsContainer.removeChild(bullet);
        }

        // Reset các giá trị về mặc định
        this.collisionCount = 0;
        this.bitmapText.collisionCount = 0;
        this.bitmapText.text = 'Score: 0';
        this.resultDisplayed = false;

        //xóa màn kết quả
        if (this.resultScene) {
            this.removeChild(this.resultScene.container);
            this.resultScene = null;
        }

        // Khởi động lại trò chơi
        Ticker.shared.start();
    }

    hitTestRectangle(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
    }
    resize() { }
}