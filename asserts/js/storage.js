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
        }
        localStorage.setItem('commentsData', JSON.stringify(commentsData)); 
        return UIscore;
    }

    static UpdateComment(id, info=false){
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
}