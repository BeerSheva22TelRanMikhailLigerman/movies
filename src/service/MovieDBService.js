
export default class MovieDBService {
    #baseUrl;
    #apiKey;
    #uRLPrefix;
    constructor(baseUrl, apiKey, uRLPrefix) {
        this.#baseUrl = baseUrl;
        this.#apiKey = apiKey;
        this.#uRLPrefix = uRLPrefix;
    }
    #getListUrl(listType) {
        return `${this.#baseUrl}${listType}?language=en-US&page=1&api_key=${this.#apiKey}`
    }
    #getDetailUrl(id) {
        return `${this.#baseUrl}${id}?language=en-US&api_key=${this.#apiKey}`
    }
    async getList(listType) {
        const url = this.#getListUrl(listType);
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
        return res
        
    }
    async getDetailData(id) {
        const url = this.#getDetailUrl(id);
        const response = await fetch(url);
        const data = await response.json();            
        return data
    }
    async getGenreList() {
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${this.#apiKey}`;
        const response = await fetch(url);
        const data = await response.json();        
        return data.genres;       
    }
}
