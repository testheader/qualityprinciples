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
                        <div className="modal-icon" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </div>
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