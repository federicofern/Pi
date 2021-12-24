import { GET_VIDEOGAMES, 
    FILTER_RATING, 
    FILTER_CREATED, 
    ALPHABETICAL_ORDER,
    GET_GAMES_BY_NAME,
    GET_GENRES,
    GET_PLATFORMS,
    POST_GAME,
    FILTER_BY_GENRES,
    GET_DETAILS
     } from '../actions/index'

const initialState={
    videoGames: [],
    allVideogames: [],
    genres: [],
    platforms: [],
    detail:[]
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES: /* modifico el estado inicial cuando se ejecuta esta accion */
        return{
            ...state,
            videoGames: action.payload,
            allVideogames: action.payload
        }
        case FILTER_CREATED:
            let allVideogames1= state.allVideogames
            const createdFilter= action.payload === 'created'? allVideogames1.filter((el) => typeof el.id === "string") : allVideogames1.filter((el) => typeof el.id === "number")
            return{
            ...state,
            videoGames: action.payload === 'created' ? allVideogames1 : createdFilter
            }
        case ALPHABETICAL_ORDER:
            let allVideogames2= state.allVideogames

            const sortVideogamesAlpha = action.payload==='a-z'? 
                /* ORDEN ALFABETICO A-Z */
                allVideogames2.sort((a,b)=>{
                    /* En el sort pregunto en los if si estan bien ordenados de esa manera los caracteres, por ejemplo en el primer if pregunta si a<b (F<J), como si lo es, no los rota. */
                    if(a.name<b.name){ //
                    return -1 //no rotes
                    } if(a.name>b.name){//b va antes que a
                    return 1 //rotalos
                    }
                    return 0; //son iguales, dejalos así
                }) : 
                /* ORDEN ALFABETICO Z-A */
                allVideogames2.sort((a,b)=>{
                    /* En el sort pregunto en los if si estan bien ordenados de esa manera los caracteres, por ejemplo en el primer if pregunta si a>b (J>F), si lo es, no los rota. */
                    if(a.name>b.name){ //
                    return -1 //no rotes
                    } if(a.name<b.name){//b va antes que a
                    return 1 //rotalos
                    }
                    return 0;
                })
                return {
                    ...state,
                    videoGames:  action.payload === 'alpha' ? state.allVideogames : sortVideogamesAlpha
                } 
        case FILTER_RATING:
            let allVideogames3= state.allVideogames
            const sortVideogamesRating= action.payload==='top'? 
                /* ORDEN RATING 5-0 */
                allVideogames3.sort((a,b)=>{
                    /* En el sort pregunto en los if si estan bien ordenados de esa manera los caracteres, por ejemplo en el primer if pregunta si a<b (F<J), como si lo es, no los rota. */
                    if(a.rating<b.rating){ //
                    return -1 //no rotes
                    } if(a.rating>b.rating){//b va antes que a
                    return 1 //rotalos
                    }
                    return 0; //son iguales, dejalos así
                }) : 
                /* ORDEN RATING 0-5 */
                allVideogames3.sort((a,b)=>{
                    /* En el sort pregunto en los if si estan bien ordenados de esa manera los caracteres, por ejemplo en el primer if pregunta si a>b (J>F), si lo es, no los rota. */
                    if(a.rating>b.rating){ //
                    return -1 //no rotes
                    } if(a.rating<b.rating){//b va antes que a
                    return 1 //rotalos
                    }
                    return 0;
                })
                return {
                    ...state,
                    videoGames:  action.payload === 'rating' ? allVideogames3 : sortVideogamesRating
                } 
        case GET_GAMES_BY_NAME:
            return{
                ...state,
                videoGames: action.payload
            }
        /* crear un videogame */
        case POST_GAME: {
            return {
              ...state,
            };
          }
        case GET_PLATFORMS: {
            return {
              ...state,
              platforms: action.payload,
            };
          }
        case GET_GENRES: {
            return {
              ...state,
              genres: action.payload,
            };
          }
        case FILTER_BY_GENRES: {
            let allGames = state.allVideogames;
            let genresFilteredGames = action.payload.includes("All")
              ? allGames
              : allGames.filter((element) =>
                  element.genres.map((genres) => genres.name).includes(action.payload)
                );
            return {
              ...state,
              videoGames: genresFilteredGames,
            };
          }
        case GET_DETAILS:{
            return{
                ...state,
                detail: action.payload,
            }
        }
        default:
            return state;
    }
}

