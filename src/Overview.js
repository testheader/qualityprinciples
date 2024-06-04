import principles from "./resources/principles.json";
import React from "react";

function Overview() {
    return <div className={"center-principles"}>
        {principles.principles.map(principle => {
            return <div className={"description"}>
                <h2>{principle.title}</h2>
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