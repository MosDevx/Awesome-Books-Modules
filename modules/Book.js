// import {storeBooksToStorage} from './book-crud.js'
const bookList = document.getElementById('book-list');
const newBookForm = document.getElementById('new-book-form');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const successSmall = document.getElementById('success-small');

class Book {
  static booksArray = []

  static count = 0

  static storageUpdater;

  static setUpdater(value) {
    Book.storageUpdater = value;
  }

  constructor(title, author) {
    this.title = title;
    this.author = author;

    Book.booksArray.push(this);
    if (typeof Book.storageUpdater === 'function') {
      Book.storageUpdater();
    }
  }

  deleteBook() {
    const i = Book.booksArray.indexOf(this);
    Book.booksArray.splice(i, 1);
    if (typeof Book.storageUpdater === 'function') {
      Book.storageUpdater();
    }
  }

  static getAllBooksArray() {
    return Book.booksArray;
  }

  static updateBooksArray(dataSource) {
    if (dataSource?.length) {
      const newArray = dataSource.map((rawBook) => {
        const book = new Book(rawBook.title, rawBook.author);
        return book;
      });

      Book.booksArray = [];
      Book.booksArray.push(...newArray);
    }
  }
}

function storeBooksToStorage() {
  const booksString = JSON.stringify(Book.getAllBooksArray());
  window.localStorage.setItem('BookData', booksString);
}

Book.setUpdater(storeBooksToStorage);

Book.updateBooksArray(JSON.parse(window.localStorage.getItem('BookData')));

function createBook(book) {
  const mainTr = document.createElement('tr');
  const pTitle = document.createElement('td');
  const pAuthor = document.createElement('td');
  const tdButton = document.createElement('td');
  const button = document.createElement('button');
  pTitle.textContent = book.title;
  pAuthor.textContent = book.author;
  button.textContent = 'delete';
  button.addEventListener('click', () => {
    const parent = tdButton.parentNode;
    bookList.removeChild(parent);
    book.deleteBook();
  });
  tdButton.appendChild(button);
  mainTr.append(pTitle, pAuthor, tdButton);
  return mainTr;
}

function populateOriginalBookList(books) {
  books.forEach((book) => {
    const bItem = createBook(book);
    bookList.append(bItem);
  });
}

function displayOneBook(book) {
  const bItem = createBook(book);
  bookList.append(bItem);
}

export default function displayBooks() {
  window.addEventListener('DOMContentLoaded', () => {
    const booksArray = Book.getAllBooksArray();
    if (booksArray.length) {
      populateOriginalBookList(booksArray);
    }
  });

  newBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = inputTitle.value;
    const author = inputAuthor.value;

    const newBook = new Book(title, author);
    displayOneBook(newBook);
    successSmall.style.display = 'block';

    setTimeout(() => {
      successSmall.style.display = 'none';
    }, 2000);

    newBookForm.reset();
  });
}