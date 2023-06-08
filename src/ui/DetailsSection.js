const ACTIVE = 'active'
export default class DetailsSection {
    #thumbnails
    #sectionElement
    #activeIndex
    #parentElement
    #uRLPrefix
   
    constructor(parentId, uRLPrefix) {       
        this.#parentElement = document.getElementById(parentId);  
        this.#uRLPrefix = uRLPrefix;     
    }

    fillDetails (movieData){
        const detailHTML = `
        <img src="${this.#uRLPrefix + movieData.poster_path}" class="details-image">
        <span class="details-title">${movieData.overview}</span>
        <button class="hide-button">X</button>
        `;
        this.#parentElement.innerHTML = detailHTML;
        console.log(movieData)
    }
    
    
    #addListeners() {
        this.#thumbnails.forEach((b, index) => b.addEventListener('click', this.#handler.bind(this, index)))
    }
    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {

            if (this.#activeIndex != undefined) {
                this.#thumbnails[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElement.hidden = true;
            }

            
            this.#sectionElement.hidden = false;
            this.#thumbnails[index].classList.add(ACTIVE);
            this.#activeIndex = index;
        }
    }
}