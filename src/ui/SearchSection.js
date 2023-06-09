const ACTIVE = 'active'
const SEARCHFields = 'search-fields';
export default class SearchSection {
    #buttons //array of links to button elements
    #sectionElements
    #activeIndex
    #callbackFn
    #parentId
    constructor(parentId, sections, callbackFn) {
        //sections - array of objects 
        //each object {title: string, id: string}
        this.#parentId = parentId;
        this.#callbackFn = callbackFn;
        this.#fillButtons(parentId, sections.map(s => s.title)); //draws button elements with text (via title)
        this.#addSearchFieldsPlace();   //put place for search fields
        this.#setSectionElements(sections.map(s => s.id));      // makes array of links to elements (via id)
        this.#addListeners(); //add listener to each button. Set function #handler binded with "this" + button index
              


    }
    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t => `<button class="menu-button">${t}</button>`).join('');
        this.#buttons = parentElement.childNodes;
    }
    #addSearchFieldsPlace(){
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML += `<form id=${this.#parentId}-${SEARCHFields}></form>`;
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
    #getId(id) {
        return `${this.#parentId}-${id}-id`;
    }
    getActiveIndex() {
        return this.#activeIndex;
    }
    fillSearchFields(){
        const parentElement = document.getElementById(`${this.#parentId}-${SEARCHFields}`);
        parentElement.innerHTML = `
            <div class="input-item">
            <input id="${this.#getId('title')}" name="title" placeholder="enter movie title" required>
            <select id="${this.#getId('genre')}" name="genre" required>               
            <option value hidden selected disabled>--Select genre--</option>
            </select>    

    </div>
        `;
        
    }

}