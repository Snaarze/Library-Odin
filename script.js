// setter and getter
const container = document.querySelector(".main");
const addBookButton = document.querySelector("#addBooks");
const bookDialog = document.querySelector("#booksInformation");
const authorInput = document.querySelector(".authorBook");
const PageInput = document.querySelector(".pageCount");
const titleInput = document.querySelector(".titleBook");




const myLibrary =  [    
    // {
    //     Author : "J.R.R Talkiens",
    //     Title : "The Hobbit",
    //     Page : 399,
    //     isRead : false
    // },
    // {
    //     Author : "J.R.R Talkiens",
    //     Title : "The Hobbit",
    //     Page : 399,
    //     isRead : false
    // }
];

let counter = myLibrary.length;


function Book (Author, Title, Page, isRead){
    this.Author = Author;
    this.Title = Title;
    this.Page = Page;
    this.isRead = isRead
}

function addBookToLibrary() {
    const newBook  = new Book (authorInput.value, titleInput.value, PageInput.value,  true )
    myLibrary.push(newBook);
    createCardBooks();  
    displayBooks();
    authorInput.value = PageInput.value =  titleInput.value = "";
    bookDialog.close(); 
}

function displayBooks() {
    myLibrary.forEach((book, i) => {
           const author = document.querySelector(`.author${i}`);
           const title = document.querySelector(`.title${i}`);
           const page = document.querySelector(`.page${i}`);
           const Read = document.querySelector(`.read${i}`);

            author.textContent ="Author:" + myLibrary[i].Author;
            title.textContent = "Title :" + myLibrary[i].Title;
            page.textContent = "Page :  " + myLibrary[i].Page;
            // Read.textContent = "Status :" + myLibrary[i].isRead;
        }
    )
    // i dont know which one better, but this one is also another way to display the books
    // for(let i =0; i < myLibrary.length; i++){

    //     const author = document.querySelector(`.author${i}`);
    //        const title = document.querySelector(`.title${i}`);
    //        const page = document.querySelector(`.page${i}`);
    //        const Read = document.querySelector(`.read${i}`);

    //         author.textContent ="Author:" + myLibrary[i].Author;
    //         title.textContent = "Title :" + myLibrary[i].Title;
    //         page.textContent = "Page :  " + myLibrary[i].Page;
    //         Read.textContent = "Read :" + myLibrary[i].isRead;
    // }
}


addBookButton.addEventListener("click", () =>{
    bookDialog.showModal();
})




const createCardBooks = () => {
    // create div with class of card and append it to the container
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    container.appendChild(card);

    // create p tag with the class of author, title  etc and increment each time
    const authorClass = document.createElement("p");
    authorClass.setAttribute("class", `authorCard author${counter}`);
    card.appendChild(authorClass);
    
    const titleClass = document.createElement("p"); 
    titleClass.setAttribute("class", `titleCard title${counter}`);
    card.appendChild(titleClass)

    const page = document.createElement("p");
    page.setAttribute("class", `pageCard page${counter}`);
    card.appendChild(page);

    const closeContainer = document.createElement("div")
    closeContainer.setAttribute("class", "button-container")
    const closeClass = document.createElement("button")
    closeClass.setAttribute("class" , `closeBtn close${counter}`)
    closeClass.setAttribute("data-index", `${counter}`)
    closeClass.textContent = "x";
    closeContainer.appendChild(closeClass)
    card.appendChild(closeContainer);

    // create div to contain p and label tag
    const readStatus = document.createElement("div")
    readStatus.setAttribute("class", "read-status")

    // create a pTag to show the current status of the book
    const readClass = document.createElement("p");
    readClass.setAttribute("class", `readCard read${counter}`)
    readClass.textContent = "status :"
    readStatus.appendChild(readClass);

    //create a toggle checkbox of the status of the book
    const labelSwitch = document.createElement("label")
    labelSwitch.setAttribute("class", "switch")
    readStatus.appendChild(labelSwitch);

    const inputCheckBox = document.createElement("input")
    inputCheckBox.setAttribute("type", "checkbox");
    labelSwitch.appendChild(inputCheckBox);

    const spanSlider = document.createElement("span");
    spanSlider.setAttribute("class", "slider");
    labelSwitch.appendChild(spanSlider);
    card.appendChild(readStatus);

    const closeBtn = document.querySelector(".closeBtn");

    closeBtn.addEventListener("click", ()=>{
        closeBtn.parentNode.parentNode.remove();
        console.log("this is a test")
    })
    
    return counter++;
}



displayBooks();
