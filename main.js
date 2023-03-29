let myLibray = []
/**Books constructor, making book objects */
class Book{
    constructor(title,author,pages,read,imgUrl){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.imgUrl = imgUrl
    }
    get info(){
        return `${this.title} by ${this.author}, ${this} pages, ${read}`
    }
   
}
/**creating some default books that load with the page 
 * for the first time, and some other stuff on initial setup
 */
const book1 = new Book('How to win friends and influence people','Dale canergie',2323,'already read','https://cdn2.penguin.com.au/covers/original/9780091906818.jpg')
const book2 = new Book('Start with Why','Simon Sinek',2323,'already read','https://i1.wp.com/www.enliveningedge.org/wp-content/uploads/2016/02/start-with-why-by-simon-sinek.jpg?ssl=1')
const book3 = new Book('python crash course','eric mathews',2323,'already read','https://th.bing.com/th/id/OIP.G--czoKcSXB5z8Na7Zxu3AHaJy?pid=ImgDet&rs=1')


const books_container = document.querySelector('.books-container')
const add_book_btn = document.querySelector('.add-more-books')
add_book_btn.addEventListener('click',add_more_books)

addBookToLibray(book1)
addBookToLibray(book2)
addBookToLibray(book3)

displayBooks()


/**function for removing all books on the screen (i.e the books_container) */
function removeALLBooks(){
    const booksList = Array.from(books_container.children);
    booksList.forEach(book => {
        books_container.removeChild(book)
    })
}


/**function for adding book objects to the myLibray array(list) */
function addBookToLibray(book){
    myLibray.push(book)
}

/**function for displaying user's books on the screen (e.i books_container) */
function displayBooks(){
    myLibray.forEach(bookObj => {
        this.book = document.createElement('div');
        book.classList.add('book');
        const book_img_wrapper = document.createElement('div')
        book_img_wrapper.classList.add('book-img-wrapper')
        const book_img = document.createElement('img');
        book_img.setAttribute('src',bookObj.imgUrl);
        book_img.classList.add('book_img');
        const book_title = document.createElement('p');
        book_title.classList.add('book-title')
        book_title.textContent = bookObj.title;
        const book_author =  document.createElement('p');
        book_author.classList.add('book-author')
        book_author.textContent = bookObj.author;
        const book_read_status = document.createElement('p');
        this.delete_book_btn = document.createElement('button')
        this.delete_book_btn.innerHTML = '<img src="icons/delete.png" alt="delete icon">'
        this.delete_book_btn.classList.add('delete-book-btn')
        this.delete_book_btn.addEventListener('click',DeleteBook)

        
        if(bookObj.read == 'already read'){
            book_read_status.textContent = 'Already read';
            book_read_status.classList.add('already-read')
        }else{
            book_read_status.classList.remove('already-read');
            book_read_status.classList.add('not-yet-read')
        }
       
        book_img_wrapper.appendChild(book_img)
        this.book.appendChild(book_img_wrapper)
        this.book.appendChild(book_title)
        this.book.appendChild(book_author)
        this.book.appendChild(book_read_status)
        books_container.appendChild(book)
        book.appendChild(this.delete_book_btn)
    })
   
}

//function for checking a given url points to an image
function isImg(url){
    return /\.(jpeg|jpg|png|webp|avif|gif|svg)$/.test(url)
}

/***function and code for removing a single or specific
 *  book from the library */
function DeleteBook(){
        const book = this.parentElement;
        books_container.removeChild(book)
}



/**code and functions for displaying a form and adding new books to the library */
function add_more_books(){
    display_form();
    captureDate();
}

function display_form(){
    /**using 'this' to make some variables global */
    this.modal = document.createElement('div')
    this.modal.classList.remove('cancel-modal')//this class is used for canceling the form submission
    modal.classList.add('show-modal')
    /**rather than creating the form elements one by one in javascript,
     * it will be way better by just creating them in the html file and then setting their
     * display property to 'none' so that they become invisible.
     * Select them in javascript and remove them from the body element and then add them to
     * the modal, which is like an overlay that will appear when the add more books button is
     * clicked
     */
    this.form = document.querySelector('form');
    this.body = document.body;
    if(Array.of(body.children).includes(form)){
        this.body.removeChild(form)
    }
    modal.appendChild(form);
    form.classList.add('form-styling');
    body.appendChild(modal)
    /*adding event listner for a button that will cancel the form submission*/
    const form_cancel_btn = document.querySelector('.cancel-form-btn');
    form_cancel_btn.addEventListener('click',()=>{
        this.modal.classList.add('cancel-modal')
    })
}

/**capturing the input from the form elements */
function captureDate(){
    //initalizing values to be used in the book object constructor
    //so as to make them available throughout this function
    let book_title;
    let book_imgUrl;
    let book_author;
    let book_pages;

    const input_elements = document.querySelectorAll('input[type]');
    input_elements.forEach(elem => {
        console.log(elem.name)
        elem.addEventListener('change',()=>{
            switch(elem.name){
                case 'title':
                    book_title = elem.value;
                    console.log(book_title)
                    return book_title;
                case 'author':
                    book_author = elem.value;
                    console.log(book_author)
                    return book_author;
                case 'imgUrl':
                    book_imgUrl = elem.value;
                    console.log(book_imgUrl)
                    return book_imgUrl;
                case 'pages':
                    book_pages = elem.value;
                    console.log(book_pages)
                    return book_pages;
            }
        })
    })
        //event listener to the submit button in the form
        const submitBtn = document.querySelector('button[type="submit"]');
        submitBtn.addEventListener('click',(event)=>{
            event.preventDefault()
            //check if book img url is provided
            if(book_imgUrl != undefined && isImg(book_imgUrl)){
                bookObj = new Book(book_title,book_author,book_pages,'already read',book_imgUrl);
            }else{
                const book_imgUrl = 'images/no-cover.png'
                bookObj = new Book(book_title,book_author,book_pages,'already read');
            }
            addBookToLibray(bookObj)
            removeALLBooks()
            displayBooks()
            modal.classList.add('cancel-modal')
        })
    
}