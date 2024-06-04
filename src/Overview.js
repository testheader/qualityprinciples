import principles from "./resources/principles.json";
import React from "react";

function Overview() {
    return <div className={"center-principles"}>

        {principles.principles.map((principle, i) => {
            return <div className={"description"}>
                <h2><a href={`${window.location.origin}?id=${i}`}>{principle.title}</a></h2>
                <p>{principle.description}</p>
                {principle.source.map(s => {
                    return <p><i>{s}</i></p>
                })}
                <hr/>
            </div>
        })}
        <div id="filler for footer"><br/><br/></div>
    </div>
}

export default Overview;