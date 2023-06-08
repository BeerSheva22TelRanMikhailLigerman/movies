const ACTIVE = 'active'
export default class ThumbnailsList {
    #thumbnails
    #sectionElement
    #activeIndex
    #callbackFn
    constructor(parentId, thumbnailsData, callbackFn) {
        this.#callbackFn = callbackFn;
        this.#fillThumbnails(parentId, thumbnailsData);
        console.log(thumbnailsData)
        this.#sectionElement = document.getElementById("details-section");
        //this.#setSectionElements(thumbnailsData.map(s => s.id));
        this.#addListeners();


    }
    #fillThumbnails(parentId, thumbnailData) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = thumbnailData.map(t => `
            <li class="thumbnails-item">
                <a href="#" class="thumnails-ancor">
                <img src="${t.backdrop_path}" class="thumnails-image">
                <span class="thumbnails-title">${t.original_title}</span>
                </a>
            </li>
        `);
        this.#thumbnails = parentElement.childNodes;
    }
    // #setSectionElements(sectionIds) {
    //     this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    // }
    #addListeners() {
        this.#thumbnails.forEach((b, index) => b.addEventListener('click', this.#handler.bind(this, index)))
    }
    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {

            if (this.#activeIndex != undefined) {
                this.#thumbnails[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElement.hidden = true;
            }

            await this.#callbackFn(index);
            this.#sectionElement.hidden = false;
            this.#thumbnails[index].classList.add(ACTIVE);
            this.#activeIndex = index;


        }
    }
    getActiveIndex() {
        return this.#activeIndex;
    }

}