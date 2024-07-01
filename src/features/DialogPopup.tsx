import React, { useEffect, useState } from 'react'
import generate from "../../assets/generate.png";
import regenerate from "../../assets/regenerate.png";
import insert from "../../assets/insert.png";

export default function DialogPopup(props:any) {
    const [inputText, setTextInput] = useState('')
    const [prompts, setPrompts] = useState([
        // { type: 'prompt', text: 'hello' },
        // { type: 'response', text: 'hello' }
    ])


    const generateResponse = () => {
        let reponseText = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask`;
        let payload = { type: 'response', text: reponseText }
        setPrompts((prev) => [...prev, payload])
        setTextInput('')
    }

    const askQuestion = () => {
        let payload = { type: 'prompt', text: inputText }
        setPrompts((prev) => [...prev, payload])
        setTimeout(() => {
            generateResponse()
        }, 1000);
    }
    const insertReplyToMessage = () => {
        const element = document.getElementsByClassName('msg-form__contenteditable')[0]
        const placeholderElement = document.getElementsByClassName('msg-form__placeholder')[0]
        if(element) {
            if(placeholderElement) {
                placeholderElement.classList.remove('msg-form__placeholder')
            }
            element.innerHTML = `<p> ${prompts.filter((el) => el.type == 'response')[0]?.text} </p>`;
            props.close()
        }
    }
    return (
        <div className='prompt-box rounded bg-white z-[99] opacity-100'>
            {prompts.map((el: any, index:number) => (
                (
                    <div key={index} className={el.type == 'prompt' ? 'user-prompt' : 'user-prompt-reply'}>{el.text.trim()}</div>
                )
            ))}

            <input onInput={(e) => setTextInput(e.target.value)} value={inputText} className="prompt-input border-solid border-2 border-grey-300 rounded-lg" type="text" placeholder="Your Prompt" />
            <div className="mt-6 text-end ">
                {prompts.filter((el) => el?.type == 'response').length > 0 ?
                    <>
                        <button onClick={insertReplyToMessage} className="btn-primary me-2 inline-flex flex-row items-center ms-auto w-auto">
                            <img style={{ width: 'auto', height: '24px' }} className="me-4" src={insert} />Insert
                        </button>
                        <button onClick={generateResponse} className="btn-primary me-2 inline-flex flex-row items-center ms-auto w-auto">
                            <img style={{ width: 'auto', height: '24px' }} className="me-4" src={regenerate} />Regenerate
                        </button>
                    </>
                    : <button onClick={askQuestion} disabled={inputText.trim() == ''} className="btn-primary inline-flex flex-row items-center ms-auto">
                        <img style={{ width: '24px', height: '24px' }} className="me-2 w-6 h-6" src={generate} />Generate
                    </button>
                }

            </div>
        </div>
    )
}
