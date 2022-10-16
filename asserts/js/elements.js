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
                        user_data +=    `<a id="${comment.id}" class="red" onclick="UI.removeComment(id)"><span><img alt="delete" src="./images/icon-delete.svg" /></span> Delete</a> 
                                        &emsp;
                                        <a id="reply_${comment.id}" onclick="UI.editReply(id)" ><img src="./images/icon-edit.svg" alt="edit"  /> <span>Edit</span></a>`;
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
                        <a id="plus_${reply.id}" onclick="UI.CommentScore(id, 1)"><img src="./images/icon-plus.svg" alt=""></a>
                    </div>
                    <div class="container__content-left_score">
                        <P>${reply.score}</P>
                    </div>
                    <div class="container__content-left_minus">
                        <a id="minus_${reply.id}" onclick="UI.CommentScore(id, -1)"><img src="./images/icon-minus.svg" alt=""></a>
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
                        <div class="container__content-right_top-profile_time"><p>${moment(new Date(reply.createdAt), "YYYYMMDD").fromNow()}</p></div>
                        </div>
                        <div class="container__content-right_top-reply">
                        `;
                        
                        if (data.currentUser.username === reply.user.username){
                            
                            user_data +=    `<a id="${reply.id}" class="red" onclick="UI.removeReply(id)"><span><img alt="delete" src="./images/icon-delete.svg" /></span> Delete</a> 
                                            &emsp;
                                            <a id="reply_${reply.id}" onclick="UI.editInnerReply(id)" ><img src="./images/icon-edit.svg" alt="edit" /> <span>Edit</span></a>`;
                        } else{
                            user_data += `<a id="${reply.id}" onclick="UI.insertReplyField(id)"><img src="./images/icon-reply.svg" alt="reply-icon" > <span>Reply</span></a>`;
                        }

                        user_data += `
                        </div>
                    </div>
                    <div class="container__content-right_bottom">
                        <p><a>@${reply.replyingTo}</a> <span>${reply.content}</span></p>
                    </div>
                </div>
            </div>
        `;

        return user_data;
    }

    static CreateInputField(image, info=false){
    
        let inputField = '';
        inputField += `
            <div class="container__form-img">
                <img src="${image}" alt="">
            </div>
            <div class="container__form-input">`;
                
                if (info){
                    inputField += `<textarea class="br-1" wrap="soft" name="udpdate_comment" id="reply_comment" placeholder="Add a Comment" required `;
                    inputField += `">${info.commentdata}</textarea>
                    </div>`;

                    if(info.type === "outerReply"){
                        inputField += `<div class="container__reply-button">
                        <input type="submit" class="btn " id="${info.commentid}" value="${info.buttontype}" onclick="Store.UpdateComment(id)">
                    </div>`;
                    } else if (info.type === "innerReply"){
                        inputField += `<div class="container__reply-button">
                        <input type="submit" class="btn " id="${info.replyId}" value="${info.buttontype}" onclick="Store.UpdateReply(id)">
                    </div>`;
                    }
                }else{
                    inputField += `
                    <textarea class="br-1" wrap="soft" name="reply" id="comment" placeholder="Add a Comment" required ></textarea>
                </div>
                <div class="container__reply-button">
                    <input type="submit" class="btn " id="btn_submit" value="${'SEND'}" >
                </div>`;
                    
                }
        return inputField;
    }
}
