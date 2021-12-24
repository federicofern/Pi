import axios from 'axios'

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const FILTER_RATING = 'FILTER_RATING'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ALPHABETICAL_ORDER = 'ALPHABETICAL_ORDER'
export const GET_GAMES_BY_NAME= 'GET_GAMES_BY_NAME'
export const GET_GENRES= 'GET_GENRES'
export const GET_PLATFORMS= 'GET_PLATFORMS'
export const POST_GAME= 'POST_GAME'
export const FILTER_BY_GENRES= 'FILTER_BY_GENRES'
export const GET_DETAILS = 'GET_DETAILS'

/* Genero la funcion que me traiga todos los videojuegos a travez de una accion*/
export function getVideogames (){
    return async function(dispatch){
        var vidgame= await axios('http://localhost:3001/videogames');
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: vidgame.data
        })
    }
}

/* Funciones que me ordenen los elementos */

export function orderByRating(payload){
    return{
        type: FILTER_RATING,
        payload
    }
}

export function filterCreated (payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function alphabeticalOrder(payload){
    return{
        type: ALPHABETICAL_ORDER,
        payload
    }
}

export const filterByGenres = (payload) => {
  console.log(payload);
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
};

/* Search Bar */
export const getGamesbyName = (name) => {
    console.log(name);
    return async function (dispatch) {
      try {
        var game = await axios.get(
          "http://localhost:3001/videogames?name=" + name
        );
        return dispatch({
          type: GET_GAMES_BY_NAME,
          payload: game.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
  };

/* Created videogames */

export const getGenres = ()=>{
  return async function (dispatch){
    try {
      var genres = await axios("http://localhost:3001/genres")
      return dispatch({
        type: GET_GENRES,
        payload: genres.data
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export const getPlatforms = ()=>{
  return async function (dispatch){
    try {
      var platforms = await axios("http://localhost:3001/platforms")
      return dispatch({
        type: GET_PLATFORMS,
        payload: platforms.data,
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export const postVideogame =(payload)=>{
  return async function (){
    try {
      var response = await axios.post("http://localhost:3001/videogame", payload)
      return response;
    } catch (error) {
      console.log(error)
    }
  }
}

/* Videogame Detalles por ID */

export const getDetails = (id)=>{
  return async function(dispatch){
    var det = await axios('http://localhost:3001/videogame/' + id)
    return dispatch({
      type: GET_DETAILS,
      payload: det.data
    })
  }
}