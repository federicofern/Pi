import reducer from "../reducer/index";
import {
  GET_VIDEOGAMES,
  FILTER_CREATED,
  /* FILTER_RATING, 
  ALPHABETICAL_ORDER,
  GET_GAMES_BY_NAME,
  GET_GENRES,
  GET_PLATFORMS,
  POST_GAME,
  FILTER_BY_GENRES,
  GET_DETAILS */
} from '../actions/index'

describe("reducer", () => {
  it("Debería retornar el estado inicial", () => {
    expect(reducer(undefined, [])).toEqual({ "allVideogames": [], "detail": [], "genres": [], "platforms": [], "videoGames": [] });
  });

  it('Debería poder almacenar los Videogames en state.videoGames y state.allVideogames', () => {
    const startAction = {
      type: GET_VIDEOGAMES,
      payload: {
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      }
    };
    // fijarse bien las propiedades que tiene que recibir.
    expect(reducer(undefined, startAction)).toEqual({
      videoGames: {
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      },
      allVideogames: {
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      },
      detail: [],
      genres: [],
      platforms: [],
    });
  });

  it('Debería poder filtrar por Creados', () => {
    let state ={
      videoGames: [{
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      },
      {
        id: 3455,
        name: "Ahorcado",
        genres: [{ id: '33', name: "action" }],
        rating: "3.60",
        background_image: "www.papergames.com/game3455.jpg"
      }],
      allVideogames: [{
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      },
      {
        id: 3455,
        name: "Ahorcado",
        genres: [{ id: '33', name: "action" }],
        rating: "3.60",
        background_image: "www.papergames.com/game3455.jpg"
      }],
      detail: [],
      genres: [],
      platforms: [],
    }
    const secondAction = {
      type: FILTER_CREATED,
      payload: 'created'
    };
    // fijarse bien las propiedades que tiene que recibir.
    expect(reducer(state, secondAction)).toEqual({
      videoGames: [{
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      }],
      allVideogames: [{
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      },
      {
        id: 3455,
        name: "Ahorcado",
        genres: [{ id: '33', name: "action" }],
        rating: "3.60",
        background_image: "www.papergames.com/game3455.jpg"
      }],
      detail: [],
      genres: [],
      platforms: [],
    });
  });

  it('Debería poder filtrar por Existentes', () => {
    let state ={
      videoGames: [{
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      },
      {
        id: 3455,
        name: "Ahorcado",
        genres: [{ id: '33', name: "action" }],
        rating: "3.60",
        background_image: "www.papergames.com/game3455.jpg"
      }],
      allVideogames: [{
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      },
      {
        id: 3455,
        name: "Ahorcado",
        genres: [{ id: '33', name: "action" }],
        rating: "3.60",
        background_image: "www.papergames.com/game3455.jpg"
      }],
      detail: [],
      genres: [],
      platforms: [],
    }
    const secondAction = {
      type: FILTER_CREATED,
      payload: 'existing'
    };
    // fijarse bien las propiedades que tiene que recibir.
    expect(reducer(state, secondAction)).toEqual({
      videoGames: [{
        id: 3455,
        name: "Ahorcado",
        genres: [{ id: '33', name: "action" }],
        rating: "3.60",
        background_image: "www.papergames.com/game3455.jpg"
      }],
      allVideogames: [{
        id: "1234f34f34",
        name: "La Mancha",
        genres: [{ id: '1243', name: "action" }],
        rating: "4.00",
        background_image: "www.lamancha.com/juego.jpg"
      },
      {
        id: 3455,
        name: "Ahorcado",
        genres: [{ id: '33', name: "action" }],
        rating: "3.60",
        background_image: "www.papergames.com/game3455.jpg"
      }],
      detail: [],
      genres: [],
      platforms: [],
    });
  });

})