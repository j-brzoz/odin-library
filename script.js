// -----------------main logic-----------------
const myLibrary = [];

// book constructor
class Book {
  constructor(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  get info() {
    return this.infoMethod();
  }

  infoMethod() {
    if (this.status !== "on") return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    return `${this.title} by ${this.author}, ${this.pages} pages, read already`;
  }
}

function makeStarInputs(i, stars) {
  const star = document.createElement("input");
  star.setAttribute("type", "radio");
  star.setAttribute("id", `rating${  i}`);
  star.setAttribute("name", "rating");
  star.setAttribute("value", i);
  stars.appendChild(star);
  const starLabel = document.createElement("label");
  starLabel.setAttribute("for", `rating${i}`);
  if (i % 2 !== 0) {
    starLabel.classList.add("half");
  }
  stars.appendChild(starLabel);
}

// displaying books
function displayLibrary() {
  const cards = document.querySelector("#cards");

  // main info
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");
  bookCard.setAttribute("id", `bookCard${  myLibrary.length}`)
  
  const bookTitle = document.createElement("p");
  bookTitle.textContent = myLibrary[myLibrary.length-1].title;
  bookTitle.classList.add("bookTitle");
  bookCard.appendChild(bookTitle);

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `by ${  myLibrary[myLibrary.length-1].author}`;
  bookCard.appendChild(bookAuthor);

  const bookPages = document.createElement("p");
  bookPages.textContent = myLibrary[myLibrary.length-1].pages > 1 ? `${myLibrary[myLibrary.length-1].pages  } pages` : `${myLibrary[myLibrary.length-1].pages  } page`;
  bookCard.appendChild(bookPages);

  // rating stars
  const stars = document.createElement("div");
  stars.classList.add("rate");
  for(let i = 10; i >= 1; i-=1){
    makeStarInputs(i, stars);
  }
  bookCard.appendChild(stars);

  // read button
  const bookStatus = document.createElement("button");

  function changeStatus() {
    myLibrary[myLibrary.length-1].status = myLibrary[myLibrary.length-1].status === "on" ? "" : "on";
    bookStatus.className = myLibrary[myLibrary.length-1].status === "on" ? "read" : "notRead";
    bookStatus.textContent = myLibrary[myLibrary.length-1].status === "on" ? "READ" : "NOT READ";
  };
  
  if(myLibrary[myLibrary.length-1].status === "on") {
    bookStatus.classList.add("read");
    bookStatus.textContent = "READ";
  }
  else {
    bookStatus.classList.add("notRead");
    bookStatus.textContent = "NOT READ";
  }
  bookStatus.addEventListener("click", changeStatus);
  bookCard.appendChild(bookStatus);

  // delete button
  const bookDelete = document.createElement("button");

  function deleteBook() {
    myLibrary.splice(myLibrary.length-1, 1);
    bookCard.remove();
  }
  
  bookDelete.addEventListener("click", deleteBook);
  bookDelete.textContent = "DELETE";
  bookDelete.classList.add("deleteBtn");
  bookCard.appendChild(bookDelete);

  cards.appendChild(bookCard);
}

// adding books to library
function addBookToLibrary(book) {
    myLibrary.push(book);
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

console.log("c");



//  -----------------adding book from form-----------------
const formElem = document.querySelector("#newBookForm");
formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-new
  new FormData(formElem);
  addBookModal.style.display = "none";
});

formElem.addEventListener("formdata", (e) => {
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
  formElem.reset();
})

