# Github repo link: https://github.com/AhmedLouay-coder21/College_Library
# College Library
A practice project that implements a simple library system using:
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** [FastAPI] using Python
The project demonstrates basic CRUD operations on books:
- **Create** – Add new books
- **Read** – View one or all books
- **Update** – Update book details or available copies
- **Delete** – Delete specific books or all books
---
## Table of Contents
1. [Features](#features)  
2. [Project Structure](#project-structure)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running the Backend (FastAPI)](#running-the-backend-fastapi)  
   - [Running the Frontend](#running-the-frontend)  
4. [API Documentation](#api-documentation)  
   - [Data Model](#data-model)  
   - [Endpoints](#endpoints)  
5. [Frontend Behavior](#frontend-behavior)  
6. [Examples](#examples)  
7. [Future Improvements](#future-improvements)  
8. [License](#license)
---
## Features
- Display a list of books in a table.
- Add new books through a form.
- Increase or decrease the number of available copies for a book.
- Delete individual books from the table.
- FastAPI backend exposing RESTful endpoints to:
  - List all books
  - Get a specific book
  - Add a book
  - Update a book (full or partial)
  - Borrow/return a book (change `available_copies`)
  - Delete one or all books
---
## Project Structure
```text
.
├── index.html          # Main frontend page
├── Library.js          # Frontend logic (Book & library classes, DOM manipulation)
├── styles.css          # Styling for the UI
└── myapi.py            # FastAPI backend (CRUD API for books)
```
### Frontend Files
- **index.html**
  - Contains the table displaying the books.
  - Contains the form for adding a new book.
- **Library.js**
  - Defines `Book` and `library` classes.
  - Handles adding books to an in-memory array and rendering them into the table.
  - Handles UI actions (add/delete copies, delete book, show form).
- **styles.css**
  - Provides layout and styling for the table, form, and background.
### Backend File
- **myapi.py**
  - Defines a FastAPI application with in-memory `books` data.
  - Implements multiple endpoints for CRUD and borrow/return operations.
---
## Getting Started
### Prerequisites
- [Python 3.10+](https://www.python.org/) (or compatible version)
- [pip](https://pip.pypa.io/)
- A web browser (Google chrome for instance)
### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/College_Library.git
   cd College_Library
   ```
2. **Create and activate a virtual environment (optional but recommended)**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS / Linux
   source venv/bin/activate
   ```
3. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn
   ```
   If you plan to add more dependencies, you can also create a `requirements.txt` file later.
---
## Running the Backend (FastAPI)
From the project root:
```bash
uvicorn myapi:server --reload
```
- The API will be available at: `http://127.0.0.1:8000`
- Interactive API docs (Swagger UI): `http://127.0.0.1:8000/docs`
- Alternative docs (ReDoc): `http://127.0.0.1:8000/redoc`
---
## Running the Frontend
## This project uses github pages for a fast review
## Link: https://ahmedlouay-coder21.github.io/College_Library/
## API Documentation
### Data Model
The backend uses `books` dictionary with the following fields:
```json
{
  "book_id": 1,
  "title": "OliverTwist",
  "author": "CharlesDickens",
  "yearOfPublish": 1838,
  "numberOfPages": 608,
  "rate": 3.88,
  "available_copies": 3
}
```
In Python (Pydantic model):
```python
class bookDetails(BaseModel):
    book_id: int
    title: str
    author: str
    yearOfPublish: int
    numberOfPages: int
    rate: float
    available_copies: int
```
### Endpoints

#### Health Check

- **GET** `/`
- **Description:** Check if the server is running.
- **Response:**
  ```json
  {
    "health": "OK",
    "status": "success"
  }
  ```

---

#### Get All Books

- **GET** `/books`
- **Description:** Return all books.
- **Response:**
  ```json
  {
    "books": {
      "1": { ... },
      "2": { ... },
      "3": { ... }
    },
    "status": "success"
  }
  ```

---

#### Get a Specific Book

- **GET** `/books/{book_id}`
- **Path Parameter:** `book_id` (int)
- **Description:** Return a single book by ID.
- **Success Response:**
  ```json
  {
    "book": [1, { ... }],
    "status": "success"
  }
  ```
- **Error Response (404):**
  ```json
  {
    "detail": "Book not found"
  }
  ```

---

#### Add a New Book

- **POST** `/books/{new_id}`
- **Body:** `bookDetails` JSON (all fields required)
- **Note:** The path parameter `{new_id}` is not used; the server always assigns `new_id = max(books.keys()) + 1`.
- **Request Example:**
  ```json
  {
    "book_id": 10,
    "title": "New Book Title",
    "author": "Author Name",
    "yearOfPublish": 2024,
    "numberOfPages": 300,
    "rate": 4.5,
    "available_copies": 5
  }
  ```
- **Success Response (201):**
  ```json
  {
    "book": {
      "book_id": 10,
      "title": "New Book Title",
      "author": "Author Name",
      "yearOfPublish": 2024,
      "numberOfPages": 300,
      "rate": 4.5,
      "available_copies": 5
    },
    "status": "added successfully!"
  }
  ```

---

#### Replace All Details of a Book

- **PUT** `/books/{book_id}`
- **Path Parameter:** `book_id` (int)
- **Body:** `bookDetails` JSON (all fields required)
- **Description:** Replace the entire book object for the given `book_id`.
- **Response:**
  ```json
  {
    "book": { ... },
    "status": "success"
  }
  ```

---

#### Partially Update a Book

- **PATCH** `/books/{book_id}`
- **Path Parameter:** `book_id` (int)
- **Body:** Any subset of fields defined in `partiallyBook`:
  ```python
  class partiallyBook(BaseModel):
      book_id: int | None
      title: str | None
      author: str | None
      yearOfPublish: int | None
      numberOfPages: int | None
      rate: float | None
      available_copies: int | None
  ```
- **Description:** Update only the provided fields of the book.
- **Request Example:**
  ```json
  {
    "rate": 4.2,
    "available_copies": 2
  }
  ```
- **Response:**
  ```json
  {
    "book": { ...updated book... },
    "status": "updated"
  }
  ```

---

#### Borrow a Book

- **PATCH** `/books/{book_id}/borrow`
- **Path Parameter:** `book_id` (int)
- **Description:** Decrease `available_copies` by 1.
- **Success Response:**
  ```json
  {
    "book": { ...updated book... },
    "status": "Number of books updated"
  }
  ```
- **Error Response (400):**
  ```json
  {
    "detail": "No copies available to borrow"
  }
  ```

---

#### Return a Book

- **PATCH** `/books/{book_id}/return`
- **Path Parameter:** `book_id` (int)
- **Description:** Increase `available_copies` by 1.
- **Response:**
  ```json
  {
    "book": { ...updated book... },
    "status": "Number of books updated"
  }
  ```

---

#### Delete All Books

- **DELETE** `/books`
- **Description:** Delete all books.
- **Note:** Currently, the implementation assigns a new local `books` variable; you may want to update it to clear the global `books` dictionary instead.
- **Response:**
  ```json
  {
    "books": {},
    "status": "All deleted"
  }
  ```

---

#### Delete a Specific Book

- **DELETE** `/books/{book_id}`
- **Path Parameter:** `book_id` (int)
- **Description:** Delete a book by ID.
- **Success Response:**
  ```json
  {
    "books": {
      "...": { ...remaining books... }
    },
    "status": "delete"
  }
  ```
- **Error Response (404):**
  ```json
  {
    "detail": "book not found"
  }
  ```

---

## Frontend Behavior

The frontend (`Library.js`) currently manages books in memory on the client side:

- When you click **“add new book”**, a form becomes visible.
- When you submit the form:
  - A new `Book` object is created and added to `myLibrary.books`.
  - The new book is rendered as a row in the table.
- Each row includes:
  - A delete icon to remove the book from the table and from `myLibrary.books`.
  - A cell showing the number of copies, with:
    - A **plus** icon to increase the number of copies.
    - A **minus** icon to decrease the number of copies (not below 0).

> At the moment, these UI changes do not synchronize with the FastAPI backend. You can enhance the project by connecting the frontend and backend via `fetch` requests.

---

## Examples

### Example: Fetch All Books

```bash
curl http://127.0.0.1:8000/books
```

### Example: Add a New Book

```bash
   {
    "book_id": 4,
    "title": "Example Book",
    "author": "Example Author",
    "yearOfPublish": 2020,
    "numberOfPages": 320,
    "rate": 4.2,
    "available_copies": 2
  }
```

---

