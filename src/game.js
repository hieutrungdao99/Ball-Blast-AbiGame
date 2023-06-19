import { Manager } from "./scene/Manager"
import { LoaderScene } from "./scene/LoaderScene"
import { BG_COLOR } from "../assets/assets"

Manager.initialize(BG_COLOR)

// We no longer need to tell the scene the size because we can ask Manager!
const loady = new LoaderScene()
Manager.changeScene(loady)
