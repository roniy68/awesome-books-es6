import Book from './modules/Book.js';
import BookCollection from './modules/BookCollection.js';
import { DateTime } from './modules/luxon.js';

// Add a clock
const clockElement = document.getElementById('date');
const clock = () => {
  clockElement.textContent = DateTime.now().toISO();
};
setInterval(clock, 1000);

// load booklist in main page 'display-book' section
function loadBooksList() {
  const displaySection = document.querySelector('.display-book-container');
  const books = new BookCollection();
  while (displaySection.firstChild) {
    displaySection.removeChild(displaySection.firstChild);
  }
  let i = 1;
  books.getBooks().forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    if (i % 2 === 0) { bookDiv.classList.add('book-card-grey'); }
    i += 1;
    bookDiv.innerHTML = `<div class='text-content'>
      <h4>"${book.title}"</h2>
      <h4>by ${book.author}</h3>
      </div>
    `;
    const removeButton = document.createElement('div');
    removeButton.classList.add('button-remove');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
      books.removeBook(book);
      loadBooksList();
    };
    bookDiv.appendChild(removeButton);
    displaySection.appendChild(bookDiv);
    displaySection.appendChild(document.createElement('hr'));
  });
}

window.onload = () => {
  // initialise booklist for the first time  with null array
  if (localStorage.getItem('book-list') === null) {
    const books = [];
    localStorage.setItem('book-list', JSON.stringify(books));
  }
  loadBooksList();
};

const bookForm = document.getElementById('form-book-submit');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
bookForm.onsubmit = (event) => {
  event.preventDefault();
  const books = new BookCollection();
  /* eslint-disable no-undef */
  books.addBook(new Book(bookTitle.value, bookAuthor.value));
  loadBooksList();
  bookForm.reset();
};

const listbtn = document.getElementById('list-books-link');
const addBookBtn = document.getElementById('add-books-link');
const contactBtn = document.getElementById('contact-link');

const displayBk = document.querySelector('.display-book');
const addBk = document.querySelector('.add-book');
const contact = document.querySelector('.contact-section');
listbtn.onclick = () => {
  displayBk.style.display = 'block';
  addBk.style.display = 'none';
  contact.style.display = 'none';
};

addBookBtn.onclick = () => {
  displayBk.style.display = 'none';
  addBk.style.display = 'block';
  contact.style.display = 'none';
};

contactBtn.onclick = () => {
  displayBk.style.display = 'none';
  addBk.style.display = 'none';
  contact.style.display = 'block';
};