// Current Week
const currentWeek = () => {

    currentDate = new Date();
    let oneJan = new Date(currentDate.getFullYear(), 0, 1);
    let numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    let result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
    return result;
    console.log(result, 'semana');

}


let btnFilters = $('.btn-filter');
let rightFilters = $('.right-filter');



/* Filters Events */
btnFilters.click(function(event) {

    let filter = event.target.id;
    console.log(filter);

    switch (filter) {
        case 'feed':
            renderPosts(feedFilter(postList));
            break;
        case 'latest':
            renderPosts(latestFilter(postList));
            break;
        case 'week':
            renderPosts(topWeekFilter(weekFilter(postList)));
            break;
        case 'month':
            renderPosts(topMonthFilter(monthFilter(postList)));
            break;
        case 'year':
            renderPosts(topYearFilter(yearFilter(postList)));
            break;
        case 'top':
            $('.right-filter').toggleClass('d-flex').toggleClass('dNone');
            console.log('cliick en tooop');
            break;
    }

});

/* Post Render */
const renderPostsWeek = (array) => {


    // Div contenedor de las cards
    const divBody = $('div .main_card');

    divBody.empty();

    $.each(array, function(index, post) {

        // Div contenedor de cada card
        const divCard = $('<div class="card rounded-3 mb-2"></div>');

        // Imagen cover de cada articulo
        const imgCover = $('<img alt="" class="img-fluid">');

        // DATO DINAMICO DE URL DE COVER IMAGE        
        imgCover.attr({ src: post[1].coverImage });

        // Article que contendrĂ¡ el articulo
        const article = $('<article class="card-body"></article>');
        const divdFlex = $('<div class="d-flex"></div>');

        const divImgUser = $('<div></div>');
        const anchorImage = $('<a href="" class="row p-0 m-0 w-75"></a>');
        const imgUser = $('<img class="rounded-circle p-0 imgUser">');

        // DATO DINAMICO DE URL DE IMAGE USER        
        imgUser.attr({ src: post[1].userImg });
        anchorImage.append(imgUser);
        divImgUser.append(anchorImage);

        const divInfoUser = $('<div class="row pe-0 mb-3 lh-sm" style="margin-left:-10px;"></div>')

        // Revisar si el href, debe ser dinĂ¡mico
        const anchorName = $('<a href="#" class="text-dark"></a>')

        // DATO DINAMICO DEL NOMBRE DE USUARIO
        const userName = post[1].user;
        anchorName.text(userName);

        // Revisar si el href, debe ser dinĂ¡mico
        const anchorTimePost = $('<a href="#" class="text-black-50"></a>')
        const time = $('<time></time>');

        // Revisar si el datetime, debe ser dinĂ¡mico
        time.attr({ datetime: "PT2H30M" });
        time.text("2H 30m");
        anchorTimePost.append(time);

        divInfoUser.append(anchorName);
        divInfoUser.append(anchorTimePost);

        // Div contenedor titulo y tags
        const divPost = $('<div class="ms-5"></div');

        // Div contenedor Titulo
        const divTitlePost = $('<div class="card-title mb-3"></div>');
        const h2Title = $('<h2></h2');
        const anchorTitle = $(`<a href="./pages/post.html?&p=${post[0]}" class="text-dark fw-bolder"></a>`);

        // DATO DINAMICO PARA EL TITULO
        const title = post[1].title;

        anchorTitle.text(title);
        h2Title.append(anchorTitle);
        divTitlePost.append(h2Title);

        // Div contenedor tags
        const divTagsPost = $('<div class="mb-3 text-black-50"></div>');

        // DATO DINAMICO PARA LOS TAGS

        const tags = Object.values(post[1].tags);
        tags.forEach(tag => {
            const anchorTag = $(`<a href="#" class="text-black-50 me-3"><span class="text-black-50">#</span>${tag}</a>`);
            divTagsPost.append(anchorTag);
        })

        // Div contenedor scores
        const divFooterPost = $('<div class="d-flex justify-content-between"></div>');
        const divScoresPost = $('<div class="d-flex align-items-center"></div>')

        // DATO DINAMICO PARA LOS REACTIONS
        const anchorReactions = $('<a href="#" class="me-3 "></a>');
        const reactions = post[1].likes;
        // Se valida si las reactions son mayores a cero, en caso contrario, no se pinta el elemento
        if (reactions > 0 && reactions != null) {
            const svgReactions = $('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path></svg>');
            const paragraphReactions = $('<p class="d-inline-block text-dark m-0"></p>');

            paragraphReactions.text(reactions);
            const spanReactions = $('<span class="text-dark">&nbsp;Reactions</span>');

            // Se integran los elementos del Reactions
            anchorReactions.append(svgReactions);
            anchorReactions.append(paragraphReactions);
            anchorReactions.append(spanReactions);
        }

        const anchorComments = $('<a href="#" class="me-3 "></a>');
        const svgComments = $('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>');
        const paragraphComments = $('<p class="d-inline-block text-dark m-0"></p>');

        // DATO DINAMICO PARA LOS REACTIONS
        const comments = post[1].comments;
        // Se valida si el nĂºmero de comentarios es mayor a cero, para mostrar un mensaje u otro
        let spanComments;
        comments > 0 && comments != null ? (paragraphComments.text(comments), spanComments = $('<span class="text-dark">&nbsp;Comments</span>')) : spanComments = $('<span class="text-dark">&nbsp;Add comment</span>');

        // Se integran los elementos del Comments
        anchorComments.append(svgComments);
        anchorComments.append(paragraphComments);
        anchorComments.append(spanComments);

        // Div contenedor read time
        const divReadTimerPost = $('<div></div>');
        const timeRead = 6;
        const smallTextTime = $(`<small class="me-1">${timeRead} min read</small>`);
        const buttonSavePost = $('<button class="btn btn-light">Delete</button>');
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




/* Week filter */
const weekFilter = (response) => {

    let weekArray = [];
    let week = currentWeek();
    console.log(week, 'LA semana actual')


    //console.log(response);
    response.forEach((element) => {

        //console.log(element[1].datePublication.week);
        if (element[1].datePublication.week == week) {
            weekArray.push(element);
        }

    });

    return weekArray;

}

/* Top week filter */
const topWeekFilter = (arrayWeek) => {

    //console.log(arrayWeek, 'recibe');
    arrayWeek.sort((a, b) => {

        return b[1].likes - a[1].likes;
    })

    //console.log(arrayWeek);
    return arrayWeek;

}

/* Month Filter */

const monthFilter = (response) => {

    let monthArray = [];
    let month = dateObj.getUTCMonth() + 1;

    response.forEach((element) => {


        if (element[1].datePublication.month == month) {
            monthArray.push(element);
        }

    });

    return monthArray;

}

/* Top month filter */

const topMonthFilter = (arrayMonth) => {

    arrayMonth.sort((a, b) => {

        return b[1].likes - a[1].likes;
    })

    //console.log(arrayMonth);
    return arrayMonth;
}



/* Year Filter */
const yearFilter = (response) => {

    let yearArray = [];
    let year = dateObj.getUTCFullYear();

    response.forEach((element) => {

        if (element[1].datePublication.year == year) {
            yearArray.push(element);
        }

    });

    return yearArray;

}


/* Top year filter */
const topYearFilter = (arrayYear) => {

    arrayYear.sort((a, b) => {

        return b[1].likes - a[1].likes;
    })

    //console.log(arrayYear);
    return arrayYear;

}


/* Latest */


const latestFilter = (response) => {

    //console.log(response);

    response.sort((a, b) => {
        //console.log(a[1].datePublication.miliseconds - b[1].datePublication.miliseconds);
        return b[1].datePublication.miliseconds - a[1].datePublication.miliseconds;
    })

    //console.log(response);
    return response;

}



/* Feed */

const feedFilter = (response) => {

    return response;
}