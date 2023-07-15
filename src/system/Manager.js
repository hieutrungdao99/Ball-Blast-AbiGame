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
            // resolution: window.devicePixelRatio || 1,
            resizeTo: this.view,
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
    static resize(width, height) {
        let style = this.app.view.style;
        this.windowWidth = width;
        this.windowHeight = height;
        let ratio = Math.max(Manager.width / this.windowWidth, Manager.height / this.windowHeight);
        Manager.app.width = this.windowWidth * ratio;
        Manager.app.height = this.windowHeight * ratio;
        Manager.app.view.width = this.width;
        Manager.app.view.height = this.height;
        let scale = this.windowWidth / this.width;
        style.transformOrigin = "0px 0px";
        style.transform = `scale(${ scale })`;
        let vMargin = Math.floor((this.windowWidth - this.width * scale) / 2);
        let hMargin = Math.floor((this.windowHeight - this.height * scale) / 2);

        style.margin = `${ hMargin }px ${ vMargin }px ${ hMargin }px ${ vMargin }px`;
        Manager.app.resizeTo = Manager.app.view;
        Manager.app.resize();

        if (Manager.currentScene) {
            Manager.currentScene.resize(window.innerWidth, window.innerHeight);
        }
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