//create a library array to store all my book objs
let booklist=[];

//global element reference
const open_btn = document.querySelector('.open-button');
const enterButton = document.querySelector('.submit');
let display_panel = document.querySelector('.display_panel');
let cancel=document.querySelector('.cancel');

//obj constructor
function Book(id,title,author,page){
    this.id = id;
    this.title = title;
    this.author = author;
    this.page = page;
}


//create button-onclick event that pops up a form 
function pop_up_form(){
    open_btn.addEventListener('click', ()=>{
        document.querySelector('#myForm').style.display = 'block';
    })
}

//take user input & store the new book obj into array
function add_book_to_lib(){
    //prompt user about the book info using forms in html
    //take input, create obj and put obj into array
    enterButton.addEventListener('click',(e)=>{
        e.preventDefault(); //prevent form from reloading aft submitting when i press the button as my books data will be lost
        let input1=document.querySelector('#id');
        let input2=document.querySelector('#title');
        let input3=document.querySelector('#author');
        let input4=document.querySelector('#page');
        //get all the values
        const value1 = input1.value;
        const value2 = input2.value;
        const value3 = input3.value;
        const value4 = input4.value;
        //use the values to create the obj
        let newBook = new Book(value1,value2,value3,value4);
        console.log(newBook);
        //Add the object to the array
        booklist.push(newBook);

        displayBooks();
        // Reset the form inputs
        document.querySelector('.form-container').reset();
        
    })
}

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

    let pagepara = document.createElement('p');
    pagepara.classList.add('page');
    pagepara.textContent = `Page Number:${book.page}`;
    bookdiv.appendChild(pagepara);

    let statusButton = document.createElement('button');
    statusButton.classList.add('status');
    statusButton.textContent=`Not read`;
    bookdiv.appendChild(statusButton);

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.textContent=`Cancel`;
    bookdiv.appendChild(cancelButton);

    // Append the book details div to the display panel
    display_panel.appendChild(bookdiv);
  });
}


    // Use event delegation by adding an event listener to the display panel
    display_panel.addEventListener('click',(e)=>{
        // Check if the clicked element is a cancel button
        if (e.target.classList.contains('cancel')) {
            // Traverse up the DOM tree to find the parent book div
            let bookCard = e.target.parentNode; //find parent of cancel button
            //find the index of the canceled book in the array by comparing the child element of div with the properties of bk obj
            let idElement = bookCard.querySelector('.id').textContent;
            // Iterate over the booklist array to find the matching book
            for (let i = 0; i < booklist.length; i++) {
                // Check if the id of the current book matches the id from the clicked element
                if (booklist[i].id === idElement) {
                    // Remove the matching book from the array
                    booklist.splice(i, 1);
                    break; // Exit the loop since we found and removed the book
                }
            }
            
            bookCard.textContent='';
            displayBooks();
        }
    }
)



function changeReadStatus(){

}

pop_up_form();
add_book_to_lib();
