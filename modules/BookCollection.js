export default class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('book-list'));
  }

  getBooks() {
    return this.books;
  }

  addBook(book) {
    this.books.push(book);
    this.#writeLocalStorage();
  }

  removeBook(book) {
    this.books.splice(this.books.indexOf(book), 1);
    this.#writeLocalStorage();
  }

    #writeLocalStorage() {
    localStorage.setItem('book-list', JSON.stringify(this.books));
  }
}