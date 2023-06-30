import { Container, Ticker, Texture } from 'pixi.js';
import { GameScreen } from '../script/screen/GameScreen';
import { Canon } from '../script/game/Canon';
import { Bullet } from '../script/game/Bullet';
import { Manager } from './Manager';
import { Meteor } from '../script/game/Meteor';
import { PointText } from '../script/game/BitmapText';
import { ResultScene } from '../script/screen/ResultScene';
import { StarGame } from '../script/screen/StartGame';
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
        // //Event
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        Ticker.shared.add(this.update, this);
    }
    createStartGame() {
        this.startGame = new StarGame();

        this.startGame.on('play', () => {
            console.log('Clicked on play button');
            this.started = true;
            this.createMeteor();
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
    createMeteor() {
        this.meteorContainer = new Container();
        this.meteors = [];
        this.setIntervalMeteorMin = setInterval(() => {
            const meteorMin = new Meteor();
            this.meteorMin = meteorMin.meteorSpriteMin;
            this.meteors.push(meteorMin);
            this.meteorContainer.addChild(this.meteorMin);
        }, 1000);
        this.setIntervalMeteorNormal = setInterval(() => {
            const meteorNormal = new Meteor();
            this.meteorNormal = meteorNormal.meteorSpriteNormal;
            this.meteors.push(meteorNormal);
            this.meteorContainer.addChild(this.meteorNormal);
        }, 2000);
        this.setIntervalMeteorMax = setInterval(() => {
            const meteorMax = new Meteor();
            this.meteorMax = meteorMax.meteorSpriteMax;
            this.meteors.push(meteorMax);
            this.meteorContainer.addChild(this.meteorMax);
        }, 3000);

        const meteorMax = new Meteor();
        this.meteorMax = meteorMax.meteorSpriteMax;
        this.meteorContainer.addChild(this.meteorMax);

        this.addChild(this.meteorContainer);
        this.meteorContainer.zIndex = 100;
    }
    createPoint() {
        this.bitmapTextContainer = new Container();
        const pointText = new PointText();
        this.bitmapText = pointText.BitmapTextSprite;
        this.bitmapTextContainer.addChild(this.bitmapText);
        this.addChild(this.bitmapTextContainer);
    }

    update(framesPassed) {
        //xử lý di chuyển
        this.handleMove();
        //xử lý khung hình
        this.handleFrame(framesPassed);
        //xử lý bắn
        this.handleShoot(framesPassed);
        //xử lý va chạm
        if (this.started) this.handleCollide(framesPassed);
    }

    handleMove() {
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.canonContainer.x -= 5;
            this.tireCanon.rotation += 1;
            this.tireCanon2.rotation += 1;
        }
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.canonContainer.x += 5;
            this.tireCanon.rotation += 1;
            this.tireCanon2.rotation += 1;
        }
    }
    handleShoot(framesPassed) {
        const currentTime = Date.now();
        if (this.keys['a'] || this.keys['d']) {
            // Tính toán khoảng cách giữa thời điểm bắn đạn cuối cùng và thời điểm hiện tại
            const timeSinceLastShoot = currentTime - this.lastShootTime;
            if (timeSinceLastShoot >= this.shootInterval) {
                // Bắn đạn
                const texture = Texture.from('/assets/images/missile.png');
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
    handleFrame(framesPassed) {
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
                        j < this.meteorContainer.children.length;
                        j++
                    ) {
                        const meteor = this.meteorContainer.children[j];
                        const _bullet = bullet.getBounds();
                        const _meteor = meteor.getBounds();
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
                                // Xử lý khi đạn va chạm với thiên thạch
                                this.collisionCount += 1;
                                this.bitmapText.collisionCount =
                                    this.collisionCount;
                                this.bitmapText.text =
                                    'Point: ' + this.collisionCount;
                                this.bulletsContainer.removeChild(bullet);
                                this.meteorContainer.removeChild(meteor);
                                // điều kiện thắng
                                if (
                                    this.collisionCount >= 20 &&
                                    !this.resultDisplayed
                                ) {
                                    clearInterval(this.setIntervalMeteorMin);
                                    clearInterval(this.setIntervalMeteorNormal);
                                    clearInterval(this.setIntervalMeteorMax);
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
                for (let j = 0; j < this.meteorContainer.children.length; j++) {
                    const meteor = this.meteorContainer.children[j];
                    var _canon = canon.getBounds();
                    var _meteor = meteor.getBounds();

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
                            Ticker.shared.stop();
                            this.resultDisplayed = true;
                            this.resultScene = new ResultScene(
                                result,
                                this.collisionCount,
                            );
                            this.resultScene.on('replay', () => {
                                this.startNewGame();
                            });
                            this.addChild(this.resultScene.container);
                            clearInterval(this.setIntervalMeteorMin);
                            clearInterval(this.setIntervalMeteorNormal);
                            clearInterval(this.setIntervalMeteorMax);
                        }
                    }
                }
            }
        }
    }
    startNewGame() {
        //xóa thiên thạch cũ
        this.meteorContainer.removeChildren();
        this.meteors = [];

        for (let i = 0; i < this.meteorContainer.children.length; i++) {
            const meteor = this.meteorContainer.children[i];
            this.meteorContainer.removeChild(meteor);
        }
        for (let i = 0; i < this.bulletsContainer.children.length; i++) {
            const bullet = this.bulletsContainer.children[i];
            this.bulletsContainer.removeChild(bullet);
        }

        // Reset các giá trị về mặc định
        this.collisionCount = 0;
        this.bitmapText.collisionCount = 0;
        this.bitmapText.text = 'Point: 0';
        this.resultDisplayed = false;

        // //tạo thiên thạch mới
        this.setIntervalMeteorMin = setInterval(() => {
            const meteorMin = new Meteor();
            this.meteorMin = meteorMin.meteorSpriteMin;
            this.meteors.push(meteorMin);
            this.meteorContainer.addChild(this.meteorMin);
        }, 1000);
        this.setIntervalMeteorNormal = setInterval(() => {
            const meteorNormal = new Meteor();
            this.meteorNormal = meteorNormal.meteorSpriteNormal;
            this.meteors.push(meteorNormal);
            this.meteorContainer.addChild(this.meteorNormal);
        }, 2000);
        this.setIntervalMeteorMax = setInterval(() => {
            const meteorMax = new Meteor();
            this.meteorMax = meteorMax.meteorSpriteMax;
            this.meteors.push(meteorMax);
            this.meteorContainer.addChild(this.meteorMax);
        }, 3000);
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
    resize() {}
}
