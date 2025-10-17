export default class SearchController {

    async getSuggestions(req, res) {
        res.json({ message: 'Suggestions endpoint' });
    }

    async searchDetails(req, res) {
        res.json({ message: 'Search endpoint' });
    }

}   