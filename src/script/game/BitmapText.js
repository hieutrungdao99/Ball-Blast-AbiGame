import { BitmapText, Container, BitmapFont } from 'pixi.js';

export class PointText extends Container {
    constructor() {
        super();
        this.createBitmapText();
        // this.collisionCount = 0;
    }

    createBitmapText() {
        BitmapFont.from('Roboto', {
            fontFamily: 'Arial',
            fontSize: 40,
            fill: 'red',
        });

        const bitmapText = new BitmapText(`Score:+ 0`, {
            fontName: 'Roboto',
            align: 'right',
        });
        this.bitmapText = bitmapText;
    }

    get BitmapTextSprite() {
        return this.bitmapText;
    }
}
