import {getAllUniqueTags} from "./utils";

function TagFilter({ principles, selectedTags, onTagChange }) {
    const allAvailableTags = getAllUniqueTags(principles);

    const handlePillClick = (tag) => {
        const isActive = selectedTags.includes(tag);
        onTagChange(tag, !isActive);
    };

    return (
        <div className="tag-pill-bar" role="group" aria-label="Filter by tag">
            {allAvailableTags.map(tag => {
                const isActive = selectedTags.includes(tag);
                return (
                    <button
                        key={tag}
                        type="button"
                        className={`tag-pill${isActive ? ' tag-pill--active' : ''}`}
                        aria-pressed={isActive}
                        onClick={() => handlePillClick(tag)}
                    >
                        {tag}
                    </button>
                );
            })}
        </div>
    );
}

export default TagFilter;