
export default class MovieDBService {
    #baseUrl;
    #apiKey;
    constructor(baseUrl, apiKey) {
        this.#baseUrl = baseUrl;
        this.#apiKey = apiKey;
    }
    #getUrl(listType) {
        return `${this.#baseUrl}${listType}?language=en-US&page=1&api_key=${this.#apiKey}`
    }
    async getList(listType) {
        const url = this.#getUrl(listType);
        const response = await fetch(url);
        const data = await response.json();
       
        console.log(data)
    }
}
