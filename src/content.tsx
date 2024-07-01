import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

import { CountButton } from "~features/CountButton";
import DialogPopup from "~features/DialogPopup";
import action from '../assets/action.png';

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleDOMContentLoaded = () => {
      const node = document.getElementsByClassName('msg-form__msg-content-container--scrollable')[0];
      if (node) {
        const element = document.createElement("img");
        element.setAttribute("id", "openAiprompt");
        element.setAttribute("class", "cursor-pointer");
        element.style.position = "absolute";
        element.style.height = "30px";
        element.style.width = "30px";
        element.style.bottom = "5px";
        element.style.right = "5px";
        element.src = action;

        element.addEventListener('click', () => {
          setShowPrompt(true);
        });

        node.appendChild(element);
      }
    };

    // document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

    const intervalOccr = setInterval(() => {
      handleDOMContentLoaded()
      console.log('gola')
      let actionElement = document.getElementById('openAiprompt')
      if(actionElement) {
        clearInterval(intervalOccr)
      }
    }, 5000)

  

    
  }, []);

  return (
    <>
      {showPrompt && 
        <div className="z-50 flex fixed items-center justify-center top-0 right-0 h-[100vh] w-[100%] ">
          <div className="bg-slate-400 w-[inherit] h-[inherit] absolute opacity-50"></div>
          <DialogPopup close={() => setShowPrompt(false)} />
        </div>
      }
    </>
  );
};

export default PlasmoOverlay;
