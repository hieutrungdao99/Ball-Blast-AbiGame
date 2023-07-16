import { Application } from 'pixi.js';

export class Manager {
    constructor() {
        /*this class is purely static. No constructor to see here*/
    }
    // We no longer need to store width and height since now it is literally the size of the screen.
    // We just modify our getters
    static get width() {
        return 720;
    }
    static get height() {
        return 1280;
    }

    // Use this function ONCE to start the entire machinery
    static initialize(background) {
        // Create our pixi app
        Manager.app = new Application({
            view: document.getElementById('pixi-canvas'),
            width: Manager.width,
            height: Manager.height,
            autoDensity: true,
            backgroundColor: background,
        });
        globalThis.__PIXI_APP__ = Manager.app;

        // Add the ticker
        Manager.app.ticker.add(Manager.update);

        // listen for the browser telling us that the screen size changed
        window.addEventListener('resize', Manager.resize(window.innerWidth, window.innerHeight));
    }
    static resize() {
        let width = Manager.width;
        let height = Manager.height;
    
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
        // uniform scale for our game
        const scale = Math.min(screenWidth / width, screenHeight / height);
    
        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * width);
        const enlargedHeight = Math.floor(scale * height);
    
        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;
    
        // now we use css trickery to set the sizes and margins
        Manager.app.view.style.width = `${enlargedWidth}px`;
        Manager.app.view.style.height = `${enlargedHeight}px`;
        Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
        Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
    }
    

    // Call this function when you want to go to a new scene
    static changeScene(newScene) {
        // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        // Add the new one
        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    static update(framesPassed) {
        // Let the current scene know that we updated it...
        // Just for funzies, sanity check that it exists first.
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }
    }
}