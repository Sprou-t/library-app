//create a library array to store all my book objs
let library=[]
// [{title:'Hobbit', author:'J.R.R Tolkien', page:'250'}, {title:'Percy Jackson', author:'Rick Riordan', page:'350'}];

//obj constructor
function Book(title,author,page){
    this.title = title;
    this.author = author;
    this.page = page;
}

Book.prototype.info = function() {
    return `This book is ${this.title} by ${this.author}. Page: ${this.page}`;
};

//create 

//take user input & store the new book obj into array
    function add_book_to_lib(){
        //prompt user about the book info using forms in html
        //take input, create obj and put obj into array
        const enterButton = document.querySelector('.submit');
        enterButton.addEventListener('click',(e)=>{
            e.preventDefault();
            let input1=document.querySelector('#title');
            let input2=document.querySelector('#author');
            let input3=document.querySelector('#page');
            //get all the values
            const value1 = input1.value;
            const value2 = input2.value;
            const value3 = input3.value;
            //use the values to create the obj
            let newBook = new Book(value1,value2,value3);
            //Add the object to the array
            library.push(newBook);
            console.log(library);
            
        })
    }

//create button-onclick event that pops up a form 
function pop_up_form(){
    const btn = document.querySelector('.open-button');
    btn.addEventListener('click', ()=>{
        document.querySelector('#myForm').style.display = 'block';
    })
}

pop_up_form();
add_book_to_lib();