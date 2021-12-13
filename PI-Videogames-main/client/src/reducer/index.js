import { GET_VIDEOGAMES, FILTER_RATING, FILTER_CREATED } from '../actions/index'

const initialState={
    videoGames: [],
    allVideogames: []
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
            const allVideogames= state.allVideogames
            const createdFilter= action.payload === 'created'? allVideogames.filter(el=> el.id.length>20) : allVideogames.filter(el=> el.id.length <20)
            return{
            ...state,
            videoGames: action.payload === 'All' ? state.videoGames : createdFilter
            }
        case FILTER_RATING:
            const allVideogames2= state.allVideogames
            const sortVideogames= action.payload==='a-z'? 
                /* ORDEN ALFABETICO A-Z */
                allVideogames2.sort((a,b)=>{
                    /* En el sort pregunto en los if si estan bien ordenados de esa manera los caracteres, por ejemplo en el primer if pregunta si a<b (F<J), como si lo es, no los rota. */
                    if(a.name<b.name){ //
                    return -1 //no rotes
                    } if(a.name>b.name){//b va antes que a
                    return 1 //rotalos
                    }
                    return 0; //son iguales, dejalos así
                } ) : 
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
                    videoGames:  action.payload === 'All' ? state.videoGames : sortVideogames
                } 
        default:
            return state;
    }
}

