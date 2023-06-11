const ACTIVE = 'active'
const SEARCHFields = 'search-fields';
const BUTTONSPlace = 'buttons-place';
export default class SearchSection {
    #buttons //array of links to button elements
    #sectionElements
    #activeIndex
    #callbackFn
    #parentId
    #titleElement
    #genreElement
    constructor(parentId, sections, callbackFn) {
        //sections - array of objects 
        //each object {title: string, id: string}
        //this.#parentId = parentId;          //parent section only for 3 butttons
        this.#callbackFn = callbackFn;      //callback function only for 3 butttons
        this.#fillButtons(parentId, sections.map(s => s.title));    //draws button elements with text (via title)    
         

        this.#setSectionElements(sections.map(s => s.id));      // makes array of links to button elements (via id)
        this.#addListeners(); //add listener to each button. Set function #handler binded with "this" + button index



    }
    #fillButtons(parentId, titles) {
        let parentElement = document.getElementById(parentId);
        const buttonsHTML = titles.map(t => `<button class="menu-button">${t}</button>`).join('');
        parentElement.innerHTML = buttonsHTML;
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

            if (this.#activeIndex != undefined) {
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
    fillSearchFields(parentId, configData) {
        this.#parentId = parentId; 
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = `
            <div class="input-item">
            <input id="${this.#getId('title')}" name="title" placeholder="enter movie title" required>

            <select id="${this.#getId('genre')}" name="genre" required>               
            <option value hidden selected disabled>--Select genre--</option>
            </select>    

    </div>
        `;
         this.#setElements();
         this.#setOptions(configData);
       
    }
    #setElements() {
        this.#titleElement = document.getElementById(this.#getId('title'));
        this.#genreElement = document.getElementById(this.#getId('genre'));
       
    }
    #setOptions(configData) {
        const { genreList } = configData;
        console.log(genreList[0].name);
        this.#genreElement.innerHTML +=
            genreList.map(item => `<option value=${item.name}uselected>${item.name}</option>`).join('');
        

    }


}