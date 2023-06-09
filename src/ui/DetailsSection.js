const ACTIVE = 'active';
const CLOSEButton = "hide-button";
export default class DetailsSection {
   
    #sectionElement
    #activeIndex
    #parentElement
    #uRLPrefix
    #callbackFn
   
    constructor(parentId, uRLPrefix, callbackFn) {       
        this.#parentElement = document.getElementById(parentId);  
        this.#uRLPrefix = uRLPrefix;
        this.#callbackFn = callbackFn;     
    }

    fillDetails (movieData){
        const detailHTML = `
        <img src="${this.#uRLPrefix + movieData.poster_path}" class="details-image">
        <span class="details-title">${movieData.overview}</span>
        <button class="${CLOSEButton}">X</button> 
        `;
        this.#parentElement.innerHTML = detailHTML;
        this.#closeButton();
        console.log(movieData)
    }
    #closeButton(){
        const button = document.querySelector(`.${CLOSEButton}`);
        button.addEventListener('click', this.#callbackFn)
        
    }    
}