// import {storeBooksToStorage} from './book-crud.js'

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

export default Book;