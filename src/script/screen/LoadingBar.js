import { Container, Graphics } from "pixi.js"

export class LoadingBarContainer extends Container {
  constructor(barWidth, parentWidth, parentHeight) {
    super()
    this._barWidth = barWidth
    this._barHeight = 48

    this._loaderBarBorder = new Graphics()

    const lineWidth = 4
    const lineColor = 0x000000
    const lineOpacity = 0
    this._loaderBarBorder.lineStyle(lineWidth, lineColor, lineOpacity)

    const barPosX = 0
    const barPosY = 0
    this._loaderBarBorder.drawRect(
      barPosX,
      barPosY,
      this._barWidth + 6,
      this._barHeight
    )

    this._loaderBar = new Container()
    this._loaderBar.addChild(this._loaderBarBorder)
    this._loaderBar.position.x = (parentWidth - this._loaderBar.width) / 2
    this._loaderBar.position.y = (parentHeight - this._loaderBar.height) / 2
    this.addChild(this._loaderBar)
  }

  scaleProgress(progress) {
    if (this._loaderProgress) {
      this._loaderBar.removeChild(this._loaderProgress)
      this._loaderProgress.destroy()
    }
    this._loaderProgress = this.makeRect(progress)
    this._loaderBar.addChild(this._loaderProgress)
  }

  resize(width, height) {
    this._loaderBar.position.x = (width - this._loaderBar.width) / 2
    this._loaderBar.position.y = (height - this._loaderBar.height) / 2
  }

  /**
   *
   * @param progress:number - line of loading the progress from 0.0 to 1.0
   * @returns rect:Graphics - drawing objects of pixi that fill the bar
   */
  makeRect(progress) {
    const percentLines = Math.floor((progress * 100) / 10)
    const padding = 6
    const pieceWidth = this._barWidth / 10 - padding
    const rect = new Graphics()

    //rect dimentions
    const rectPositionX = i => padding * (i + 1) + pieceWidth * i
    const rectPositionY = padding
    const rectWidth = pieceWidth
    const rectHeight = this._barHeight - 2 * padding

    // fill loading bar
    for (let i = 0; i < percentLines; ++i) {
      rect.beginFill(0xffff00 - i * 0x001100, 1)
      rect.drawRect(rectPositionX(i), rectPositionY, rectWidth, rectHeight)
      rect.endFill()
    }
    return rect
  }
}
