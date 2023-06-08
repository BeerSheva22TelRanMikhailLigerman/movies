const ACTIVE = 'active'
export default class ThumbnailsList {
    #buttons
    #sectionElements
    #activeIndex
    #callbackFn
    constructor(parentId, thumbnailsData, callbackFn) {        
        this.#callbackFn = callbackFn;
        this.#fillThumbnails(parentId, thumbnailsData.map(s => s.title));
        console.log(thumbnailsData)
        this.#setSectionElements(thumbnailsData.map(s => s.id));
        this.#addListeners();


    }
    #fillThumbnails(parentId, titles) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t => `<div class="menu-button">${t}</div>`).join('');
        this.#buttons = parentElement.childNodes;
    }
    #setSectionElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    }
    #addListeners() {
        this.#buttons.forEach((b, index) => b.addEventListener('click', this.#handler.bind(this, index)))
    }
    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {
            
            if(this.#activeIndex != undefined) {
                 this.#buttons[this.#activeIndex].classList.remove(ACTIVE);
                 this.#sectionElements[this.#activeIndex].hidden = true;
            }
             
             await this.#callbackFn(index);
             this.#sectionElements[index].hidden = false;
             this.#buttons[index].classList.add(ACTIVE);
             this.#activeIndex = index;
            

        }
    }
    getActiveIndex() {
        return this.#activeIndex;
    }

}