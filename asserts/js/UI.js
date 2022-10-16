let removedCommentState = null;
let replyForm = false;
// UI Class: Handle UI Tasks
class UI {

    static displayComments() {
        //display comments
        let data = Store.getDataComments();
        let user_data = '';
        for(let comment of data.comments.sort(sortByScore)){
            user_data += `<div class="container__content br-1">`;
            user_data += createElements.createComment(comment, data);
            user_data += `</div>`;

            if (comment.replies !== null){
                user_data += `<div class="comment">`;
                for(let reply of comment.replies.sort(sortByDate)){
                    user_data += createElements.createReply(reply, data);
                }
                user_data += `</div>`;
            }
        }

        user_data += `<form class="container__form br-1" id="form_comment">`;
        user_data += createElements.CreateInputField(data.currentUser.image.png);
        user_data += `</form>`;
        document.querySelector('.container').innerHTML = user_data;
        
        //Get Comments form UI
        ListenToCommentForm();
    }

    static insertComment(comment){
        //inserting a comment to dom
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
        //created a reply field 
        let inputField = document.createElement('form');
        inputField.classList = 'container__form br-1 container__form-reply';
        inputField.innerHTML = createElements.CreateInputField('./images/avatars/image-juliusomo.png', info);
        let element = document.getElementById(id);
        let parentEl = element.parentElement.parentElement.parentElement.parentElement.parentElement;
        let siblingElement = element.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
        inputField.addEventListener('submit', (e)=>{
            //e.preventDefault();
            try {
                //store comment to database 
                Store.replyToComment(id);
            } catch (error) {
                console.log(error)
            }
        });

        if (replyForm == false){  
            parentEl.insertBefore(inputField, siblingElement);
            replyForm = true
            
        }else{
            let form_input = document.querySelector('.container__form-reply');
            //replace the reply/comment block from removedCommentState that was removed
            if(removedCommentState){
                removedCommentState.parentEl.insertBefore(removedCommentState.commentblock, removedCommentState.nextSibling);
            }
            form_input.remove();
            replyForm = false;
            removedCommentState = null;
            
            //inserts the reply field to dom
            UI.insertReplyField(id, info);
        }
    }

    static removeComment(id){
        
        let modal = document.querySelector('.modal');
        modal.style.display = 'flex';

        //add an event to delete or cancel button
        let btnevent = document.querySelector('.modal__content-buttons');
        btnevent.addEventListener('click', (e)=>{
            if (e.target.classList.contains('modal__content-buttons_delete')){
                Store.deleteComment(id);
                // let element = document.getElementById(id);
                // let parentEl = element.parentElement.parentElement.parentElement.parentElement;
                // //parentEl.remove();
                UI.displayComments()
                modal.style.display = 'none'; 
            }else{
                modal.style.display = 'none'; 
            }
        });
    }

    static CommentScore( id, UIscore){
        UIscore = Store.changeScore(id.match(/\d+/)[0], UIscore); //gets the integer from string
        UIscore = parseInt(UIscore);
        UI.displayComments()
    }

    static removeReply(id){
        let modal = document.querySelector('.modal');
        modal.style.display = 'flex';

        //add a event to delete or cancel button
        let btnevent = document.querySelector('.modal__content-buttons');
        btnevent.addEventListener('click', (e)=>{
            if (e.target.classList.contains('modal__content-buttons_delete')){
                Store.deleteReply(id);
                UI.displayComments()
                modal.style.display = 'none'; 
            }else{
                modal.style.display = 'none'; 
            }
        });
    }

    static editReply(id){
        let element = document.getElementById(id);
        let replyinfo = element.parentElement.parentElement.nextElementSibling.children[0].innerHTML;
        
        //info used on what button should be created 
        let info = {
            commentid:id,
            type:"outerReply",
            commentdata:replyinfo,
            buttontype:"Update",
        };      
        
        UI.insertReplyField(id, info);
        // gets the whole comment block
        let commentblock = document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
       
        //removes a comment block substuted with update field
        if (commentblock.classList.contains('container__content')){ 
            //stores the state of a comment block
            //gets replaced if the user clicks on edit, or reply
            removedCommentState = {
                "commentblock": commentblock,
                "parentEl": commentblock.parentElement,
                "nextSibling": commentblock.nextElementSibling

            }
            commentblock.remove();
        }
    }

    static editInnerReply(id){
        let element = document.getElementById(id)
        //gets info to edit
        let replyinfo = element.parentElement.parentElement.nextElementSibling.children[0].children[1].innerHTML;
        //info used on what button should be created eg inner reply
        let info = {
            type:"innerReply",
            replyId:id,
            commentdata:replyinfo,
            buttontype:"Update",
        };      
        
        UI.insertReplyField(id, info);
        // gets the whole comment block
        let commentblock = document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
        
        //removes a comment block substuted with update field
        if (commentblock.classList.contains('container__content')){
            //stores the state of a comment block
            //gets replaced if the user clicks on edit, or reply
            removedCommentState = {
                "commentblock": commentblock,
                "parentEl": commentblock.parentElement,
                "nextSibling": commentblock.nextElementSibling
            }
            commentblock.remove();
        }
    }


    static clearFields() {
       document.querySelector('#comment').value = '';
    }
}
