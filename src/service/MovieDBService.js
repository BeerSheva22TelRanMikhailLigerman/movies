
export default class MovieDBService {
    #baseUrl;
    #apiKey;
    #uRLPrefix;
    constructor(baseUrl, apiKey, uRLPrefix) {
        this.#baseUrl = baseUrl;
        this.#apiKey = apiKey;
        this.#uRLPrefix = uRLPrefix;
    }
    #getUrl(listType) {
        return `${this.#baseUrl}${listType}?language=en-US&page=1&api_key=${this.#apiKey}`
    }
    async getList(listType) {
        const url = this.#getUrl(listType);
        const response = await fetch(url);
        const data = await response.json();
        const res = data.results.map(item => {
            return {
                "id": item.id,
                "backdrop_path": this.#uRLPrefix + item.backdrop_path,
                "original_title": item.original_title,
                "vote_average": item.vote_average,
                "genre_ids": item.genre_ids
            };
        });        
        //console.log(res);
        return res
        
    }
    async getDetailData(id) {
        //TODO
    }
}
