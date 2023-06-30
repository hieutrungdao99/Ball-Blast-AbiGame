import { Container, Sprite, TextStyle, Text, Texture } from 'pixi.js';
import { Manager } from '../../system/Manager';
import { EventEmitter } from 'events';

export class StarGame extends EventEmitter {
    constructor() {
        super();
        this.container = new Container();
        this.createStart();
    }

    createStart() {
        const bgTexture = Texture.from('/assets/images/bgresult.png');
        const onresultStart = new Sprite(bgTexture);
        onresultStart.width = 500;
        onresultStart.height = 500;
        onresultStart.anchor.set(0.5);
        onresultStart.x = Manager.width / 2;
        onresultStart.y = Manager.height / 2;
        this.container.addChild(onresultStart);

        const playTexture = Texture.from('/assets/images/play.png');
        const playButton = new Sprite(playTexture);
        playButton.anchor.set(0.5);
        playButton.width = 150;
        playButton.height = 150;
        playButton.x = Manager.width / 2;
        playButton.y = Manager.height / 2 + 100;
        playButton.eventMode = 'static';
        playButton.buttonMode = true;
        playButton.on('pointerdown', () => {
            this.emit('play');
        });
        this.container.addChild(playButton);

        const textStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 34,
            fill: '#ffffff',
        });

        const resultText = new Text('Tap to play', textStyle);
        resultText.anchor.set(0.5);
        resultText.x = Manager.width / 2;
        resultText.y = Manager.height / 2 - 100;
        this.container.addChild(resultText);
    }

    update() {}

    get ResultStartSprite() {
        return this.onresultStart;
    }
}
