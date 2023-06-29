import { BitmapText, Container, BitmapFont } from 'pixi.js';

export class PointText extends Container {
    constructor() {
        super();
        this.createBitmapText();
        // this.collisionCount = 0;
    }

    createBitmapText() {
        BitmapFont.from('Desyrel', {
            fontFamily: 'Arial',
            fontSize: 40,
            fill: 'red',
        });

        const bitmapText = new BitmapText('Point ' + '0', {
            fontName: 'Desyrel',
            align: 'right',
        });
        this.bitmapText = bitmapText;
    }

    get BitmapTextSprite() {
        return this.bitmapText;
    }
}
