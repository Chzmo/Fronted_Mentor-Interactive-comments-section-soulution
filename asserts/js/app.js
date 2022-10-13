
let replyForm = false;

//Utility Functions
function sortByScore(a, b){
    return parseInt(b.score) - parseInt(a.score);
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
            let comment = document.querySelector('#form_comment').children[1].children[0].value;
            

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
                    UI.displayComments()
                }else{
                    alert('something happened');
                };
            }
        });
    }
}
