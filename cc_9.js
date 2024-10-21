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

// 5. Example of Library System Usage
// Create sections
const fiction = new Section("Fiction");
const science = new Section("Science");

// Create books
const book1 = new Book("1984", "George Orwell", "1234567890");
const book2 = new Book("Brave New World", "Aldous Huxley", "0987654321");
const book3 = new Book("The Selfish Gene", "Richard Dawkins", "1122334455");

// Add books to sections
fiction.addBook(book1);
fiction.addBook(book2);
science.addBook(book3);

// Create patrons
const regularPatron = new Patron("John Doe");
const vipPatron = new VIPPatron("Jane Smith", true);

// Regular patron tries to borrow a book
regularPatron.borrowBook(book1);

// VIP patron tries to borrow a book (has priority)
vipPatron.borrowBook(book1); // Book already borrowed, will show not available

// Return the book
regularPatron.returnBook(book1);
vipPatron.borrowBook(book1); // Now the VIP can borrow

// List books and availability
fiction.listBooks();
science.listBooks();

// Calculate total available books in each section
console.log(`Total available books in Fiction: ${fiction.getAvailableBooks()}`);
console.log(`Total available books in Science: ${science.getAvailableBooks()}`);

