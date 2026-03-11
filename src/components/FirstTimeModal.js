import Cookies from "js-cookie";
import {useEffect, useState} from "react";

function FirstTimeModal() {
    const [isFirstTime] = useState(Cookies.get("isFirstTime")??true)
    const [Modal, setModal] = useState(null)

    useEffect(() => {
        if (isFirstTime === "false") {
            setModal("")
        } else {
            setModal(
                <div className="modal-backdrop">
                    <div className="firstTimeModal" role="dialog" aria-labelledby="welcome-heading">
                        <h1 id="welcome-heading">Welcome</h1>
                        <p className="modal-body">
                            A curated collection of quality principles for software
                            development&nbsp;— explore, share, and take one with you.
                        </p>
                        <p className="modal-hint"><i>you won't see this message again</i></p>
                        <button className="modal-cta" onClick={() => {
                            setModal("")
                            Cookies.set("isFirstTime", "false")
                        }}>Let me in!
                        </button>
                    </div>
                </div>
            )
        }
    }, [isFirstTime]);

    return Modal
}

export default FirstTimeModal