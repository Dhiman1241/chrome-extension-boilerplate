import { CountButton } from "~features/CountButton"
import DialogPopup from "~features/DialogPopup"

import "~style.css"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      {/* <CountButton /> */}
      <DialogPopup />
    </div>
  )
}

export default IndexPopup
