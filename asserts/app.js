let replyForm = false;

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

    static deleteComment(id){
        let commentsData = Store.getDataComments();
        commentsData.comments.forEach((comment, index) => {
            if(parseInt(comment.id) === parseInt(id)){
                commentsData.comments.splice(index, 1)
            }
        });

        localStorage.setItem('commentsData', JSON.stringify(commentsData));
    }

    static deleteReply(id){
        let replyId = parseInt(id);
        let commentsData = Store.getDataComments();
        // commentsData.comments.forEach((comment, index) => {
        //     console.log(index,id, comment);
        // });
        //console.log(commentsData.comments[1]);

        for(let i = 0; i < commentsData.comments.length; i++){
            if(commentsData.comments[i].replies !== null){
                for (let j = 0; j < commentsData.comments[i].replies.length; j++){
                    if(commentsData.comments[i].replies[j].id === replyId){
                        commentsData.comments[i].replies.splice(j, 1);
                        //console.log(commentsData.comments[i].replies[j]);
                    }
                }
            }
        }
        localStorage.setItem('commentsData', JSON.stringify(commentsData));   
    }

    static changeScore(id, UIscore){
        let commentsData = Store.getDataComments();
        for(let i = 0; i < commentsData.comments.length; i++){
            if(parseInt(commentsData.comments[i].id) === parseInt(id)){
                UIscore = parseInt(UIscore) + parseInt(commentsData.comments[i].score);
                commentsData.comments[i].score = UIscore;   
            }
        }
        localStorage.setItem('commentsData', JSON.stringify(commentsData)); 
        return UIscore;
    }
}


// Create HTML Elements
class createElements{

    static createComment(comment, data){
        let date  = new Date(comment.createdAt);

        let user_data = '';
        user_data += `
            <div class="container__content-left br-2">
                <div class="container__content-left_plus">
                <a id="plus_${comment.id}" onclick="UI.CommentScore(id, 1)"><img src="./images/icon-plus.svg" alt=""></a>
                </div>
                <div class="container__content-left_score">
                <P id="score_${comment.id}">${comment.score}</P>
                </div>
                <div class="container__content-left_minus">
                <a id="minus_${comment.id}" onclick="UI.CommentScore(id, -1)"><img src="./images/icon-minus.svg" alt=""></a>
                </div>
            </div>

            <div class="container__content-right">
                <div class="container__content-right_top">
                <div class="container__content-right_top-profile">
                    <div class="container__content-right_top-profile_img">
                    <img src="${comment.user.image.png}" alt="amyrobson">
                    </div>
                    <div class="container__content-right_top-profile_username">
                    
                    <p>${comment.user.username}`; 

                            if (data.currentUser.username === comment.user.username){
                                user_data += ` <span class="you">You</span>`;
                            }
                            
                            user_data +=`

                    </p></div>
                    <div class="container__content-right_top-profile_time"><p>${moment(date, "YYYYMMDD").fromNow()}</p></div>
                </div>
                <div class="container__content-right_top-reply">
                `;
                        
                if (data.currentUser.username === comment.user.username){
                    user_data +=    `<a id="${comment.id}" class="red" onclick="UI.removeComment(id)"><span><img src="./images/icon-delete.svg" /></span> Delete</a> 
                                    &emsp;
                                    <a ><img src="./images/icon-edit.svg" /> <span>Edit</span></a>`;
                } else{
                    user_data += `<a id="${comment.id}" onclick="UI.insertReplyField(id)"><img src="./images/icon-reply.svg" alt="reply-icon" > <span>Reply</span></a>`;
                }

                user_data += `
                </div>
                </div>
                <div class="container__content-right_bottom">
                <p>${comment.content}</p>
                </div>
            </div>
        `;

        return user_data;
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
                        <div class="container__content-right_top-profile_username">
                            <p>${reply.user.username}`; 

                            if (data.currentUser.username === reply.user.username){
                                user_data += ` <span class="you">You</span>`;
                            }
                            
                            user_data +=`
                            </p>
                        </div>
                        <div class="container__content-right_top-profile_time"><p>${moment(reply.createdAt, "YYYYMMDD").fromNow()}</p></div>
                        </div>
                        <div class="container__content-right_top-reply">
                        `;
                        
                        if (data.currentUser.username === reply.user.username){
                            user_data +=    `<a id="${reply.id}" class="red" onclick="UI.removeReply(id)"><span><img src="./images/icon-delete.svg" /></span> Delete</a> 
                                            &emsp;
                                            <a href=""><img src="./images/icon-edit.svg" /> <span>Edit</span></a>`;
                        } else{
                            user_data += `<a id="${reply.id}" onclick="UI.insertReplyField(id)"><img src="./images/icon-reply.svg" alt="reply-icon" > <span>Reply</span></a>`;
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




// UI Class: Handle UI Tasks
class UI {

    static displayComments() {
        let data = Store.getDataComments();
        let user_data = '';
        for(let comment of data.comments){
            user_data += `<div class="container__content br-1">`;
            user_data += createElements.createComment(comment, data);
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
        let data = Store.getDataComments();
        const container = document.querySelector('.container');
        let form = document.querySelector('#form_comment');
        let div = document.createElement('div');
        div.classList = "container__content br-1";
        let child = createElements.createComment(comment, data);

        div.innerHTML = child;
        container.insertBefore(div, form);

    }

    static insertReplyField(id){
        let inputField = document.createElement('form');
        inputField.classList = 'container__form br-1 container__form-reply';
        inputField.innerHTML = createElements.CreateInputField('./images/avatars/image-juliusomo.png');
        let element = document.getElementById(id);
        let parentEl = element.parentElement.parentElement.parentElement.parentElement.parentElement;
        let siblingElement = element.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
        if (replyForm == false){  
            parentEl.insertBefore(inputField, siblingElement);
        }else{
            let form_input = document.querySelector('.container__form-reply');
            form_input.remove();
            let inputField = document.createElement('form');
            inputField.classList = 'container__form br-1 container__form-reply';
            inputField.innerHTML = createElements.CreateInputField('./images/avatars/image-juliusomo.png');
            let element = document.getElementById(id);
            let parentEl = element.parentElement.parentElement.parentElement.parentElement.parentElement;
            let siblingElement = element.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
            parentEl.insertBefore(inputField, siblingElement);
        }
        replyForm = true
    }

    static removeComment(id){
        Store.deleteComment(id);
        let element = document.getElementById(id);
        let parentEl = element.parentElement.parentElement.parentElement.parentElement;
        parentEl.remove();
    }

    static EditComment(id){
        let element = document.getElementById(id);
        let parentEl = element.parentElement.parentElement.parentElement.parentElement;
        parentEl.remove();
    }

    static CommentScore( id, UIscore){
        let score = UIscore;
        let currentEl = document.querySelector('#'+id);
        let parentEl = currentEl.parentElement.parentElement.parentElement;
        
        UIscore = Store.changeScore(id.match(/\d+/)[0], UIscore);
        UIscore = parseInt(UIscore);
        
        if (parseInt(score) > 0){
            let prevElement = parentEl.previousSibling;
            if (prevElement !== null){
                let prevScore = prevElement.children[0].children[1].children[0].innerHTML;
                if (parseInt(prevScore) < parseInt(UIscore)){
                    let container = parentEl.parentElement;
                    container.insertBefore(parentEl, prevElement);
                } else{
                    prevElement = parentEl.previousSibling.previousSibling;
                    if (prevElement !== null){
                        let prevScore = prevElement.children[0].children[1].children[0].innerHTML; 
                        if (parseInt(prevScore) < parseInt(UIscore)){
                            let container = parentEl.parentElement;
                            container.insertBefore(parentEl, prevElement);
                        }
                    }
                }
            }
        } else{
            let NextEl = parentEl.nextElementSibling;
            if(NextEl.nodeName === 'FORM' ){
                parentEl.children[0].children[1].children[0].innerHTML = UIscore;
            } else if (NextEl !== null ){
                let nextScore = NextEl.children[0].children[1].children[0].innerHTML;
                if (parseInt(nextScore) > parseInt(UIscore)){
                    let container = parentEl.parentElement;
                    container.insertBefore(NextEl, parentEl);
                }
            }
        }

        parentEl.children[0].children[1].children[0].innerHTML = UIscore;
        
    }

    static removeReply(id){
        Store.deleteReply(id);
        let element = document.getElementById(id);
        let parentEl = element.parentElement.parentElement.parentElement.parentElement;
        parentEl.remove();
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
                    "createdAt": new Date(),
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
