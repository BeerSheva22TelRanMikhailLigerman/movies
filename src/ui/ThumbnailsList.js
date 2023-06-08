const ACTIVE = 'active'
export default class ThumbnailsList {
    #thumbnail
    #sectionElements
    #activeIndex
    #callbackFn
    constructor(parentId, thumbnailsData, callbackFn) {
        this.#callbackFn = callbackFn;
        this.#fillThumbnails(parentId, thumbnailsData);
        console.log(thumbnailsData)
        this.#setSectionElements(thumbnailsData.map(s => s.id));
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
        this.#thumbnail = parentElement.childNodes;
    }
    #setSectionElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    }
    #addListeners() {
        this.#thumbnail.forEach((b, index) => b.addEventListener('click', this.#handler.bind(this, index)))
    }
    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {

            if (this.#activeIndex != undefined) {
                this.#thumbnail[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElements[this.#activeIndex].hidden = true;
            }

            await this.#callbackFn(index);
            this.#sectionElements[index].hidden = false;
            this.#thumbnail[index].classList.add(ACTIVE);
            this.#activeIndex = index;


        }
    }
    getActiveIndex() {
        return this.#activeIndex;
    }

}