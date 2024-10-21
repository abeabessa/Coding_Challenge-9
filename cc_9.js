cc_9.js

// 1. Book Class
class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this._isAvailable = true; // Default availability
    }

    getDetails() {
        return `${this.title} by ${this.author} (ISBN: ${this.ISBN})`;
    }

    get isAvailable() {
        return this._isAvailable;
    }

    set isAvailable(status) {
        this._isAvailable = status;
    }
}

// 2. Section Class
class Section {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable).length;
    }

    listBooks() {
        this.books.forEach(book => {
            console.log(`${book.getDetails()} - Available: ${book.isAvailable}`);
        });
    }

    calculateTotalBooksAvailable() {
        return this.getAvailableBooks();
    }
}

// 3. Patron Class
class Patron {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (book.isAvailable) {
            book.isAvailable = false;
            this.borrowedBooks.push(book);
            console.log(`${this.name} borrowed ${book.title}.`);
        } else {
            console.log(`${book.title} is not available.`);
        }
    }

    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.isAvailable = true;
            this.borrowedBooks.splice(index, 1);
            console.log(`${this.name} returned ${book.title}.`);
        } else {
            console.log(`${this.name} does not have this book.`);
        }
    }
}

// 4. VIPPatron Class (Inheritance)
class VIPPatron extends Patron {
    constructor(name, priority) {
        super(name);
        this.priority = priority;
    }

    borrowBook(book) {
        // VIP logic, for now, it behaves the same as Patron but can be extended
        super.borrowBook(book);
    }
}

