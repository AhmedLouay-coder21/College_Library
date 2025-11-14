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
- A web browser
- (Optional but recommended) [virtualenv](https://virtualenv.pypa.io/) or similar

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
Link: 

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

