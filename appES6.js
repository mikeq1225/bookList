class Book {
	constructor(title, author, isbn) {
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}

class UI {
	addBookToList(book) {
		const list = document.getElementById("bookList")
		const row = document.createElement("tr") // Create tr element
		// Insert columns
		row.innerHTML = ` 
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#0" class="delete">X</a></td>
  `
		list.appendChild(row)
	}

	deleteBook(target) {
		if (target.className === "delete") {
			target.parentElement.parentElement.remove()
		}
	}

	showAlert(message, className) {
		// Create div
		const div = document.createElement("div")
		div.className = `alert ${className}` // adds classes
		div.appendChild(document.createTextNode(message)) // adds text
		const container = document.querySelector(".container") // gets parent element
		const form = document.querySelector("#bookForm") // gets form
		container.insertBefore(div, form) // Inserts alert
		setTimeout(function () {
			document.querySelector(".alert").remove()
		}, 2000)
	}

	clearFields() {
		document.getElementById("title").value = ""
		document.getElementById("author").value = ""
		document.getElementById("isbn").value = ""
	}
}

// Local storage class
class Store {
	static getBooks() {
		let books
		if (localStorage.getItem("books") === null) {
			books = []
		} else {
			books = JSON.parse(localStorage.getItem("books"))
		}
		return books
	}

	static displayBooks() {
		const books = Store.getBooks()
		books.forEach((book) => {
			const ui = new UI()
			ui.addBookToList(book)
		})
	}

	static addBook(book) {
		const books = Store.getBooks()
		books.push(book)
		localStorage.setItem("books", JSON.stringify(books))
	}

	static removeBook(isbn) {
		const books = Store.getBooks()
		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1)
			}
		})
		localStorage.setItem("books", JSON.stringify(books))
	}
}

// Event listener for DOM load
document.addEventListener("DOMContentLoaded", Store.displayBooks)

// Event Listener for add book
document.getElementById("bookForm").addEventListener("submit", function (e) {
	e.preventDefault()
	// Getting form values
	const title = document.getElementById("title").value
	const author = document.getElementById("author").value
	const isbn = document.getElementById("isbn").value

	// Instantiate a book
	const book = new Book(title, author, isbn)

	//  Instantiate UI
	const ui = new UI()

	// Validate
	if (title === "" || author === "" || isbn === "") {
		// error message
		ui.showAlert("Please fill in all fields", "error")
	} else {
		// clears fields
		ui.clearFields()

		// adds book to list
		ui.addBookToList(book)

		// add to local storage
		Store.addBook(book)

		// show success alert
		ui.showAlert("Book Added", "success")
	}
})

// Event Listener for delete book
document.getElementById("bookList").addEventListener("click", function (e) {
	e.preventDefault()
	//  Instantiate UI
	const ui = new UI()

	// deletes book
	ui.deleteBook(e.target)

	// delete book from local storage
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

	// shows alert message
	ui.showAlert("Book Deleted", "success")
})
