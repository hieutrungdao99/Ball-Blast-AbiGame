import { Container, Assets, Graphics } from "pixi.js"
import { manifest } from "../utils/assets"
import { Manager } from "./Manager"
import { GameScene } from "./GameScene"

export class LoaderScene extends Container {
  constructor() {
    super();
    // lets make a loader graphic:
    const loaderBarWidth = Manager.width * 0.8; // just an auxiliary variable
    // the fill of the bar.
    this.loaderBarFill = new Graphics();
    this.loaderBarFill.beginFill(0x008800, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0; // we draw the filled bar and with scale we set the %

    // The border of the bar.
    this.loaderBarBoder = new Graphics();
    this.loaderBarBoder.lineStyle(10, 0x0, 1);
    this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

    // Now we keep the border and the fill in a container so we can move them together.
    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    //Looks complex but this just centers the bar on screen.
    this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y =
        (Manager.height - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);

    this.initializeLoader().then(() => {
        this.gameLoaded();
        // InputManager.init(Manager.instance.game.view);
    });
}

  async initializeLoader() {
    await Assets.init({ manifest: manifest })
    const bundleIds = manifest.bundles.map(bundle => bundle.name)
    await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this))
  }

  downloadProgress(progressRatio) {
    this.loaderBarFill.scale.x = progressRatio;
  }

  gameLoaded() {
    // Change scene to the game scene!
    Manager.changeScene(new GameScene())
  }
  update() {}
  resize() {}
}
