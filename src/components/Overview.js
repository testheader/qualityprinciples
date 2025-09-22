import principles from "../resources/principles.json";
import React,  { useState } from "react";
import {getAllUniqueTags} from './utils';
import TagFilter from "./TagFilter";


function Overview() {
    const allAvailableTagsArray = Array.from(getAllUniqueTags).sort(); // For the filtering logic later

    const [selectedTags, setSelectedTags] = useState([]);

    // This function is passed down to TagFilter and updates the state here
    const handleSelectedTagsChange = (tag, isChecked) => {
        if (isChecked) {
            setSelectedTags(prev => [...prev, tag]);
        } else {
            setSelectedTags(prev => prev.filter(t => t !== tag));
        }
    };

    // Filters principles based on selectedTags
    const filteredPrinciples = principles.principles.filter(principle => {
        // Show all if no tags are selected OR if all available tags are selected
        if (selectedTags.length === 0 || selectedTags.length === allAvailableTagsArray.length) {
            return true;
        }
        // Otherwise, show principles that have at least one of the selected tags
        return principle.tags.some(principleTag => selectedTags.includes(principleTag));
    });

    return <div>
        <TagFilter
            principles={principles.principles} 
            selectedTags={selectedTags}
            onTagChange={handleSelectedTagsChange}/>
        <div className={"center-principles"}>
            {filteredPrinciples.map((principle, index) => {
                return <div className={"description"} key={principle.title}>
                    <h2><a href={`${window.location.origin}?id=${index}`}>{principle.title}</a></h2>
                    <p>{principle.description}</p>
                    {principle.source.map(source => {
                        if (source.includes("http")) {
                            return <p className={"source"} key={source}><a href={source} target="_blank"
                                                                           rel="noreferrer"><i>{source}</i></a></p>
                        }
                        return <p className={"source"} key={source}><i>{source}</i></p>
                    })}
                    <hr/>
                </div>
            })}
            <div id="filler for footer"><br/><br/></div>
        </div>
    </div>
}

export default Overview;