let postList;

const renderPosts = (posts) => {

    // Div contenedor de las cards
    const divBody = $('div .main_card');
    divBody.empty();

    $.each(posts, function (index, post) {        

        // Div contenedor de cada card
        const divCard = $('<div class="card rounded-3 mb-2"></div>');

        // Imagen cover de cada articulo
        const imgCover = $('<img alt="" class="img-fluid">');

        // DATO DINAMICO DE URL DE COVER IMAGE        
        imgCover.attr({ src: post[1].coverImage });

        // Article que contendrá el articulo
        const article = $('<article class="card-body"></article>');
        const divdFlex = $('<div class="d-flex"></div>');

        const divImgUser = $('<div></div>');
        const anchorImage = $('<a href="" class="row p-0 m-0 w-75"></a>');
        const imgUser = $('<img class="rounded-circle p-0 imgUser">');

        // DATO DINAMICO DE URL DE IMAGE USER        
        imgUser.attr({ src: post[1].userImg });
        anchorImage.append(imgUser);
        divImgUser.append(anchorImage);

        const divInfoUser = $('<div class="row pe-0 mb-3 lh-sm dataAvatar"></div>')

        // Revisar si el href, debe ser dinámico
        const anchorName = $('<a href="#" class="nickname"></a>')

        // DATO DINAMICO DEL NOMBRE DE USUARIO
        const userName = post[1].user;
        anchorName.text(userName);

        // Revisar si el href, debe ser dinámico
        const anchorTimePost = $('<a href="#" class="date"></a>')
        const time = $('<time></time>');

        // Revisar si el datetime, debe ser dinámico
        time.text(dateTimer(post[1].datePublication));
        anchorTimePost.append(time);

        divInfoUser.append(anchorName);
        divInfoUser.append(anchorTimePost);

        // Div contenedor titulo y tags
        const divPost = $('<div class="ms-5"></div');

        // Div contenedor Titulo
        const divTitlePost = $('<div class="card-title mb-3"></div>');
        const h2Title = $('<h2 class="titlePost"></h2');
        const anchorTitle = $(`<a href="./pages/post.html?&p=${post[0]}"></a>`);

        // DATO DINAMICO PARA EL TITULO
        const title = post[1].title;

        anchorTitle.text(title);
        h2Title.append(anchorTitle);
        divTitlePost.append(h2Title);

        // Div contenedor tags
        const divTagsPost = $('<div class="story-tags"></div>');

        // DATO DINAMICO PARA LOS TAGS

        const tags = Object.values(post[1].tags);
        tags.forEach(tag => {
            const anchorTag = $(`<a href="#" class="tag"><span class="prefix">#</span>${tag}</a>`);
            divTagsPost.append(anchorTag);
        });
        
        // Div contenedor scores
        const divFooterPost = $('<div class="d-flex justify-content-between"></div>');
        const divScoresPost = $('<div class="d-flex align-items-center"></div>')

        // DATO DINAMICO PARA LOS REACTIONS
        const anchorReactions = $('<a href="#" class="story-btn"></a>');
        const reactions = post[1].likes;
        // Se valida si las reactions son mayores a cero, en caso contrario, no se pinta el elemento
        if (reactions > 0 && reactions != null) {
            const svgReactions = $('<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path></svg>');
            const paragraphReactions = $('<p class="d-inline-block text-dark m-0"></p>');

            paragraphReactions.text(reactions);
            const spanReactions = $('<span class="s:inline">&nbsp;Reactions</span>');

            // Se integran los elementos del Reactions
            anchorReactions.append(svgReactions);
            anchorReactions.append(paragraphReactions);
            anchorReactions.append(spanReactions);
        };
                
        const anchorComments = $('<a href="#" class="story-btn"></a>');
        const svgComments = $('<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>');
        const paragraphComments = $('<p class="d-inline-block text-dark m-0"></p>');

        // DATO DINAMICO PARA LOS REACTIONS
        const comments = post[1].comments;
        // Se valida si el número de comentarios es mayor a cero, para mostrar un mensaje u otro
        let spanComments;
        comments > 0 && comments != null ? (paragraphComments.text(comments), spanComments = $('<span class="s:inline">&nbsp;Comments</span>')) : spanComments = $('<span class="s:inline">&nbsp;Add comment</span>');

        // Se integran los elementos del Comments
        anchorComments.append(svgComments);
        anchorComments.append(paragraphComments);
        anchorComments.append(spanComments);

        // Div contenedor read time
        const divReadTimerPost = $('<div></div>');
        const timeRead = 6;
        const smallTextTime = $(`<small class="save-time">${timeRead} min read</small>`);
        const buttonSavePost = $('<button class="delete-btn">Delete</button>');
        buttonSavePost.attr("data-post", post[0]);

        buttonSavePost.click((event) => {
            postId = event.target.dataset.post;
            deletePost(index, postId, event);
        });

        divReadTimerPost.append(smallTextTime);
        divReadTimerPost.append(buttonSavePost);

        divScoresPost.append(anchorReactions);
        divScoresPost.append(anchorComments);

        divFooterPost.append(divScoresPost);
        divFooterPost.append(divReadTimerPost);

        divPost.append(divTitlePost);
        divPost.append(divTagsPost);
        divPost.append(divFooterPost);

        divdFlex.append(divImgUser);
        divdFlex.append(divInfoUser)
        article.append(divdFlex);
        article.append(divPost);

        if (index === 0)
            divCard.append(imgCover);

        divCard.append(article);
        divBody.append(divCard);

    });
};

const dateTimer = (datePublication) => {

    let compoundDate;

    const currentDay = new Date().getTime();
    const days = Math.floor((currentDay - datePublication.miliseconds)/(1000*60*60*24));
    const hours = Math.floor(((currentDay - datePublication.miliseconds)-(days*(1000*60*60*24)))/(1000*60*60));

    switch(datePublication.month){
        case 1:
            compoundDate = "Jan";
            break;
        case 2:
            compoundDate = "Feb";
            break;
        case 3:
            compoundDate = "Mar";
            break;
        case 4:
            compoundDate = "Apr";
            break;
        case 5:
            compoundDate = "May";
            break;
        case 6:
            compoundDate = "Jun";
            break;
        case 7:
            compoundDate = "Jul";
            break;
        case 8:
            compoundDate = "Aug";
            break;
        case 9:
            compoundDate = "Sep";
            break;
        case 10:
            compoundDate = "Oct";
            break;
        case 11:
            compoundDate = "Nov";
            break;
        case 12:
            compoundDate = "Dec";
            break;
    }

    if(days > 0){
        compoundDate += ` ${datePublication.day} (${days} days ago)`;
    }
    else{
        if(hours > 0){
            compoundDate += ` ${datePublication.day} (${hours} hours ago)`;
        }
        else {
            compoundDate += ` ${datePublication.day}`;
        }
    }

    return compoundDate;

};


const searchPosts = () => {
    $.ajax({
        method: 'GET',
        url: 'https://desafio-js-3435a-default-rtdb.firebaseio.com/posts/.json',
        data: JSON.stringify({}),
        success: (response) => {
            postList = Object.entries(response);            
            renderPosts(postList);
        },
        error: (error) => {
            console.log(error);
        },
        async: true,
    });
};

const deletePost = (index, postId, event) => {

    console.log(event);

    $.ajax({
        method: 'DELETE',
        url: `https://desafio-js-3435a-default-rtdb.firebaseio.com/posts/${postId}.json`,
        data: JSON.stringify({}),
        success: (response) => {
            console.log(response);
            index === 0 ? searchPosts() : event.target.offsetParent.remove();
        },
        error: (error) => {
            console.log(error);
        },
        async: true,
    });
};


searchPosts();