import Cookies from "js-cookie";
import {useEffect, useState} from "react";

function FirstTimeModal() {
    const [isFirstTime] = useState(Cookies.get("isFirstTime")??true)
    const [Modal, setModal] = useState(null)

    useEffect(() => {
        if (isFirstTime === "false") {
            console.log("not first time")
            setModal("")
        } else {
            console.log(`isFirstTime= ${isFirstTime} `)
            setModal(
                <div className="firstTimeModal">
                    <h1>Welcome</h1>
                    <p>
                        These quality principles are here to help you improve a specific aspect of your development
                        process.
                        To convey a message and make it memorable they have a catchy phrase or acronym.
                        Don't take them as gospel, interpret them and apply them pragmatically.
                    </p>
                    <p><i>you won't see this message again</i></p>
                    <button className={"button"} onClick={() => {
                        setModal("")
                        Cookies.set("isFirstTime", "false")
                    }}>Let me in!
                    </button>
                </div>
            )
        }
    }, [isFirstTime]);

    return Modal
}

export default FirstTimeModal