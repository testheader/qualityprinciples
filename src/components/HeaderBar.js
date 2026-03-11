import {CopyIcon, LinkedinIcon, ListIcon} from "../resources/Icons";
import '../styles/HeaderBar.css'
import {useEffect, useState} from "react";
import {isMobile} from "react-device-detect";

function HeaderBar({principle}) {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsCopied(false), 2000);
        return () => clearTimeout(timeout);
    }, [isCopied]);


    const buildLinkedIn = () => {
        let result = new URL("share", "https://linkedin.com")
        let text =
            `Found this at ${principle.url}\n` +
            `${principle.title}\n\n` +
            `${principle.description}\n\n` +
            `sources: ${principle.source.map(a => " " + a)}\n`;

        result.searchParams.append("text", text)
        result.searchParams.append("url", principle.url)

        return result.toString()
    }

    const homePageSocials = () => {
        return <div className={"rightAlign"}>
            <a className={"icon"} data-testid="LinkedIn principle" href={buildLinkedIn()} rel="noreferrer" target="_blank"><LinkedinIcon/></a>
            <div role={"button"} data-testid="copy" className={`${isCopied? 'isCopied':''} icon`} onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText(principle.url).catch(() => {})
            }}>
                <CopyIcon/>
            </div>
        </div>
    }
    const overviewPageSocials = () => {
        return <div className={"rightAlign"}>
            <div className={"icon"} onClick={() => navigator.clipboard.writeText(window.location.href).catch(() => {})}>
                <CopyIcon/>
            </div>
        </div>

    }

    return <div className={"headerBar"}>
        <div className={"leftAlign"}>
            {isMobile ?'':<h1><a className={"HeaderTitle"} href={"/"} target="_parent">Quality Principles</a></h1>}
            <a data-testid={"open overview"} className={"icon"} href={"/overview"} target="_parent"> <ListIcon classname={"icon"}/></a>
        </div>
        {(window.location.pathname !== "/overview") ?
            homePageSocials()
            : overviewPageSocials()}
    </div>
}

export default HeaderBar;