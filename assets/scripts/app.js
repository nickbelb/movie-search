'use strict';
import * as utils from "../scripts/utility.js"
import movies  from "../data/movies.js"

const movie_name = utils.selectObject('.movie-name');
const movie_search_btn = utils.selectObject('.search-movie-btn');
const result_list=utils.selectObject('.result-list');
const result_area = utils.selectObject('.results-area');
const movie_image = utils.selectObject('.movie-image');
const movie_title = utils.selectObject('.movie-title');
const movie_duration =utils.selectObject('.movie-duration');
const movie_year = utils.selectObject('.movie-year');
const movie_plot = utils.selectObject('.movie-plot');
const movie_description = utils.selectObject('.movie-details');
const movie_name_input = utils.selectObject('.movie-name');
const movie_genres = utils.selectObject('.movie-genres');
let selected_movie;

function listMovies(){
    let movies_matched = movies.filter(movie=>movie.title.toLowerCase().match(`^${movie_name.value.toLowerCase()}`));
    if(movies_matched.length>0){
        createListMovies(movies_matched);
    }else{
        createNoMoviesObject();
    }
}

function createListMovies(movies_matched){
    clearResultArea();
    result_area.classList.remove("hidden");
    result_list.classList.remove("overflow");
    if(movies_matched.length > 5){
        utils.addClassToItems(result_list,'overflow')
    }
    movies_matched.forEach(movie => {
        const result_card = document.createElement('div');
        const message = document.createElement('p');
        result_card.id = movie.id;
        result_card.addEventListener("click",()=>{
            addTextToInput(movie.title,movie.id);
        })
        message.textContent = movie.title
        utils.addClassToItems(result_card,'result-card','movie-option');
        utils.addChildToElement(result_card,message);
        utils.addChildToElement(result_list,result_card);
    })
}

function addTextToInput(title,id){
    selected_movie = id;
    movie_name_input.value = title
    utils.addClassToItems(result_area,'hidden');
}

function showMovieDetails(id){
    if(id != null){
        utils.addClassToItems(result_area,'hidden');
        movie_description.classList.remove('hidden');
        let selected_movie = movies.find(mov=>mov.id==id);
        movie_image.src = selected_movie.poster
        movie_title.textContent = selected_movie.title;
        movie_year.textContent = selected_movie.year
        movie_duration.textContent = selected_movie.runningTime;
        movie_plot.textContent = selected_movie.description;
        createGenresCards(selected_movie.genre);
    }
}

function createGenresCards(genres){
    movie_genres.innerHTML=""
    genres.forEach(gen => {
        const genre = document.createElement('p');
        genre.textContent=gen;
        utils.addChildToElement(movie_genres,genre);
    })
}

function createNoMoviesObject(){
    clearResultArea();
    result_list.classList.remove('overflow');
    result_area.classList.remove("hidden");
    const result_card =  document.createElement('div');
    const message = document.createElement('p');
    message.textContent = "No movies found";
    utils.addClassToItems(result_card,'result-card');
    utils.addChildToElement(result_card,message);
    utils.addChildToElement(result_list,result_card)
}

function clearResultArea(){
    result_list.innerHTML = "";
}

function hideResultBar(){
    utils.addClassToItems(result_area,"hidden");
}

utils.onEvent('keyup',movie_name,()=>{
    if(movie_name.value.length >= 3){
        listMovies();
    }else{
        hideResultBar();
    }
});

utils.onEvent('click',movie_search_btn,()=>{
    showMovieDetails(selected_movie)
});