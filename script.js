const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function info() {
    if (read === 0) return `${title} by ${author}, ${pages} pages, not read yet`;
    return `${title} by ${author}, ${pages} pages, read already`;
  };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 1);
addBookToLibrary(theHobbit);
const theWitcher = new Book("The Witcher", "Sapkowski", 385, 1);
addBookToLibrary(theWitcher);


for(let i = 0; i < myLibrary.length; i += 1){
    const main = document.querySelector("#main");
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.setAttribute("id", `bookCard${  i}`);
    main.appendChild(bookCard);
    bookCard.textContent = myLibrary[i].info();
}
