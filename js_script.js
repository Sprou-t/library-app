//create a library array to store all my book objs
let booklist=[];


//global element reference
const open_btn = document.querySelector('.open-button');
const formdiv = document.querySelector('.form-popup');
const form = document.querySelector('.form-container');
const enterButton = document.querySelector('.submit');
let display_panel = document.querySelector('.display_panel');
let readStatusButton = document.querySelector('#readStatusButton');
let closePopUpForm=document.querySelector('.close');

//global variable for the 5 properties of the obj
let id;
let title;
let author;
let pagesRead;
let pages;

//obj constructor
function Book(id,title,author,readstatus){ //obj created: Book(id = x, title = y, author = z, page = m). We can access the key to the value pair
    this.id = id; //key = value pair
    this.title = title;
    this.author = author;
    this.readstatus = readstatus
}


// function popUpForm()
//create button-onclick event that pops up a form
open_btn.addEventListener('click', ()=>{
   formdiv.showModal();
})



//function closeForm
//close the form when user clicks close
closePopUpForm.addEventListener('click',()=>{
    
    // Clear input fields and hide additional elements related to "Already read?" status
    document.querySelector('#id').value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    readStatusButton.checked = false;
    
    formdiv.close();
    
})


// function library_function()
//take user input & use the info to create  store a new obj, store it in array
   //get the values of all user input when 'submit' clicked
enterButton.addEventListener('click',(e)=>{
   e.preventDefault(); //prevent form from reloading aft submitting when i press the button as my books data will be lost
   let idValue=document.querySelector('#id').value;
   let titleValue=document.querySelector('#title').value;
   let authorValue=document.querySelector('#author').value;
   let formBookStatus = document.querySelector('#readStatusButton').checked;

   let newBook;

   if(idValue && titleValue && authorValue){
       //use the values to create the obj
       newBook = new Book(idValue,titleValue,authorValue,formBookStatus);
       booklist.push(newBook);
   }

   else{
    alert('Please key in all the values!')
   }
        //display all the books from the array
       displayBooks();
       // Reset the form inputs
       document.querySelector('.form-container').reset();
       formdiv.close();
})




//loop thru the array to display all the books on the webpage
function displayBooks() {
 // clear the content in display_panel to avoid duplication
display_panel.textContent = '';//when textContent set, all child nodes r removed & replaced by new text node


// Loop through the booklist array
booklist.forEach(book => {
   // Create a new div element for each book
   let bookdiv = document.createElement('div');
  
   // Create element for each book detail

    let idpara = document.createElement('p');
    idpara.classList.add('id');
    idpara.textContent = `${book.id}`;
    bookdiv.appendChild(idpara);


    let titlepara = document.createElement('p');
    titlepara.classList.add('title');
    titlepara.textContent = `Title:${book.title}`;
    bookdiv.appendChild(titlepara);


    let authorpara = document.createElement('p');
    authorpara.classList.add('author');
    authorpara.textContent = `Author:${book.author}`;
    bookdiv.appendChild(authorpara);


    // Create book card progress status
    let readIndBookStatus = document.createElement('button');
    readIndBookStatus.classList.add('readIndBookStatus');
    if(book.readstatus==true){
        readIndBookStatus.textContent = `Read`;
    }

    else{
        readIndBookStatus.textContent = `Not read`;
    }
    
    bookdiv.appendChild(readIndBookStatus);
        
    
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.textContent=`Cancel`;
    bookdiv.appendChild(cancelButton);


    // Append the book details div to the display panel
    display_panel.appendChild(bookdiv);

    // Attach event listener to the read status button for each book
    readIndBookStatus.addEventListener('click', () => {
        // Toggle read status text
        // if textcontent is 'read', change textcontent to not read, else change it to read(since original text content is not read)
        readIndBookStatus.textContent = readIndBookStatus.textContent === 'Read' ? 'Not read' : 'Read';

        // Update the read status of the book in the booklist array
        book.readstatus = readIndBookStatus.textContent === 'Read' ? 'true' : 'false';
    });
 });
}


function removeBookFromLibrary(){
    // Use event delegation by adding an event listener to the display panel
    display_panel.addEventListener('click',(e)=>{
    // Check if the clicked element is a cancel button
    if (e.target.classList.contains('cancel')) {
        // Traverse up the DOM tree to find the parent book div
        let bookCard = e.target.parentNode; //find parent of cancel button which is the bookcard
        //find the index of the canceled book in the array by comparing the child element of div with the properties of bk obj
        let idOfCancelledBook = bookCard.querySelector('.id');
        
        
        let index = booklist.findIndex(book => {
            return book.id ===idOfCancelledBook.textContent }); //note that i do not need to parseInt since it's ald an int!!!
        // array.splice(indexToRemove, qty of item to remove)
        booklist.splice(index, 1);
        bookCard.textContent='';
        displayBooks();//clear outdated list and update with the new look after deleting
    }
    })
}
removeBookFromLibrary();
     
