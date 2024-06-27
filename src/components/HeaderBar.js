import {CopyIcon, LinkedinIcon, ListIcon, TwitterIcon} from "../resources/Icons";
import '../styles/HeaderBar.css'
function HeaderBar({principle}) {
    const buildTweet = () => {
        let result = new URL("/intent/tweet", "https://x.com")
        result.searchParams.append("text", principle.title + "\n")
        result.searchParams.append("url", principle.url)
        result.searchParams.append("via", "vdlgeert")
        result.searchParams.append("hashtags", "qualityPrinciples")

        return result.toString()
    };

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
            <a className={"icon"} href={buildTweet()} rel="noreferrer" target="_blank"><TwitterIcon/></a>
            <a className={"icon"} href={buildLinkedIn()} rel="noreferrer" target="_blank"><LinkedinIcon/></a>
            <div className={"icon"} onClick={() => navigator.clipboard.writeText(principle.url)}>
                <CopyIcon/>
            </div>
        </div>
    }
    const overviewPageSocials = () => {
        return <div className={"rightAlign"}>
            <div className={"icon"} onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <CopyIcon/>
            </div>
        </div>

    }

    return <div className={"headerBar"}>
        <div className={"leftAlign"}>
            <h1><a className={"HeaderTitle"} href={"/"}  target="_parent">Quality Principles</a></h1>
            <a className={"icon"} href={"/overview"} target="_parent"> <ListIcon classname={"icon"}/></a>
        </div>
        {(window.location.pathname !== "/overview") ?
            homePageSocials()
            : overviewPageSocials()}
    </div>
}

export default HeaderBar;