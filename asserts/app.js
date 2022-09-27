// Create HTML Elements
class createElements{

    static createComment(comment){
        return `
            <div class="container__content-left br-2">
                <div class="container__content-left_plus">
                <a href=""><img src="./images/icon-plus.svg" alt=""></a>
                </div>
                <div class="container__content-left_score">
                <P>${comment.score}</P>
                </div>
                <div class="container__content-left_minus">
                <a href=""><img src="./images/icon-minus.svg" alt=""></a>
                </div>
            </div>

            <div class="container__content-right">
                <div class="container__content-right_top">
                <div class="container__content-right_top-profile">
                    <div class="container__content-right_top-profile_img">
                    <img src="${comment.user.image.png}" alt="amyrobson">
                    </div>
                    <div class="container__content-right_top-profile_username"><p>${comment.user.username}</p></div>
                    <div class="container__content-right_top-profile_time"><p>${comment.createdAt}</p></div>
                </div>
                <div class="container__content-right_top-reply">
                    <a class="comment_reply" id="${comment.id}"><span><img src="./images/icon-reply.svg" alt="reply-icon" ></span> Reply</a>
                </div>
                </div>
                <div class="container__content-right_bottom">
                <p>${comment.content}</p>
                </div>
            </div>
        `;
    }

    static createReply(reply, data){
        let user_data = '';

        user_data +=`                    
            <div class="container__content br-1 ">
                <div class="container__content-left br-2">
                    <div class="container__content-left_plus">
                        <a href=""><img src="./images/icon-plus.svg" alt=""></a>
                    </div>
                    <div class="container__content-left_score">
                        <P>${reply.score}</P>
                    </div>
                    <div class="container__content-left_minus">
                        <a href=""><img src="./images/icon-minus.svg" alt=""></a>
                    </div>
                    </div>
            
                    <div class="container__content-right">
                    <div class="container__content-right_top">
                        <div class="container__content-right_top-profile">
                        <div class="container__content-right_top-profile_img">
                            <img src=".${reply.user.image.png}" alt="amyrobson">
                        </div>
                        <div class="container__content-right_top-profile_username"><p>${reply.user.username}</p></div>
                        <div class="container__content-right_top-profile_time"><p>${reply.createdAt}</p></div>
                        </div>
                        <div class="container__content-right_top-reply">
                        `;
                        
                        if (data.currentUser.username === reply.user.username){
                            user_data +=    `<a href="" class="red"><span><img src="./images/icon-delete.svg" /></span> Delete</a> 
                                            &emsp;
                                            <a href=""><img src="./images/icon-edit.svg" /> <span>Edit</span></a>`;
                        } else{
                            user_data += `<a id="${Math.random()}" onclick="UI.insertReplyField(id)"><img src="./images/icon-reply.svg" alt="reply-icon" > <span>Reply</span></a>`;
                        }

                        user_data += `
                        </div>
                    </div>
                    <div class="container__content-right_bottom">
                        <p><a>@${reply.replyingTo}</a> ${reply.content}</p>
                    </div>
                </div>
            </div>
        `;

        return user_data;
    }

    static CreateInputField(image){
        return `
            <div class="container__form-img">
                <img src="${image}" alt="">
            </div>
            <div class="container__form-input">
                <input class="br-1" type="textarea" name="reply" id="reply_comment" placeholder="Add a Comment" required>
            </div>
            <div class="container__reply-button">
                <input type="submit" class="btn " id="btn_submit" value="${'SEND'}">
            </div>
        `;
    }
}

//Store Class: Handles Storage
class Store {

    static getDataComments() {
      let commentsData;
      if(localStorage.getItem('commentsData') === null) {
        commentsData = null;
      } else {
        commentsData = JSON.parse(localStorage.getItem('commentsData'));
      }
      return commentsData;
    }
  
    static addComment(comment) {
        let data = Store.getDataComments();
        data.comments.push(comment);
        localStorage.setItem('commentsData', JSON.stringify(data));
        return 0;
    }

    static addReply(reply) {
        const comments = Store.getDataComments();
        comments.push(reply);
        localStorage.setItem('commentsData', JSON.stringify(comments));
    }


    // static removeComment(isbn) {
    //   const books = Store.getBooks();
  
    //   books.forEach((book, index) => {
    //     if(book.isbn === isbn) {
    //       books.splice(index, 1);
    //     }
    //   });
  
    //   localStorage.setItem('books', JSON.stringify(books));
    // 
    //}
}

// UI Class: Handle UI Tasks
class UI {

    static displayComments() {
        let data = Store.getDataComments();
        let user_data = '';
        for(let comment of data.comments){
            user_data += `<div class="container__content br-1">`;
            user_data += createElements.createComment(comment);
            user_data += `</div>`;

            if (comment.replies !== null){
                user_data += `<div class="comment">`;
                for(let reply of comment.replies){
                    user_data += createElements.createReply(reply, data);
                }
                user_data += `</div>`;
            }
        }

        user_data += `<form class="container__form br-1" id="form_comment">`;
        user_data += createElements.CreateInputField(data.currentUser.image.png);
        user_data += `</form>`;
        document.querySelector('.container').innerHTML = user_data;
    }


    static insertComment(comment){
        const container = document.querySelector('.container');
        let form = document.querySelector('#form_comment');
        let div = document.createElement('div');
        div.classList = "container__content br-1";
        let child = createElements.createComment(comment);

        div.innerHTML = child;
        container.insertBefore(div, form);

    }

    static insertReplyField(id){
        let inputField = document.createElement('form');
        inputField.classList = 'container__form br-1';
        inputField.innerHTML = createElements.CreateInputField('./images/avatars/image-juliusomo.png');
        let element = document.getElementById(id);
        let parentElement = element.parentElement.parentElement.parentElement.parentElement.parentElement;
        let siblingElement = element.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
        

        parentElement.insertBefore(inputField, siblingElement);
    
    }
    // static deleteBook(el) {
    //   if(el.classList.contains('delete')) {
    //     el.parentElement.parentElement.remove();
    //   }
    // }
  
    static clearFields() {
       document.querySelector('#reply_comment').value = '';
    }
}

let http = new XMLHttpRequest();

http.open('get', 'data.json', true);

http.send();

http.onload = function(){
    if (this.readyState == 4 && this.status == 200){
        let data = JSON.parse(this.responseText);

        if (Store.getDataComments() === null){   
            localStorage.setItem('commentsData', JSON.stringify(data));
            UI.displayComments();
        }else{
            UI.displayComments();
        }

        //Get Comments form UI
        document.querySelector('#form_comment').addEventListener('submit', (e) => {
            //prevent actual Values
            e.preventDefault();
            
            // Get comment form values
            let comment = document.querySelector('#reply_comment').value;

            if (comment ===''){
                alert('Please fill all fields');
            } else{
                userComment = {
                    "id": Math.floor((Math.random() + Math.random()) * 3456),
                    "content": comment,
                    "createdAt": Date.now(),
                    "score": 0,
                    "user": {
                        "image": { 
                        "png": "./images/avatars/image-juliusomo.png",
                        "webp": "./images/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                    },
                    "replies": null
                }
                let res = Store.addComment(userComment);
                if (res === 0){
                    //clear fields
                    UI.clearFields();

                    //Add comment to UI
                    UI.insertComment(userComment);
                }else{
                    alert('something happened');
                };
            
            }
        });
    }
}
