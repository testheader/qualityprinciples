// src/components/TagFilter.js (or just src/TagFilter.js)
import {getAllUniqueTags} from "./utils";

// Helper function to get all unique tags from the principles data
// This function needs to be passed the full principles array, or imported from a utility.
// For now, we'll assume it's passed as a prop to keep TagFilter self-contained.

function TagFilter({ principles, selectedTags, onTagChange }) {
    // Derive all unique tags from the provided principles data
    const allAvailableTags = getAllUniqueTags(principles);

    // No internal state needed for selectedTags here, it's controlled by props

    // This handler will just call the prop function to update parent state
    const handleCheckboxChange = (event) => {
        const tag = event.target.value;
        const isChecked = event.target.checked;
        onTagChange(tag, isChecked); // Pass the tag and its checked status up to the parent
    };

    return (
        <div className={"filter-controls"}>
            <h3>Filter by Tag:</h3>
            <div className={"tags-list"}>
                {allAvailableTags.map(tag => (
                    <label key={tag} className={"tag-checkbox-label"}>
                        <input
                            type="checkbox"
                            value={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={handleCheckboxChange}
                        />
                        {tag}
                    </label>
                ))}
            </div>
            <hr/>
        </div>
    );
}

export default TagFilter;