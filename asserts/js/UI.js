
// UI Class: Handle UI Tasks
class UI {

    static displayComments() {
        let data = Store.getDataComments();
        let user_data = '';
        for(let comment of data.comments.sort(sortByScore)){
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

    static insertReplyField(id, info=false){
        
        let inputField = document.createElement('form');
        inputField.classList = 'container__form br-1 container__form-reply';
        inputField.innerHTML = createElements.CreateInputField('./images/avatars/image-juliusomo.png', info);
        let element = document.getElementById(id);
        let parentEl = element.parentElement.parentElement.parentElement.parentElement.parentElement;
        let siblingElement = element.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
        inputField.addEventListener('submit', (e)=>{
            e.preventDefault();

            try {
                Store.replyToComment(id);
            } catch (error) {
                console.log(error)
            }
        });

        if (replyForm == false){  
            parentEl.insertBefore(inputField, siblingElement);
        }else{
            let form_input = document.querySelector('.container__form-reply');
            form_input.remove();
            let inputField = document.createElement('form');
            inputField.classList = 'container__form br-1 container__form-reply';
            inputField.innerHTML = createElements.CreateInputField('./images/avatars/image-juliusomo.png', info);
            let element = document.getElementById(id);
            let parentEl = element.parentElement.parentElement.parentElement.parentElement.parentElement;
            let siblingElement = element.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
            parentEl.insertBefore(inputField, siblingElement);

        }
        replyForm = true
    }

    static removeComment(id){
        
        let modal = document.querySelector('.modal');
        modal.style.display = 'flex';

        //add a event to delete or cancel button
        let btnevent = document.querySelector('.modal__content-buttons');
        btnevent.addEventListener('click', (e)=>{
            if (e.target.classList.contains('modal__content-buttons_delete')){
                Store.deleteComment(id);
                let element = document.getElementById(id);
                let parentEl = element.parentElement.parentElement.parentElement.parentElement;
                parentEl.remove();
                UI.displayComments()
                modal.style.display = 'none'; 
            }else{
                modal.style.display = 'none'; 
            }
        });
    }

    static EditComment(id){
        let element = document.getElementById(id);
        let parentEl = element.parentElement.parentElement.parentElement.parentElement;
        parentEl.remove();
    }

    static CommentScore( id, UIscore){
        
        UIscore = Store.changeScore(id.match(/\d+/)[0], UIscore);
        UIscore = parseInt(UIscore);
        UI.displayComments()
    }

    static removeReply(id){
        Store.deleteReply(id);
        let element = document.getElementById(id);
        let parentEl = element.parentElement.parentElement.parentElement.parentElement;
        parentEl.remove();
    }

    static editReply(id){
        let element = document.getElementById(id)
        let replyinfo = element.parentElement.parentElement.nextElementSibling.children[0].innerHTML;
        
        let info = {
            commentid:id,
            commentdata:replyinfo,
            buttontype:"Update",
        };      
        
        UI.insertReplyField(id, info);
        let parentEl = document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
        
        if (parentEl.classList.contains('container__content')){
            parentEl.remove();
        }
    }

    static clearFields() {
       document.querySelector('#comment').value = '';
    }
}
