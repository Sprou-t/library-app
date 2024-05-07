//create a library array to store all my book objs
let booklist=[];


//global element reference
const open_btn = document.querySelector('.open-button');
const formdiv = document.querySelector('.form-popup');
const form = document.querySelector('.form-container');
const elementsToBlur = document.querySelectorAll('body :not(.form-container)');
const enterButton = document.querySelector('.submit');
let display_panel = document.querySelector('.display_panel');
let status_label = document.querySelector('#status_label');
let close=document.querySelector('.close');
let readStatus = document.querySelector('#status');
let addstatus = false;
let changestatus = false;

//dynamic global element reference
let statusDiv;
let formPageInput;
let formPageInputValue;

//obj constructor
function Book(id,title,author,pageInput){ //obj created: Book(id = x, title = y, author = z, page = m). We can access the key to the value pair
   this.id = id; //key = value pair
   this.title = title;
   this.author = author;
   this.pageInput = pageInput;
}



// function formPopUp()
//create button-onclick event that pops up a form
open_btn.addEventListener('click', ()=>{
   formdiv.showModal();
})



//function formClose
//close the form when user clicks close
close.addEventListener('click',()=>{
    readStatus.checked = false;
    addstatus = false;
    
    // Clear input fields and hide additional elements related to "Already read?" status
    if (statusDiv) {statusDiv.remove();}
    if (formPageInput) {formPageInput.remove();}
    formdiv.close();
    
})



// function generateReadStatus()
//When click on the checkbox, generate an additional status of read and pages for pop up
    //displays the info in display
readStatus.addEventListener('click',()=>{
//add info after clicking
   if (readStatus.checked && !addstatus){
       statusDiv = document.createElement('span');
       statusDiv.classList.add('statusDiv');
       statusDiv.textContent='Pages read:';


       formPageInput = document.createElement('input');
       formPageInput.classList.add('formPageInput');
       formPageInput.setAttribute('name','formPageInput');
       formPageInput.placeholder = 'Number of pages read';


       form.insertBefore(statusDiv,status_label);
       form.insertBefore(formPageInput,status_label);


       addstatus = true;
   }


   else{
       //remove the inserted elements
       statusDiv = document.querySelector('.statusDiv')
       formPageInput = document.querySelector('.formPageInput')
       formPageInput.remove();
       statusDiv.remove();


       addstatus = false;
   }
})



// function library_function()
//take user input & use the info to create  store a new obj, store it in array
   //get the values of all user input when 'submit' clicked
enterButton.addEventListener('click',(e)=>{
   e.preventDefault(); //prevent form from reloading aft submitting when i press the button as my books data will be lost
   let input1=document.querySelector('#id');
   let input2=document.querySelector('#title');
   let input3=document.querySelector('#author');
   let input4 = document.querySelector('.formPageInput');
   
   //get all the values
   const value1 = input1.value;
   const value2 = input2.value;
   const value3 = input3.value;
   const value4 = input4 ? input4.value : '';
   let newBook
   if(value1 && value2 && value3 && value4){
       //use the values to create the obj
       newBook = new Book(value1,value2,value3,value4);
       booklist.push(newBook);
   }

   else{
    newBook = new Book(value1,value2,value3,'Unread')
    booklist.push(newBook);
   }
        //display all the books from the array
       displayBooks();
       // Reset the form inputs
       document.querySelector('.form-container').reset();
       formdiv.close();
       // Clear input fields and hide additional elements related to "Already read?" status
       document.querySelector('#status').checked = false;
       document.querySelector('.formPageInput').remove();
       document.querySelector('.statusDiv').remove();
       addstatus = false;     
})




//loop thru the array to display all the books on the webpage
function displayBooks() {
 // clear the content in display_panel to avoid duplication
 display_panel.textContent = '';//when textContent set, all child nodes r removed & replaced by new text node


 // Loop through the booklist array
 booklist.forEach(book => {
   // Create a new div element for each book
   let bookdiv = document.createElement('div');
  
   // Create paragraphs for each book detail
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


   
// Create the book card page input for each book and set its value
    let pageStatus = document.createElement('span');
    pageStatus.textContent = 'Status: ';
    let bookCardPageInput = document.createElement('input');
    bookCardPageInput.classList.add('page');
    bookCardPageInput.setAttribute('name', 'bookCardPageInput');
    if (book.pagesRead !== 'Unread') {
        bookCardPageInput.value = `Page ${book.pagesRead}`; // Display page number if read
    } else {
        bookCardPageInput.value = 'Unread'; // Display 'Unread' otherwise
    }


    bookdiv.appendChild(pageStatus)
    bookdiv.appendChild(bookCardPageInput);
  
   let cancelButton = document.createElement('button');
   cancelButton.classList.add('cancel');
   cancelButton.textContent=`Cancel`;
   bookdiv.appendChild(cancelButton);


   // Append the book details div to the display panel
   display_panel.appendChild(bookdiv);
 });
}


//function removeBookFromLibrary()
// Use event delegation by adding an event listener to the display panel
display_panel.addEventListener('click',(e)=>{
   // Check if the clicked element is a cancel button
   if (e.target.classList.contains('cancel')) {
       // Traverse up the DOM tree to find the parent book div
       let bookCard = e.target.parentNode; //find parent of cancel button
       //find the index of the canceled book in the array by comparing the child element of div with the properties of bk obj
       let idElement = bookCard.querySelector('.id');
      
      
       let index = booklist.findIndex(book => {
           return book.id ===idElement.textContent });//note that i do not need to parseInt since it's ald an int!!!
       // array.splice(indexToRemove, qty of item to remove)
       booklist.splice(index, 1);
       bookCard.textContent='';
       displayBooks();//clear outdated list and update with the new look after deleting
   }
})


     
