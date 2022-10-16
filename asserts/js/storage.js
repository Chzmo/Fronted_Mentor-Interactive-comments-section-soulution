//Store Class: Handles local Storage
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

        for(let i = 0; i < commentsData.comments.length; i++){
            if(commentsData.comments[i].replies !== null){
                for (let j = 0; j < commentsData.comments[i].replies.length; j++){
                    if(commentsData.comments[i].replies[j].id === replyId){
                        commentsData.comments[i].replies.splice(j, 1);
                    }
                }
            }
        }
        localStorage.setItem('commentsData', JSON.stringify(commentsData));   
    }

    static changeScore(id, UIscore){
        let commentsData = Store.getDataComments();
        for(let i = 0; i < commentsData.comments.length; i++){
            if(parseInt(commentsData.comments[i].id) === parseInt(id) && (commentsData.comments[i].score + UIscore) >= 0){
                UIscore = parseInt(UIscore) + parseInt(commentsData.comments[i].score);
                commentsData.comments[i].score = UIscore;   
            }
            else{
                if (commentsData.comments[i].replies){
                    for (let j = 0; j < commentsData.comments[i].replies.length; j++){
                    
                        if (parseInt(commentsData.comments[i].replies[j].id) === parseInt(id) && (commentsData.comments[i].replies[j].score + UIscore) >= 0){
                            UIscore = parseInt(UIscore) + parseInt(commentsData.comments[i].replies[j].score);
                            commentsData.comments[i].replies[j].score = UIscore;
                        }
                    }
                }
            }
            
        }
        localStorage.setItem('commentsData', JSON.stringify(commentsData)); 
        return UIscore;
    }

    static UpdateComment(id){
        let commentsData = Store.getDataComments();
        id  = id.match(/\d+/)[0];
        for(let i = 0; i < commentsData.comments.length; i++){
            if(parseInt(commentsData.comments[i].id) === parseInt(id)){
                let element = document.getElementsByName('udpdate_comment');
                let replyinfo = element[0].value;
                commentsData.comments[i].content = replyinfo;
                commentsData.comments[i].createdAt =  Date.now();
            }
        }

        localStorage.setItem('commentsData', JSON.stringify(commentsData));
    }

    static UpdateReply(id){
        let commentsData = Store.getDataComments();
        id  = id.match(/\d+/)[0];
        for(let i = 0; i < commentsData.comments.length; i++){
            if(commentsData.comments[i].replies){
                for (let j = 0; j < commentsData.comments[i].replies.length; j++){

                    //alert(parseInt(commentsData.comments[i].replies[j].id));
                    if (parseInt(commentsData.comments[i].replies[j].id) === parseInt(id)){
                        let reply = document.querySelector('#reply_comment').value;
                        commentsData.comments[i].replies[j].content = reply;
                        commentsData.comments[i].replies[j].createdAt = new Date();
                    }
                }
            }
        }

        localStorage.setItem('commentsData', JSON.stringify(commentsData));
    }

    static replyToComment(id){
        let replyTo = document.getElementById(id).parentElement.parentElement.children[0].children[1].children[0].innerHTML;
        let replyContent = document.getElementsByName('reply')[0].value;
        let commentsData = Store.getDataComments();
        let createdAt = new Date();
        commentsData.comments.forEach(comment => {
            if(comment.id === parseInt(id)){
                let reply = {
                    "id": Math.floor((Math.random() + Math.random()) * 3456),
                    "content": replyContent,
                    "createdAt": createdAt,
                    "score": 0,
                    "replyingTo":replyTo,
                    "user": {
                        "image": { 
                        "png": "./images/avatars/image-juliusomo.png",
                        "webp": "./images/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                    },
                };

                if(comment.replies){
                    comment.replies.push(reply);
                }else{
                    comment.replies = [reply];
                }

            } 
            else if(comment.replies){
                comment.replies.forEach(reply => {
                    if(reply.id === parseInt(id)){
                        let reply = {
                            "id": Math.floor((Math.random() + Math.random()) * 3456),
                            "content": replyContent,
                            "createdAt": createdAt,
                            "score": 0,
                            "replyingTo":replyTo,
                            "user": {
                                "image": { 
                                "png": "./images/avatars/image-juliusomo.png",
                                "webp": "./images/avatars/image-juliusomo.webp"
                                },
                                "username": "juliusomo"
                            },
                        };

                        if(comment.replies){
                            comment.replies.push(reply);
                        }else{
                            comment.replies = [reply];
                        }
                    }
                })
            }
        }); 
        localStorage.setItem('commentsData', JSON.stringify(commentsData));   
    }
}