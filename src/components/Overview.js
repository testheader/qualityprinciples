import principles from "../resources/principles.json";
import React, {useState} from "react";
import TagFilter from "./TagFilter";


function Overview() {
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
        // Show all if no tags are selected
        if (selectedTags.length === 0) {
            return true;
        }

        // If one tag is selected, show all principles that include that tag
        if (selectedTags.length === 1) {
            const selectedTag = selectedTags[0];
            return principle.tags.includes(selectedTag);
        }

        // If more than one tag is selected, show only principles that have ALL of the selected tags
        return selectedTags.every(selectedTag => principle.tags.includes(selectedTag));
    });

    return <div>
        <TagFilter
            principles={principles.principles}
            selectedTags={selectedTags}
            onTagChange={handleSelectedTagsChange}/>
        <div className={"center-principles"}>

            {filteredPrinciples.length > 0 ? (
                filteredPrinciples.map((principle, index) => {
                        return <div className={"description"} key={principle.title}>
                            <h2><a href={`${window.location.origin}?id=${index}`}>{principle.title}</a></h2>
                            <p>{principle.description}</p>
                            {principle.tags.map(tag => <span>{tag}, </span>)}
                            {principle.source.map(source => {
                                if (source.includes("http")) {
                                    return <p className={"source"} key={source}><a href={source} target="_blank"
                                                                                   rel="noreferrer"><i>{source}</i></a></p>
                                }
                                return <p className={"source"} key={source}><i>{source}</i></p>
                            })}
                            <hr/>
                        </div>
                    }
                )
                ) : (
                <div className="no-principles-message">
                    <h2>No principles found with tags:</h2>
                    <h3>{selectedTags.join(', ')}</h3>
                </div>
                )
            }
            <div id="filler for footer"><br/><br/></div>
        </div>
    </div>
}

export default Overview;