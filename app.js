// Book Constructor
function Book(title, author, isbn) {
	this.title = title
	this.author = author
	this.isbn = isbn
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
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

// Show alert
UI.prototype.showAlert = function (message, className) {
	// Create div
	const div = document.createElement("div")
	div.className = `alert ${className}` // adds classes
	div.appendChild(document.createTextNode(message)) // adds text
	const container = document.querySelector(".container") // gets parent element
	const form = document.querySelector("#bookForm") // gets form
	container.insertBefore(div, form) // Inserts alert
	setTimeout(function () {
		document.querySelector(".alert").remove()
	}, 3000)
}

// Clear fields
UI.prototype.clearFields = function () {
	document.getElementById("title").value = ""
	document.getElementById("author").value = ""
	document.getElementById("isbn").value = ""
}

// Event Listeners
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

		// show success alert
		ui.showAlert("Book Added", "success")
	}
})
