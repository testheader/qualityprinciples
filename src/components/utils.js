export const getAllUniqueTags = (principlesData) => {
    const allTags = new Set();
    principlesData.forEach(principle => {
        principle.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort(); // Convert Set to Array and sort alphabetically
};