class Book{
  // the constructor...
  constructor (id, title, author, yearOfPublish, numberOfPages, rate, numberOfCopies) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.yearOfPublish = yearOfPublish;
  this.numberOfPages = numberOfPages;
  this.rate = rate;
  this.numberOfCopies = numberOfCopies;
  }
}
class library
{
  constructor ()
  {
    this.books = [];
    this.nextId = 1;
  }
  addBookToLibrary(title, author, yearOfPublish, numberOfPages, rate, numberOfCopies) {
    // take params, create a book then store it in the array
    const year = Number(yearOfPublish);
    const pages = Number(numberOfPages);
    const rateNum = Number(rate);
    const copies = Number(numberOfCopies);

    // VALIDATION
    if (typeof title !== "string" || !title.trim()) {
      alert("Title must be a non-empty text.");
      return;
    }

    if (typeof author !== "string" || !author.trim()) {
      alert("Author must be a non-empty text.");
      return;
    }

    if (!Number.isInteger(year) || year <= 0) {
      alert("Year of publish must be a positive integer.");
      return;
    }

    if (!Number.isInteger(pages) || pages <= 0) {
      alert("Number of pages must be a positive integer.");
      return;
    }

    if (Number.isNaN(rateNum) || rateNum < 0 || rateNum > 5) {
      alert("Rate must be a number between 0 and 5.");
      return;
    }

    if (!Number.isInteger(copies) || copies < 0) {
      alert("Number of copies must be a non‑negative integer.");
      return;
    }
    const book = new Book(this.nextId, title, author, yearOfPublish, numberOfPages, rate, numberOfCopies);
    this.books.push(book);
    this.nextId += 1;
  }
  // display books info in a table
  displayBookInfo(i)
  {
    const addCopyButton = document.createElement('img');
    const deleteCopyButton = document.createElement('img');
    const newLine = document.createElement("tr");

      addCopyButton.src = "https://cdn-icons-png.flaticon.com/512/6711/6711405.png";
      addCopyButton.id = "addCopyButton";
      addCopyButton.alt = "edit icon";
      addCopyButton.style.cursor = "pointer";
      addCopyButton.style.height = "30px";
      addCopyButton.style.width = "30px";

      deleteCopyButton.src = "https://cdn-icons-png.flaticon.com/512/458/458594.png";
      deleteCopyButton.id = "deleteCopyButton";
      deleteCopyButton.alt = "edit icon";
      deleteCopyButton.style.cursor = "pointer";
      deleteCopyButton.style.height = "30px";
      deleteCopyButton.style.width = "30px";

      addCopyButton.addEventListener("click", () => {
        this.books[i].numberOfCopies +=1;
        numberOfCopies.textContent = this.books[i].numberOfCopies;
        newLine.appendChild(numberOfCopies);
        numberOfCopies.appendChild(addCopyButton);
        numberOfCopies.appendChild(deleteCopyButton);
      });

      deleteCopyButton.addEventListener("click", () => {
        if (this.books[i].numberOfCopies - 1 >= 0)
        {
          this.books[i].numberOfCopies -=1;
            numberOfCopies.textContent = this.books[i].numberOfCopies;
            newLine.appendChild(numberOfCopies);
            numberOfCopies.appendChild(addCopyButton);
            numberOfCopies.appendChild(deleteCopyButton);
        }
        else
        {
          alert("insufficient number of books");
        }
      });

      const deleteIcon = document.createElement('img');
      deleteIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAYFBMVEUAAAD////g4ODGxsaGhobx8fH4+PgtLS1JSUm2trYYGBgiIiLPz8/c3Nw9PT1DQ0N6eno1NTXW1taSkpK/v7+tra1zc3NYWFjn5+egoKCYmJgQEBCnp6dSUlJlZWWAgIDj3+fQAAADY0lEQVR4nO2ca5uyIBCGVzxiWmmeKtP//y/X2nYdfDPABmz3nedbXDDc4chJmI+P5Yrr/nAsy7K4yv1SwYuCl0evC18w/IJOeeDMi/GtdaLw+AToLre2y1QxOZPjBK1FpFihmb6U76xBuapMQ2NZ8qw4UWcaqOw4lkY7XeXbYDroMTlOcjbOVPu6UM7BOFSuzeQ4sWGmy7TCwP9X056+NAxViES82m0mOc5xWJ/EZ+yb7a0iobZktrKMW/QqT2B69lqVMGdqFAq6+fOHcha6M6NQ0IWPz7MKr0RnkCmETj718KngaHQyCFWDenJZZuh/3CBUBeqRzpXgPygMQvU6r/nFEhR8Ip4scxTYgdoDqL0sc4YL1fGENQ/GNGFQezToiZJlbljq9qpLMXF8MyyWKTFxuSVMNSptFenP4l5TrwDVy83gKlGAUl7TYalRgCrlZnClstyx7OdqUFY7hF8N9WaPr3OLouCNbaiAX3cC5+axntyAOc11DKtCsRko63051Nzsei8vak5zg81bQlXyogR1U7cmlPuOUHNLi1pe1D7ULk+SPGUpGwSy+wxXwPT151BhPlSssoUFRkDkHZMMrAHUVjI/AiUrXKgtMK257UhQBEVQBEVQC6DAMAP2ETdNcx/AGgYMtt+prHHH3aaY/2RugI3t8mFmBmpMDaIxGaxfGYACu/tg13YFqJSgCIqgCIqgCIqgCIqgCOpPQYFvvCtDgf02ZKgdONygeT7cDpTstBNBERRBERRBERRBEdSfgAIGCWotKM3pcGoFSvOWD0ERFEER1C+CAoeICIqgCIqgkKGiMVUXCtxYfUsocN8TG0qPiaAIyiQUuNGCAQUv3f4XUM5lTAbXt+BJs8d9HQ4UvJq9HQXiEoRjKvxYlo3JYNOgRodCEA4UcgSN7h2hcFoKOawATkshX5avUKDmrtks1B4FCjnUiIcC5eOGkEqWQ8EAKK7mfulTCUGZNMsKtyITvLZqoV1db82ESGqBW97UHgcd7vIk+s53LXO8FeeFeHVX+6S78JfMiGm7xdk8lDSKxwpNpRKSYKrNkphcGloWFm5rFmphTKrOZDSOxbO0+lkYytf0QpilnVbwQHU1KhFKZnU2EiZkPhaaKlarFCVTXb4byWuVKqwOLXdRVJSnXgHpE40+ZKC0OuQOAAAAAElFTkSuQmCC"
      deleteIcon.style.cursor = "pointer";
      deleteIcon.style.marginTop = "20px";
      deleteIcon.style.margin = "auto";
      deleteIcon.style.height = "30px";
      deleteIcon.addEventListener("click", () => {
        if (confirm("Are you sure that you want to delete this book?")) 
          {
          this.books.splice(i,1);
          newLine.remove();
          alert("The book has been deleted!");
          } 
        else 
        {
          alert("The deletion is canceled");
        }
      });
      Books.appendChild(newLine);

      // ID
      const idCell = document.createElement("td");
      idCell.style.backgroundColor = "#4e9fe5";
      idCell.textContent = this.books[i].id;

      // Title
      const title = document.createElement("td");
      title.style.backgroundColor = "aquamarine";
      title.textContent = this.books[i].title;

      // Author
      const author = document.createElement("td");
      author.style.backgroundColor = "#4e9fe5";
      author.textContent = this.books[i].author;

      // Year of publish
      const yearCell = document.createElement("td");
      yearCell.style.backgroundColor = "aquamarine";
      yearCell.textContent = this.books[i].yearOfPublish;

      // Number of pages
      const numberOfPages = document.createElement("td");
      numberOfPages.style.backgroundColor = "#4e9fe5";
      numberOfPages.textContent = this.books[i].numberOfPages;

      // Rate
      const rateCell = document.createElement("td");
      rateCell.style.backgroundColor = "aquamarine";
      rateCell.textContent = this.books[i].rate;

      // numberOfCopies
      const numberOfCopies = document.createElement("td");
      numberOfCopies.classList.add("numberOfCopiesCell");
      numberOfCopies.style.backgroundColor = "#4e9fe5";

      title.textContent = this.books[i].title;
      author.textContent = this.books[i].author;
      numberOfPages.textContent = this.books[i].numberOfPages;
      numberOfCopies.textContent = this.books[i].numberOfCopies;
      newLine.appendChild(deleteIcon);
      newLine.appendChild(idCell);
      newLine.appendChild(title);
      newLine.appendChild(author);
      newLine.appendChild(yearCell);
      newLine.appendChild(numberOfPages);
      newLine.appendChild(rateCell);
      newLine.appendChild(numberOfCopies);
      numberOfCopies.appendChild(addCopyButton);
      numberOfCopies.appendChild(deleteCopyButton);
  }
}
const myLibrary = new library;
const Books = document.getElementById("Books");
const newBookButton = document.getElementById("newBook");
const form = document.getElementById("formContent");

newBookButton.addEventListener("click", () => {
  form.classList.add("visible");

});
form.addEventListener("submit", function(event) {
  //prevent from reloading the page on submit
  event.preventDefault();
  // getting the data the user submitted from the form.
  formTitle = document.getElementById("title").value;
  formYear = document.getElementById("yearOfPublish").value;
  formAuthor = document.getElementById("author").value;
  formPages = document.getElementById("Pages#").value;
  formRate = document.getElementById("rate").value;
  formNumberOfCopies = document.getElementById("numberOfCopies").value;
  const copies = Number(formNumberOfCopies);

  //add the book info to the books array
  myLibrary.addBookToLibrary(formTitle, formAuthor, formYear, formPages, formRate, copies);
  //getting the last index in the array to add the last book
  const lastBookNumber = myLibrary.books.length - 1;
  //display the new book info
  myLibrary.displayBookInfo(lastBookNumber);
  
});
//a loop that gets all the books from the array to display them
for(let i = 0; i < myLibrary.books.length - 1; i++)
{
  myLibrary.displayBookInfo(i);
}