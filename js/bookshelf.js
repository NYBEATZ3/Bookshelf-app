/**
 * Bookshelf is an internal data structure
 * that manages Books.
 * @param {HTMLElement} htmlElement the element to render to
 * @param {Book[]} books an optional array of Books
 */
function Bookshelf(htmlElement, books = []) {
    this.books = books;
    this.htmlElement = htmlElement;
    this.visibleBooks = books;
    
  
    /**
     * Process an array of raw book information
     * to initialize Bookshelf properties
     * @param {{author: string[], language: string, subject: string[], title: string}[]} data an array of book data
     */
    this.seed = function (data) {
      // Load in the data from local storage if available
      const storedData = JSON.parse(localStorage.getItem('books'));
      if (storedData) {
        data = storedData;
      }
    
      // Load in the data
      data.forEach((bookInfo) => {
        const book = new Book(
          bookInfo.author,
          bookInfo.language,
          bookInfo.subject,
          bookInfo.title
        );
        this.addBook(book);
      });
    
      // Prepare and sort visible books
      this.visibleBooks = this.books;
      this.sortVisibleBooks((a, b) => a.title.localeCompare(b.title));
    
      this.render();
    };

    this.save = function () {
      localStorage.setItem('books', JSON.stringify(this.books));
    };
  
    /**
     * Add a book to the Bookshelf
     * @param {Book} book
     */
    this.addBook = function (book) {
      this.books.push(book);
    };
  
    /**
     * Use internal Book array to rerender the
     * existing DOM element for this Bookshelf.
     */
    this.render = function () {
      /* NOTE: Change render! This is currently a barebones template. */
      const ul = document.createElement("ul");
      const books = this.visibleBooks.map((b) => b.render());
      ul.replaceChildren(...books);
      this.htmlElement.replaceChildren(ul);
    };
  
    /**
     * @returns the number of favorite books
     */
    this.countFavoriteBooks = function () {
      return this.books.reduce(
        (count, book) => (book.isFavorite ? count + 1 : count),
        0
      );
    };
  
    /**
     * Filter visible books according to a given criteria function
     * @param {(book: Book) => boolean} criteria
     */
    this.filterVisibleBooks = function (criteria) {
      this.visibleBooks = this.books.filter(criteria);
      this.render();
    };
  
    /**
     * Sort visible books according to a given compare function
     * @param {(a: Book, b: Book) => number} compareFn
     */
    this.sortVisibleBooks = function (compareFn) {
      this.visibleBooks.sort(compareFn);
      this.render();
    };
    
  }