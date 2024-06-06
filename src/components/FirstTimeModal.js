import Cookies from "js-cookie";
import {useEffect, useState} from "react";

function FirstTimeModal({isFirstTimeProp}) {
    const [isFirstTime] = useState(isFirstTimeProp)
    const [Modal, setModal] = useState(null)
    const [ModalHTML] = useState (
        <div className="firstTimeModal">
            <h1>Welcome</h1>
            <p>
                These quality principles are here to help you improve a specific aspect of your development process.
                To convey a message and make it memorable they have a catchy phrase or acronym.
                Don't take them as gospel, interpret them and apply them pragmatically.
            </p>
            <p><i>you won't see this message again</i></p>
            <button className={"button"} onClick={() => {
                setModal("")
                Cookies.set("isFirstTime", "false")
            }}>Let me in!</button>
        </div>
    )

    useEffect(() => {
        if (isFirstTime === "false") {
            console.log("not first time")
            setModal("")
        }else{
            console.log(`isFirstTime= ${isFirstTime} `)
            setModal(ModalHTML)
        }
    }, [isFirstTime, ModalHTML]);

    return Modal
}

export default FirstTimeModal