import axios from 'axios'

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const FILTER_RATING = 'FILTER_RATING'
export const FILTER_CREATED = 'FILTER_CREATED'

/* genero la funcion que me traiga todos los videojuegos a travez de una accion*/
export function getVideogames (){
    return async function(dispatch){
        var vidgame= await axios('http://localhost:3001/videogames');
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: vidgame.data
        })
    }
}

/* funcion que me ordene los elementos por rating */

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

export function orderAlphabetic(payload){
    return{
        type: FILTER_RATING,
        payload
    }
}