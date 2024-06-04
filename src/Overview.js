import principles from "./resources/principles.json";
import React from "react";

function Overview() {
    return <div className={"center-principles"}>
        {principles.principles.map((principle, index) => {
            return <div className={"description"}>
                <h2><a href={`${window.location.origin}?id=${index}`}>{principle.title}</a></h2>
                <p>{principle.description}</p>
                {principle.source.map(source => {
                    if(source.includes("http")){
                        return <p className={"source"} key={source}><a href={source} target="_blank" rel="noreferrer"><i>{source}</i></a></p>
                    }
                    return <p className={"source"} key={source}><i>{source}</i></p>
                })}
                <hr/>
            </div>
        })}
        <div id="filler for footer"><br/><br/></div>
    </div>
}

export default Overview;