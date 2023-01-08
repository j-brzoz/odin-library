// -----------------main logic-----------------
const myLibrary = [];

// book constructor
function Book(title, author, pages, status) {
    this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function info() {
    if (status !== "on") return `${title} by ${author}, ${pages} pages, not read yet`;
    return `${title} by ${author}, ${pages} pages, read already`;
  };
}

// displaying books
function displayLibrary() {
  const main = document.querySelector("#main");
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  bookCard.setAttribute("id", `bookCard${  myLibrary.length}`);
  main.appendChild(bookCard);
  bookCard.textContent = myLibrary[myLibrary.length-1].info();
}

// adding books to library
function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(book);
    displayLibrary();
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



//  -----------------adding book from form-----------------
const formElem = document.querySelector("#newBookForm");
formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-new
  new FormData(formElem);
});

formElem.addEventListener("formdata", (e) => {
  console.log("test");
  let bookTitle;
  let bookAuthor;
  let bookPages;
  let bookStatus;
  let i = 0;
  const data = e.formData;
  
  // eslint-disable-next-line no-restricted-syntax
  for (const value of data.values()) {
    if(i === 0)
      bookTitle = value;
    else if(i === 1)
      bookAuthor = value;
    else if(i === 2)
      bookPages = value;
    else if(i === 3)
      bookStatus = value;
    else
      console.log("error");
    i+=1;
  };
  i = 0;
  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
  addBookToLibrary(newBook);
})

