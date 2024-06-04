import {isMobile} from "react-device-detect";
import principles from "./resources/principles.json";
import {useEffect, useState} from "react";

function Home({isOverviewActive}) {
    const CURRENT_URL = "https://qualityprinciples.netlify.app"

    const [overviewButton, setOverviewButton] = useState(null)

    useEffect(() => {
        setOverviewButton(isOverviewActive ? <a className="button action" href="/overview">All principles</a> : null);
    }, [isOverviewActive]);

    const getUrlWithIndex = () => {
        return CURRENT_URL+"?id=" + index
    }

    const getInitialIndexFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        let id = parseInt(params.get('id'), 10);
        let numberOfPrinciples = principles.principles.length

        if(id>numberOfPrinciples || !id){
            id = Math.floor(Math.random() * principles.principles.length);
        }

        return id;
    };

    const [index, setIndex] = useState(getInitialIndexFromUrl());
    const [showCopyMessage, setShowCopyMessage] = useState(false);

    const handleNextPrinciple = () => {
        const newIndex = principles.principles.length-1===index? 0 : index+1;
        setIndex(newIndex);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getUrlWithIndex())
            .then(() => {
                setShowCopyMessage(true);
                setTimeout(() => setShowCopyMessage(false), 2000);
            });
    }

    const renderSources= () => {
        return principles.principles[index].source.map(source => {
                if (source.includes("http")) {
                    return <a key={source} className={"source"} href={source} target="_blank"
                              rel="noreferrer">{source}<br/></a>
                }
                return <p className={"source"}>{source}</p>
            }
        )
    }

    const buildTweet = () => {
        let result = new URL("/intent/tweet", "https://x.com")
        result.searchParams.append("text", principles.principles[index].title + "\n")
        result.searchParams.append("url", getUrlWithIndex())
        result.searchParams.append("via", "vdlgeert")
        result.searchParams.append("hashtags", "qualityPrinciples")

        return result.toString()
    };

    const buildLinkedIn = () => {
        let result = new URL("share", "https://linkedin.com")
        let text =
            "Found this at " + getUrlWithIndex() + "\n" +
            principles.principles[index].title + "\n\n" +
            principles.principles[index].description + "\n\n" +
            "sources:" + principles.principles[index].source.map(a => " " + a) + "\n"

        result.searchParams.append("text", text)
        result.searchParams.append("url", getUrlWithIndex())

        return result.toString()
    }

    return <div>
        <div className={isMobile?"mobile-center-container":"center-container"}>
            <div className={isMobile?"":"principle-container"}>
                <h1>{principles.principles[index].title}</h1>
                <p className={`description ${isMobile ? 'mobile-description' : 'desktop-description'}`}>{principles.principles[index].description}</p>
                {renderSources()}
            </div>
        </div>
        <div className={isMobile ? "mobile-button-container" : "button-container"}>
            <div className={`button action`} onClick={handleNextPrinciple}>Next principle</div>
            {overviewButton}
            <div className={"spacer"}>Share this principle make the world a better place:</div>
            {!showCopyMessage && <div className={`button action`} onClick={copyToClipboard}> Copy URL </div>}
            {showCopyMessage && <div className={`button action copy-message`}>URL copied to clipboard!</div>}
            <div className="share-container">
                <a className={"button social"} href={buildTweet()} target="_blank" rel="noreferrer">Tweet</a>
                <a className={"button social"} href={buildLinkedIn()} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
        </div>
    </div>
}

export default Home;
