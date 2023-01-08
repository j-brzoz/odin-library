// -----------------main logic-----------------
const myLibrary = [];

// book constructor
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

// adding books to library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// test
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 1);
addBookToLibrary(theHobbit);
const theWitcher = new Book("The Witcher", "Sapkowski", 385, 1);
addBookToLibrary(theWitcher);

// displaying books
for(let i = 0; i < myLibrary.length; i += 1){
    const main = document.querySelector("#main");
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.setAttribute("id", `bookCard${  i}`);
    main.appendChild(bookCard);
    bookCard.textContent = myLibrary[i].info();
}


// -----------------theme change-----------------
function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  root.className = newTheme;
  
  // document.querySelector(".theme-name").textContent = newTheme;
}

document.querySelector(".themeChange").addEventListener("click", setTheme);

//  -----------------add book modal-----------------
const addBookModal = document.querySelector("#addBookModal");
const addBookBtn = document.querySelector("#addBookBtn");

addBookBtn.onclick = function modalToBlock() {
  addBookModal.style.display = "block";
};

window.onclick = function modalToNone(event) {
  if (event.target === addBookModal) {
    addBookModal.style.display = "none";
  }
};