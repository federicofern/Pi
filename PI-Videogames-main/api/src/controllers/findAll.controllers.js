require("dotenv").config(); //Configuración para utilizar .env
const axios = require("axios");
const { Genero, Videogame } = require("../db");
const API_KEY = process.env.API_KEY;

/* --------------- FUNCIONES UTILES --------------- */
/* Armo las siguientes funciones para hacer las llamadas a la API */

const loadGenero = async () => {
    try {  
      let gen = await Genero.count(); //solicitud a la base de datos, pregunta si esta vacio o no
    
      if (gen === 0) {
        /* Solicito a la base los generos que hay disponibles y los guardo en la variable 'genero', para luego extraer la propiedad results de la data que nos traemos de la api */
        const genero = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const { results } = genero.data;
        /* Iteramos cada uno de los resultados para extraer las propiedades id y name e ir asignando los valores a la tabla Genero */
        for (let i = 0; i < results.length; i++) {
          const { name } = results[i];
          await Genero.create({
            name: name,
          });
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

 const everyGame = async () => {
   /* Los videogames vienen de a 20 por página, genero un array vacio para ir poniendo todos los que me trae por cada una. Defino una constante 'videogames' donde se almacenarán los datos traidos de la Api*/
   try {
     let page = 1;
      var videogamesTotal = [];
      while (page < 6) {
        const videogamesPorPagina = await axios(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
        );
        var { results } = videogamesPorPagina.data;
        /* Concateno el array results que me envia la api con el array vacio definido al principio, y por cada iteración del bucle se iran sumando los resultados de cada pagina */
        videogamesTotal = videogamesTotal.concat(results);
        page++;
      }
      return videogamesTotal;
   } catch (error) {
     console.log(error)
   } 
};
  
const gameDetail = async (id) => {
  /* Realizo la petición a la api para que me traiga el detalle del videojuego seleccionado. */
    try {
        const videogame = await axios(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    return videogame 
    } catch (error) {
      console.log(error)
    } 
};


/* --------------- FUNCIONES PARA GENERAR LAS RUTAS --------------- */


const createGenreDB = async (req, res) => {
  await loadGenero();
  res.status(200).json(await Genero.findAll());
}



const allVG = async (req, res) => {
  try {
    const list = await everyGame();
    const videoGames = new Array();
    const countVideoGame = await Videogame.count();

    /* Si tengo Video juegos en la DB los pongo en un array para ser enviado */
    if (countVideoGame !== 0) {
      const game = await Videogame.findAll({ //Me traigo todos los datos de las DB incluida la de Generos
        attributes: ["id", "name", "rating", "background_image"],
        include: [Genero],
      });
      game.map((element) => {
        videoGames.push({
          id: element.id,
          name: element.name,
          genres: element.genres.map((element) => {
            return {
              id: element.id,
              name: element.name,
            };
          }),
          rating: element.rating,
          background_image: element.background_image,
        });
      });
    }
    /* Los juegos que me traigo de la API los envio y muestro de la siguiente manera */
    else{
      for (const game of list) { //de la lista de juegos que me traigo, extraigo los valores que necesito para luego pushear al array.
          const { id, name, background_image, genres, rating } = game;
          const genresArray = [];

           for (const genre of genres) { //de los generos que me traigo de la descripcion de la api, extraigo los valores para armar un array aparte para mí.
               const { name, id } = genre;
               genresArray.push({
                id,
               name,
               });
          }

          videoGames.push({
           id,
           name,
           background_image,
           genres: genresArray,
           rating,
           });
       }
      }   
    /* ---------- BUSQUEDA POR QUERY ---------- */
    if (req.query.name) {
      const nameQuery = req.query.name.toLocaleLowerCase(); //codificar para idiomas locales
      encodeURI(nameQuery); //Para codificar caracteres especiales
      const arrayGames = [];
      let i = 0;

      try {
        const game = await axios(
          `https://api.rawg.io/api/games?search=${nameQuery}&key=${API_KEY}`
        );

        const { results } = game.data;
        if (results.length === 0) { //Si no encuentra ningun juego, es decir no hay resultados (array vacio)
          res.status(200).json({ error: "Game not found" });
        } else {
          for (const result of results) { //Extraigo de results los datos que necesito
            const { id, name, background_image, genres, rating } = result;
            if (i < 15) { //con esto traigo los primeros 15 resultados
              arrayGames.push({
                id,
                name,
                background_image,
                genres: genres.map((element) => {
                  return { name: element.name, id: element.id };
                }),
                rating
              });
              i++;
            }
          }
          res.status(200).json(arrayGames);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(200).send(videoGames);
    }
  } catch (error) {
    console.log(error);
  }
}



const searchVGid = async (req, res) => {
  try {
    const idVideogame = req.params.idVideogame;

    /* Como la propiedad UUID crea un id de 32 digitos, verifico si el videogame que me pasan por id corresponde a la base de datos o a la api. Los creados van a estar en la DB con el id de UUID y los demas en la api. */

    /*---------- BUSQUEDA POR ID EN DB ---------- */
    if (idVideogame.length > 20) {
      const arrayDB = [];
      const gameDB = await Videogame.findByPk(`${idVideogame}`, {
        include: [Genero],
      });
      const {
        id,
        background_image,
        name,
        genres,
        description,
        released,
        rating,
        platforms,
      } = gameDB;
      arrayDB.push({
        id,
        name,
        background_image,
        description,
        released,
        rating,
        platforms,
        genres: genres.map((element) => {
          return {
            id: element.id,
            name: element.name,
          };
        }),
      });

      /* Meto toda la date del video juego en un array para ser enviado como Json*/

      res.status(200).json(arrayDB);
    } else {

      /* ---------- BUSQUEDA POR ID EN API ---------- */

      const videogame = await gameDetail(idVideogame);
      console.log("Holis, entré!")
      console.log(videogame);
      if (videogame === undefined) {
        res.status(200).json({ error: "Game not found" });
      } else {
        const {
          id,
          name,
          background_image,
          description,
          released,
          rating,
          platforms,
          genres,
        } = videogame.data;

        const game = [];

        game.push({
          id,
          name,
          background_image,
          description,
          released,
          rating,
          platforms: platforms.map((element) => element.platform.name),
          genres: genres.map((element) => element.name),
        });

        /* De la informacion que me traigo de la api, la guardo enn un array y lo envio como Json */

        res.status(200).json(game);
      }
    }
  } catch (error) {
    console.log(error);
  }
}



const createGame = async (req, res) => {
  try {
    const {name, background_image, description, released, rating, platforms, genres} = req.body;
    const newVideogame = await Videogame.create({
      name,
      background_image,
      description,
      platforms,
      rating,
      released,
    })
    let genero= await Genero.findAll({ 
      where: {name: genres},
    }
    )
    newVideogame.addGenero(genero)
    res.send('Videogame Successfully Created')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createGenreDB,
  allVG,
  searchVGid,
  createGame
}