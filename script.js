// setter and getter
const container = document.querySelector(".main");
const addBookButton = document.querySelector("#addBooks");
const bookDialog = document.querySelector("#booksInformation");
const authorInput = document.querySelector(".authorBook");
const PageInput = document.querySelector(".pageCount");
const titleInput = document.querySelector(".titleBook");
const submitBtn = document.querySelector(".submitBtn");


addBookButton.addEventListener("click", () =>{
    bookDialog.showModal();
})

submitBtn.addEventListener("click", ()=>{
    createNewbook()
})

const myLibrary = [
    
];
let id =  (myLibrary.length === 0) ? 0 : myLibrary[myLibrary.length - 1].id + 1;


class Book{
    constructor(id ,Author, Title, Page, isRead){
        this.id = id
        this.Author = Author;
        this.Title = Title;
        this.Page = Page;
        this.isRead = isRead;
    }
}

// create new books and append books on the array
function createNewbook(){
    
    const newBook  = new Book (id , authorInput.value, titleInput.value, PageInput.value, false)
    
    myLibrary.push(newBook);
    createNewCard();
    
    displayBooks();
    
    authorInput.value = PageInput.value =  titleInput.value = "";
    bookDialog.close(); 
    deleteBooks();
    changeStatus()
    return id;
}
// display books of the array
function displayBooks() {
    const card = document.querySelectorAll(".card");
    card.forEach((element, index) => {
        const author = element.querySelector(".authorCard");
        const title = element.querySelector(".title");
        const page = element.querySelector(".page")
        const read = element.querySelector(".readText")

        author.textContent = "Author : " + myLibrary[index].Author;
        title.textContent = "Title :" + myLibrary[index].Title;
        page.textContent = "Page : " + myLibrary[index].Page;
        read.textContent = (myLibrary[index].isRead) ? "read" : "not yet read";
    })  
    
}
function createNewCard(){
    //selects the main div
    const main = document.querySelector(".main");
    
    //create new div
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index" ,`${id}`);
    main.appendChild(card)

    // create p tag with the class of author, title  etc and increment each time
    const authorClass = document.createElement("p");
    authorClass.setAttribute("class", `authorCard`);
    card.appendChild(authorClass);
    
    const titleClass = document.createElement("p"); 
    titleClass.setAttribute("class", `titleCard title`);
    card.appendChild(titleClass)

    const page = document.createElement("p");
    page.setAttribute("class", `pageCard page`);
    card.appendChild(page);

    const closeContainer = document.createElement("div")
    closeContainer.setAttribute("class", "button-container")
    const closeClass = document.createElement("button")
    closeClass.setAttribute("class" , `closeBtn close`)
    closeClass.textContent = "x";
    closeContainer.appendChild(closeClass)
    card.appendChild(closeContainer);

    // create div to contain p and label tag
    const readStatus = document.createElement("div")
    readStatus.setAttribute("class", "read-status")

    // create a pTag to show the current status of the book
    const readClass = document.createElement("p");
    readClass.setAttribute("class", `readCard read`)
    readClass.textContent = "status :"
    readStatus.appendChild(readClass);

    const readStatusText = document.createElement("p"); 
    readStatusText.classList.add("readText");
    readStatus.appendChild(readStatusText);

    //create a toggle checkbox of the status of the book
    const labelSwitch = document.createElement("label")
    labelSwitch.setAttribute("class", "switch")
    readStatus.appendChild(labelSwitch);

    const inputCheckBox = document.createElement("input")
    inputCheckBox.setAttribute("type", "checkbox");
    inputCheckBox.classList.add(`checkInput`);
    labelSwitch.appendChild(inputCheckBox);

    const spanSlider = document.createElement("span");
    spanSlider.setAttribute("class", "slider");
    labelSwitch.appendChild(spanSlider);
    card.appendChild(readStatus);
    id++
    return id;
}

// find the index based on the id of the object
function findIndexById(array, id) {
    return array.findIndex(arr => arr.id === id);

}   

// delete books based on the data index of the card class
function deleteBooks(){
    const closeBtn = document.querySelectorAll(".closeBtn");

    closeBtn.forEach(btn => {
        btn.addEventListener("click", (e)=>{
            const card = btn.parentNode.parentNode;
            const index = Number(card.getAttribute("data-index"));
            let indexs = findIndexById(myLibrary, index);

            if (indexs !== -1 && myLibrary[indexs]) {
                card.remove();
                myLibrary.splice(indexs, 1);
            }
        })
    })
    return;
}

// change the the status to based on the data-index of the class card
function changeStatus() {
    const sliderCheckbox = document.querySelectorAll(".checkInput");

    sliderCheckbox.forEach(checkbox => {
        // to avoid assigning multiple event listener
        if (!checkbox.hasEventListener) {
            checkbox.addEventListener("change", (event) => {

                const card = checkbox.parentNode.parentNode.parentNode;
                const status = checkbox.parentNode.parentNode.children[1];
                const index = Number(card.getAttribute("data-index"));
                let indexs = findIndexById(myLibrary, index);
                console.log(index);
                console.log(event.target)
                if (indexs !== -1 && myLibrary[indexs]) {
                    myLibrary[indexs].isRead = !myLibrary[indexs].isRead;
                    status.textContent = !myLibrary[indexs].isRead ? "not yet read" : "read";
                }    
                    
               
            });
            checkbox.hasEventListener = true; // Set a custom property to indicate the listener is attached
        }
    });
}


