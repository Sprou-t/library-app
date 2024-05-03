//create a library array to store all my book objs
let library=[{title:'Hobbit', author:'J.R.R Tolkien', page:'250'}, {title:'Percy Jackson', author:'Rick Riordan', page:'350'}];

//obj constructor
function Book(title,author,page){
    this.title = title;
    this.author = author;
    this.page = page;
}

Book.prototype.info = () => `This book is the ${this.title} by ${this.author}. Page:${this.Page}`;

//create 

//take user input & store the new book obj into array
    function add_book_to_lib(){
        //prompt user about the book info using forms in html
        //take input, create obj and put obj into array
    }