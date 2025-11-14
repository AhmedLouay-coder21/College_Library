from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel

#create an instance from fastapi
server = FastAPI()


#The books info written in JSON
books = {
    1: {
        "book_id":1,
        "title":"OliverTwist",
        "author":"CharlesDickens",
        "yearOfPublish":1838,
        "numberOfPages":608,
        "rate":3.88,
        "available_copies": 3
    },
    2:{
        "book_id":2,
        "title":"Around the World in Eighty Days",
        "author":"Jules Verne",
        "yearOfPublish":1872,
        "numberOfPages":252,
        "rate":3.95,
        "available_copies": 1
    },
    3:{
        "book_id":3,
        "title":"Black Beauty",
        "author":"Anna Sewell",
        "yearOfPublish":1877,
        "numberOfPages":245,
        "rate":4.00,
        "available_copies": 4

    }
}


#endpoints

##################################### GET #####################################

#Checking the server
@server.get("/")
def health():
    return {"health": "OK", "status":"success"}

#get all the books from the server
@server.get("/books")
def showAllBooks():
    return  {"books": books, "status":"success"}

#get a specific book from the server
@server.get("/books/{book_id}")
def showBook(book_id:int):
    if book_id not in books:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Book not found")
    
    book = books[book_id]
    if book:
        return  {"book": [book_id,book], "status":"success"}
    else:
        return {"error":"book Not found","status":"failure"}
    

##################################### POST #####################################

class bookDetails(BaseModel):
    book_id:int
    title:str
    author:str
    yearOfPublish:int
    numberOfPages:int
    rate:float
    available_copies:int

#Add new book to the library
@server.post("/books/{new_id}", status_code=status.HTTP_201_CREATED)
def addNewBook(bookInfo: bookDetails):
    # create new id
    new_id = max(books.keys()) + 1

    book = bookInfo.model_dump()
    #add the new book
    books[new_id] = book

    return {"book": books[new_id], "status":"added successfully!"}

##################################### UPDATE #####################################

#Update all the details of the book
@server.put("/books/{book_id}", status_code = status.HTTP_205_RESET_CONTENT)
def updateBookDetails(bookDetails: bookDetails, book_id:int):
    book = bookDetails.model_dump()
    books[book_id] = book

    return {"book":book, "status":"success"}

#This class is made to make it possible to update some parts only of a specific book
class partiallyBook(BaseModel):
    book_id:int | None
    title:str | None
    author:str | None
    yearOfPublish:int | None
    numberOfPages:int | None
    rate:float | None
    available_copies:int | None

#update some parts only of a specific book
@server.patch("/books/{book_id}", status_code = status.HTTP_206_PARTIAL_CONTENT)
def partiallyUpdateBook (book_id:int ,bookDetails: partiallyBook):
    if book_id not in books:
        raise HTTPException(status_code=404, detail="Book not found")
    
    updated_fields = bookDetails.model_dump(exclude_unset=True)
    books[book_id].update(updated_fields)

    return {"book":books[book_id], "status":"updated"}

class BorrowStatus(BaseModel):
    available_copies: int

#Decrease the number of books in case of Borrow
@server.patch("/books/{book_id}/borrow", status_code = status.HTTP_206_PARTIAL_CONTENT)
def borrowBook(book_id: int):
    if book_id not in books:
        raise HTTPException(status_code=404, detail="Book not found")
    
    #In case of no available copies borrowing is not allowed
    if books[book_id]["available_copies"] <= 0:
        raise HTTPException(status_code=400, detail="No copies available to borrow")
    
    books[book_id]["available_copies"] -= 1

    return {"book": books[book_id], "status": "Number of books updated"}

#Increase the number of the books in case of Return
@server.patch("/books/{book_id}/return", status_code = status.HTTP_206_PARTIAL_CONTENT)
def borrowReturn(book_id: int):
    if book_id not in books:
        raise HTTPException(status_code=404, detail="Book not found in the database")
    
    books[book_id]["available_copies"] += 1

    return {"book": books[book_id], "status": "Number of books updated"}

##################################### DELETE #####################################

#delete all the books
@server.delete("/books")
def deleteAllBooks():
    books = {}
    return {"books": books,"status":"All deleted"}

# delete specific book
@server.delete("/books/{book_id}")
def deleteBook(book_id:int):
    if book_id in books.keys():
        books.pop(book_id)
        return {"books": books, "status": "delete"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="book not found")