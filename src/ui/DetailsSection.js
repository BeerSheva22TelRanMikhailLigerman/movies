const ACTIVE = 'active'
export default class DetailsSection {
    #thumbnails
    #sectionElement
    #activeIndex
    #parentElement
   
    constructor(parentId) {       
        this.#parentElement = document.getElementById(parentId);
       
    }

    fillDetails (movieData){
        const detailHTML = `
        <img src="images/dog1.png" class="details-image">
        <span class="details-title">start text</span>
        <button onclick="hideDetails()" class="hide-button">X</button>
        `;
       // this.#parentElement.innerHTML = detailHTML;
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