import {isMobile} from "react-device-detect";
import principles from "../resources/principles.json";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";

function Home({isOverviewActive}) {
    const [index, setIndex] = useState(() => {
                let id = Math.abs(parseInt(new URLSearchParams(window.location.search).get('id'), 10));
                if (id > principles.principles.length - 1 || isNaN(id)) {
                    id = Math.floor(Math.random() * principles.principles.length);
                }
                return id;
            });
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [overviewButton, setOverviewButton] = useState(null);

    useEffect(() => {
        setOverviewButton(isOverviewActive ? <a className="button action" data-testid={"overviewButton"} href="/overview">All principles</a> : null);
    }, [isOverviewActive]);

    const CURRENT_URL = window.location.origin

    const getUrlWithIndex = () => {
        return `${CURRENT_URL}?id=${index}`
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
            `Found this at ${getUrlWithIndex()}\n` +
            `${principles.principles[index].title}\n\n` +
            `${principles.principles[index].description}\n\n` +
            `sources: ${principles.principles[index].source.map(a => " "+ a)}\n`;

        result.searchParams.append("text", text)
        result.searchParams.append("url", getUrlWithIndex())

        return result.toString()
    }

    return <div data-testid={"homeComponent"}>

        <Helmet>
            <meta name="robots" content="max-image-preview:large"/>

            <meta name="twitter:card" content="summary_large"/>
            <meta name="description" content={principles.principles[index].description}/>
            <meta name="twitter:site" content="@vdlgeert"/>
            <meta name="twitter:creator" content="@vdlgeert"/>
            <name name="twitter:title" property="twitter:title" content={principles.principles[index].title}/>
            <meta name="author" content="Geert van de Lisdonk"/>

            <meta name="type" property="og:type" content="website"/>
            <meta name="url" property="og:url" content={getUrlWithIndex()}/>
            <meta name="title" property="og:title" content={principles.principles[index].title}/>
            <meta property="og:description" content={principles.principles[index].description}/>
            <meta name="site_name" property="og:site_name" content="Quality Principles"/>
        </Helmet>

        <div className={isMobile ? "mobile-center-container":"center-container"}>
            <div id="principle-container" className= {isMobile ? "" : "principle-container"}>
                <h1>{principles.principles[index].title}</h1>
                <p className={`description ${isMobile ? 'mobile-description' : 'desktop-description'}`} data-testid="description">{principles.principles[index].description}</p>
                {principles.principles[index].source.map(source => {
                            if (source.includes("http")) {
                                return <a key={source} className={"source"} data-testid="source" href={source} target="_blank"
                                          rel="noreferrer">{source}<br/></a>
                            }
                            return <p className={"source"} data-testid="source">{source}</p>
                        }
                    )
                }
            </div>
        </div>
        <div className={isMobile ? "mobile-button-container" : "button-container"}>
            <div className={`button action`} role="button" onClick={() => {
                document.getElementById('principle-container').className = 'principle-container animate';
                setTimeout(() => {
                    setIndex((index + 1) % principles.principles.length)
                    document.getElementById('principle-container').className = 'principle-container';
                }, 600);
            }}>Next principle</div>
            {overviewButton}
            <div className={"spacer"}>Share this principle make the world a better place:</div>
            {!showCopyMessage && <div className={`button action`} role="button" onClick={() =>
                navigator.clipboard.writeText(getUrlWithIndex())
                .then(() => {
                    setShowCopyMessage(true);
                    setTimeout(() => setShowCopyMessage(false), 2000);
                })}> Copy URL </div>}
            {showCopyMessage && <div className={`button action copy-message`}>URL copied to clipboard!</div>}
            <div className="share-container">
                <a className={"button social"} role="button" href={buildTweet()} target="_blank" rel="noreferrer">Tweet</a>
                <a className={"button social"} role="button" href={buildLinkedIn()} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
        </div>
    </div>
}

export default Home;
