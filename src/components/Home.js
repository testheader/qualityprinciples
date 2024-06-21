import {isMobile} from "react-device-detect";
import {Helmet} from "react-helmet";

function Home({isOverviewActive, currentPrinciple}) {
    return <div className={`principle-container`} data-testid={"homeComponent"}>

        <Helmet>
            <meta name="robots" content="max-image-preview:large"/>

            <meta name="twitter:card" content="summary_large"/>
            <meta name="description" content={currentPrinciple.description}/>
            <meta name="twitter:site" content="@vdlgeert"/>
            <meta name="twitter:creator" content="@vdlgeert"/>
            <name name="twitter:title" property="twitter:title" content={currentPrinciple.title}/>
            <meta name="author" content="Geert van de Lisdonk"/>

            <meta name="type" property="og:type" content="website"/>
            <meta name="url" property="og:url" content={currentPrinciple.url}/>
            <meta name="title" property="og:title" content={currentPrinciple.title}/>
            <meta property="og:description" content={currentPrinciple.description}/>
            <meta name="site_name" property="og:site_name" content="Quality Principles"/>
        </Helmet>

        <div className={isMobile ? "mobile-center-container":"center-container"}>
            <div id="principle-container" className= {isMobile ? "" : "principle-container"}>
                <h1>{currentPrinciple.title}</h1>
                <p className={`description ${isMobile ? 'mobile-description' : 'desktop-description'}`}>
                    {currentPrinciple.description}</p>
                        {currentPrinciple.source.map(source => {
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
    </div>
}

export default Home;
