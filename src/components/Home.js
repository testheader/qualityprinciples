function Home({currentPrinciple}) {
    return <div className={`principle-container`} data-testid={"homeComponent"}>
        <div className={"center-container"}>
            <div id="principle-container" className= {"principle-container"}>
                <h1>{currentPrinciple.title}</h1>
                <p className={`description desktop-description`}>
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
