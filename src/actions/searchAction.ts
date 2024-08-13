
const searchAction = async (query: string) => {
    try {
        const response = await fetch(`/api/search?query=${query}`);
        if (!response.ok) {
            throw new Error("Failed to fetch search results");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching search results", error);
        return [];
    }
}
export default searchAction;