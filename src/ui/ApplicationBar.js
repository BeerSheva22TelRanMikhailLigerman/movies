const ACTIVE = 'active'
export default class ApplicationBar {
    #buttons //array of links to button elements
    #sectionElements
    #activeIndex
    #callbackFn
    constructor(parentId, sections, callbackFn) {
        //sections - array of objects 
        //each object {title: string, id: string}
        this.#callbackFn = callbackFn;
        this.#fillButtons(parentId, sections.map(s => s.title)); //draws button elements with text (via title)
        this.#setSectionElements(sections.map(s => s.id));      // makes array of links to elements (via id)
        this.#addListeners(); //add listener to each button. Set function #handler binded with "this" + button index
        this.#activeIndex = 0


    }
    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t => `<button class="menu-button">${t}</button>`).join('');
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