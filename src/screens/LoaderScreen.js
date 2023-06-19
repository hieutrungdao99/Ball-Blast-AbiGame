import { Container, Assets } from "pixi.js"
import { manifest } from "../../assets/assets"
import { Manager } from "./Manager"
import { GameScene } from "./GameScreen"
import { LoadingBarContainer } from "../game/LoadingBar"

export class LoaderScene extends Container {
  constructor() {
    super()

    const loaderBarWidth = 280
    this._loadingBar = new LoadingBarContainer(
      loaderBarWidth,
      Manager.width,
      Manager.height
    )
    this.addChild(this._loadingBar)

    this.initializeLoader().then(() => {
      this.gameLoaded()
    })
  }

  async initializeLoader() {
    await Assets.init({ manifest: manifest })
    const bundleIds = manifest.bundles.map(bundle => bundle.name)
    await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this))
  }

  downloadProgress(progressRatio) {
    this._loadingBar.scaleProgress(progressRatio)
  }

  gameLoaded() {
    // Change scene to the game scene!
    Manager.changeScene(new GameScene())
  }
  update() { }
  resize() { }
}
