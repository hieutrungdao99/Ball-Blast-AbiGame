import { Manager } from "./system/Manager"
import { LoaderScene } from "./system/LoaderScene"

Manager.initialize(0x1099bb)

// We no longer need to tell the scene the size because we can ask Manager!
const loady = new LoaderScene()
Manager.changeScene(loady)
