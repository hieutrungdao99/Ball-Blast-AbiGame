import { Application } from "pixi.js"

export class Manager {
  constructor() {
    /*this class is purely static. No constructor to see here*/
  }

  // We no longer need to store width and height since now it is literally the size of the screen.
  // We just modify our getters
  static get width() {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
  }
  static get height() {
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )
  }

  // Use this function ONCE to start the entire machinery
  static initialize(background) {
    // Create our pixi app
    Manager.app = new Application({
      view: document.getElementById("pixi-canvas"),
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
      autoDensity: true,
      backgroundColor: background
    })

    // Add the ticker
    Manager.app.ticker.add(Manager.update)

    // listen for the browser telling us that the screen size changed
    window.addEventListener("resize", Manager.resize)
  }
  static resize() {
    // if we have a scene, we let it know that a resize happened!
    if (Manager.currentScene) {
      Manager.currentScene.resize(Manager.width, Manager.height)
    }
  }

  // Call this function when you want to go to a new scene
  static changeScene(newScene) {
    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene)
      Manager.currentScene.destroy()
    }

    // Add the new one
    Manager.currentScene = newScene
    Manager.app.stage.addChild(Manager.currentScene)
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  static update(framesPassed) {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
    if (Manager.currentScene) {
      Manager.currentScene.update(framesPassed)
    }
    // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
  }
}
