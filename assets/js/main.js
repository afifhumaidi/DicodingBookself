const s_bookID = document.getElementById('book-id');
const s_bookTitle = document.getElementById('book-title');
const s_bookAuthor = document.getElementById('book-author');
const s_bookYear = document.getElementById('book-year');
const s_bookStatus = document.getElementById('book-status');

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const s_editSubmit = document.getElementById("book-form__submit");

const s_drawerReading = document.getElementById('drawer-reading');
const s_drawerComplete = document.getElementById('drawer-complete');

const s_search_book = document.getElementById("search-book");

let books;

if(localStorage.getItem('books')===null)
    books = [];
else
    books = JSON.parse(localStorage.getItem('books'));

function addBook(){
    let book = {
        id: s_bookID.value,
        title: s_bookTitle.value,
        author: s_bookAuthor.value,
        year: s_bookYear.value,
        isComplete: s_bookStatus.checked,
    }

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    location.reload();
}

function printCardBook(keyword){
    let completed_books = books.filter(element => element.isComplete == true);
    let reading_books = books.filter(element => element.isComplete == false);
    
    if(s_drawerReading){
        if(keyword){
            keyword = (`${keyword}`);
            keyword = new RegExp(keyword, 'gi');
            reading_books = reading_books.filter(element => keyword.test(element.title));
        }
        for(let i=0; i<reading_books.length; i++){
            const card_book = document.createElement('div');
            card_book.setAttribute('class', "card-book");
            
            const book_photo = document.createElement('div');
            book_photo.setAttribute('class', "card-book__photo");
            book_photo.innerHTML = '<img src="./assets/img/book.png" alt="book-photo">';
            
            const book_detail = document.createElement('div');
            book_detail.setAttribute('class', "card-book__details");
            
            const book_action = document.createElement('div');
            book_action.setAttribute('class', "card-book__action");
            
            const book_status = document.createElement('div');
            book_status.setAttribute('class', "card-book__action_status");
            
            const book_edit = document.createElement('div');
            book_edit.setAttribute('class', "card-book__action_edit");
            book_edit.innerHTML = 'edit';
            
            const book_delete = document.createElement('div');
            book_delete.setAttribute('class', "card-book__action_delete");
            book_delete.innerHTML = 'delete';
            
            const book_title = document.createElement('div');
            book_title.setAttribute('class', "card-book__title center");
            book_status.setAttribute('onclick', 'actionStatus(' + reading_books[i].id + ')');
            book_status.innerHTML = 'reading';
            book_edit.setAttribute('onclick', 'modalEdit(' + reading_books[i].id + ')');
            book_delete.setAttribute('onclick', 'actionDelete(' + reading_books[i].id + ')');
            book_title.innerHTML = reading_books[i].title;

            s_drawerReading.appendChild(card_book)
            card_book.appendChild(book_photo);
            card_book.appendChild(book_detail);
            book_detail.appendChild(book_action);
            book_action.appendChild(book_status);
            book_action.appendChild(book_edit);
            book_action.appendChild(book_delete);
            book_detail.appendChild(book_title);
        }
    }
    else{
        if(keyword){
            keyword = (`${keyword}`);
            keyword = new RegExp(keyword, 'gi');
            completed_books = completed_books.filter(element => keyword.test(element.title));
        }
        for(let i=0; i<completed_books.length; i++){
            const card_book = document.createElement('div');
            card_book.setAttribute('class', "card-book");
            
            const book_photo = document.createElement('div');
            book_photo.setAttribute('class', "card-book__photo");
            book_photo.innerHTML = '<img src="./assets/img/book.png" alt="book-photo">';
            
            const book_detail = document.createElement('div');
            book_detail.setAttribute('class', "card-book__details");
            
            const book_action = document.createElement('div');
            book_action.setAttribute('class', "card-book__action");
            
            const book_status = document.createElement('div');
            book_status.setAttribute('class', "card-book__action_status");
            
            const book_edit = document.createElement('div');
            book_edit.setAttribute('class', "card-book__action_edit");
            book_edit.innerHTML = 'edit';
            
            const book_delete = document.createElement('div');
            book_delete.setAttribute('class', "card-book__action_delete");
            book_delete.innerHTML = 'delete';
            
            const book_title = document.createElement('div');
            book_title.setAttribute('class', "card-book__title center");
            book_status.setAttribute('onclick', 'actionStatus(' + completed_books[i].id + ')');
            book_status.innerHTML = 'completed';
            book_edit.setAttribute('onclick', 'modalEdit(' + completed_books[i].id + ')');
            book_delete.setAttribute('onclick', 'actionDelete(' + completed_books[i].id + ')');
            book_title.innerHTML = completed_books[i].title;

            s_drawerComplete.appendChild(card_book)
            card_book.appendChild(book_photo);
            card_book.appendChild(book_detail);
            book_detail.appendChild(book_action);
            book_action.appendChild(book_status);
            book_action.appendChild(book_edit);
            book_action.appendChild(book_delete);
            book_detail.appendChild(book_title);
        }
    }
}

function actionStatus(bookID){
    books.find(element => element.id == bookID).isComplete = !books.find(element => element.id == bookID).isComplete;
    localStorage.setItem('books', JSON.stringify(books));
    location.reload();
}

function actionEdit(bookID){
    let book = books.find(element => element.id == bookID);
    book.id = s_bookID.value;
    book.title = s_bookTitle.value;
    book.author = s_bookAuthor.value;
    book.year = s_bookYear.value;
    book.isComplete = s_bookStatus.checked;
    localStorage.setItem('books', JSON.stringify(books));
    location.reload();
}

function actionDelete(bookID){
    books.splice(books.findIndex(element => element.id == bookID), 1);
    localStorage.setItem('books', JSON.stringify(books));
    location.reload();
}

function modalEdit(bookID){
    let book = books.find(element => element.id == bookID);

    s_bookID.value = book.id;
    s_bookTitle.value = book.title;
    s_bookAuthor.value = book.author;
    s_bookYear.value = book.year;
    s_bookStatus.checked = book.isComplete;
    modal.style.display = "block";

    s_editSubmit.onclick = (e)=>{
        actionEdit(bookID);
    }
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

s_search_book.addEventListener('change', (e)=>{
    if(s_drawerReading)
        s_drawerReading.innerHTML = '';
    else
        s_drawerComplete.innerHTML = '';
    printCardBook(s_search_book.value);
})