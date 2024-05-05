//create a library array to store all my book objs
let booklist=[];

//obj constructor
function Book(title,author,page){
    this.title = title;
    this.author = author;
    this.page = page;
}

//hv no use for this now
Book.prototype.info = function() {
    return `This book is ${this.title} by ${this.author}. Page: ${this.page}`;
};

//create button-onclick event that pops up a form 
function pop_up_form(){
    const btn = document.querySelector('.open-button');
    btn.addEventListener('click', ()=>{
        document.querySelector('#myForm').style.display = 'block';
    })
}

//take user input & store the new book obj into array
function add_book_to_lib(){
    //prompt user about the book info using forms in html
    //take input, create obj and put obj into array
    const enterButton = document.querySelector('.submit');
    enterButton.addEventListener('click',(e)=>{
        e.preventDefault(); //prevent form from reloading aft submitting when i press the button as my books data will be lost
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
        booklist.push(newBook);

        // // Display the books on the webpage
         displayBooks();

        // Reset the form inputs
        document.querySelector('.form-container').reset();
    })
}

//loop thru the array to display all the books on the webpage
function displayBooks(){
    let display_panel = document.querySelector('.display_panel');
    display_panel.innerHTML = ''; // Clear previous content
    //loop w .foreach()
    booklist.forEach(book=>{
        //add html content in .display_panel div
            //create each div for each book
        let bookdiv = document.createElement('div');

            //create each para of each bk & append them to the div
        let titlepara = document.createElement('p');
        titlepara.textContent = `Title: ${book['title']}`;
        bookdiv.appendChild(titlepara);
        let authorpara = document.createElement('p');
        authorpara.textContent = `Author: ${book.author}`;
        bookdiv.appendChild(authorpara);
        let pagepara = document.createElement('p');
        pagepara.textContent = `Page number: ${book.page}`;
        bookdiv.appendChild(pagepara);
        //append bookdiv to display_panel
        display_panel.appendChild(bookdiv);
    })
}

pop_up_form();
add_book_to_lib();
displayBooks();