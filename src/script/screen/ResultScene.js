import {
    Container,
    Sprite,
    TextStyle,
    Text,
    Texture,
    BitmapFont,
    BitmapText,
} from 'pixi.js';
import { Manager } from '../../system/Manager';
import { EventEmitter } from 'events';

export class ResultScene extends EventEmitter {
    constructor(win, score, result) {
        super();
        this.container = new Container();
        this.createResult(win, score, result);
    }

    createResult(win, score, result) {
        const bgTexture = '/assets/images/bgresult.png';
        const onresult = Sprite.from(bgTexture);
        onresult.width = 500;
        onresult.height = 500;
        onresult.anchor.set(0.5);
        onresult.x = Manager.width / 2;
        onresult.y = Manager.height / 2;
        this.container.addChild(onresult);

        BitmapFont.from('Desyrel', {
            fontFamily: 'Arial',
            fontSize: 50,
            fill: 'red',
        });

        const bitmap = new BitmapText(`Score: ${score}`, {
            fontName: 'Desyrel',
            align: 'right',
        });
        bitmap.x = Manager.width / 2 - 80;
        bitmap.y = Manager.height / 2 - 50;
        this.container.addChild(bitmap);

        const replayTexture = Texture.from(
            win ? '/assets/images/play.png' : '/assets/images/replay.png',
        );
        const replayButton = new Sprite(replayTexture);
        replayButton.anchor.set(0.5);
        replayButton.width = 150;
        replayButton.height = 150;
        replayButton.x = Manager.width / 2;
        replayButton.y = Manager.height / 2 + 100;
        replayButton.eventMode = 'static';
        replayButton.buttonMode = true;
        replayButton.on('pointerdown', () => {
            this.emit('replay');
        });
        this.container.addChild(replayButton);

        const textStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 34,
            fill: '#ffffff',
        });

        const resultText = new Text(win ? 'You Win!' : 'You lose!', textStyle);
        resultText.anchor.set(0.5);
        resultText.x = Manager.width / 2;
        resultText.y = Manager.height / 2 - 100;
        this.container.addChild(resultText);
    }

    get ResultSprite() {
        return this.onresult;
    }
}
