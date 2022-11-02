import Book from './Book.js';

const bookList = document.getElementById('book-list');
const newBookForm = document.getElementById('new-book-form');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const successSmall = document.getElementById('success-small');

const createBook = (book) => {
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
};

const populateOriginalBookList = (books) => {
  books.forEach((book) => {
    const bItem = createBook(book);
    bookList.append(bItem);
  });
};

const storeBooksToStorage = () => {
  const booksString = JSON.stringify(Book.getAllBooksArray());
  window.localStorage.setItem('BookData', booksString);
};

Book.setUpdater(storeBooksToStorage);

Book.updateBooksArray(JSON.parse(window.localStorage.getItem('BookData')));

function displayOneBook(book) {
  const bItem = createBook(book);
  bookList.append(bItem);
}

const displayBooks = () => {
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
};

export default displayBooks;