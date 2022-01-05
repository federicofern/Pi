import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getVideogames, orderByRating, filterCreated, alphabeticalOrder, getGenres, filterByGenres, getGamesbyName } from '../../actions'
import GameCard from '../Card/Card.jsx'
import Paginado from "../Paginado";
import SearchBar from "../SearchBar";
import style from './home.module.css';
import imageNotFound from './image-04.jpg'
/* 
useDispatch: Devuelve una referencia a la función dispatch de la tienda Redux. Puede usarlo para enviar acciones según sea necesario.
useSelector: Le permite extraer datos del estado de la tienda Redux, usando una función de selector. El selector es aproximadamente equivalente al mapStateToProps conceptualmente.
*/

const divStyle = {
    textDecoration: "none",
  };

export default function Home() {

    const dispatch = useDispatch();
    const allVideoGames = useSelector((state) => state.videoGames) //Como todo mi app esta envuelta en el Povider, el state esta disponible para todos los componentes. Me guardo en esa constante todo lo que tiene el estado en videoGames.
    const allGenres = useSelector((state) => state.genres);

    /* Nos traemos del estado el contenido, cuando el componente se monta */

    useEffect(() => {
        dispatch(getVideogames())
    }, []) //Será llamado cuando el componente se monte y cuando se actualice.

    /* --------PAGINADO------- */
    /* Declaro mis estados locales para armar el paginado */
    const [currentPage, setCurrentPage] = useState(1) //pagina en la que me encuentro en ese momento
    const videogamesPerPage = 15 //cantidad de videogames que necesito por página

    /* dividimos el total de los videogames que nos trae el estado dependiendo la cantidad que necesito por página */
    const positionOfLastVideogame = currentPage * videogamesPerPage; //15
    const positionOfFirstVideogame = positionOfLastVideogame - videogamesPerPage; //0

    const currentVideogames = allVideoGames.slice(positionOfFirstVideogame, positionOfLastVideogame) //Como el Slice divide el array desde el primer parametro hasta el segundo parámetro (sin incluirlo) nos vamos a traer los juegos de a 15.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    /* -----------Funciones onClick/onChange -------------*/
    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))

    }

    /* ordenamientos por sort */
    const [order, setOrder] = useState('')
    const handleSortAlphabetical = (e) => {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value))
        setCurrentPage(1)//aviso que empezamos desde la pagina 1
        setOrder(`Ordenado ${e.target.value}`) //Este estado avisa que se hizo un ordenamiento y como solo se renderiza cuando ubo un cambio de estado o cambian las props, "forzamos" a que se renderice de nuevo la lista.
    }
    const handleSortRating = (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)//aviso que empezamos desde la pagina 1
        setOrder(`Ordenado ${e.target.value}`) //Este estado avisa que se hizo un ordenamiento y como solo se renderiza cuando ubo un cambio de estado o cambian las props, "forzamos" a que se renderice de nuevo la lista.
    }

    /* Orden por género */

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const handleFilterByGenres = (ev) => {
        ev.preventDefault();
        dispatch(filterByGenres(ev.target.name));
        setCurrentPage(1);
    };

    /* La pgina siempre empieza desde arriba */
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className={style.contenedor}>
            <div className={style.generos}>
                <h2>GENRES</h2>
                <div className={style.bot}>
                    <button onClick={handleFilterByGenres} name="All" key='All'>All</button>
                    {allGenres &&
                        allGenres.map((genres) => (
                            <button onClick={handleFilterByGenres} name={genres.name} key={genres.name}>{genres.name}</button>
                        ))}
                </div>
            </div>
            <div>
                <div className={style.searchBar}>
                    <SearchBar key='SearchBar' />
                </div>
                <div className={style.filters}>
                    <div>
                        <p>Alphabetical Order </p>
                        <select onChange={handleSortAlphabetical} key='Alpha'>
                            <option value="alpha">All</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                    </div>

                    <div>
                        <p>Order by Rating </p>
                        <select onChange={handleSortRating} key='Rating'>
                            <option value="rating">All</option>
                            <option value="top">Top</option>
                            <option value="btt">Bottom</option>
                        </select>
                    </div>

                    <div>
                        <p>Filter by Created </p>
                        <select onChange={handleFilterCreated} key='Created'>
                            <option value="all" >All</option>
                            <option value="created">Created</option>
                            <option value="existing">Existing</option>
                        </select>
                    </div>
                </div>


                {currentVideogames.length > 0 ?
                    (<div>
                        <div className={style.contenedorChico}>
                            <Paginado
                                videogamesPerPage={videogamesPerPage}
                                allVideoGames={allVideoGames.length}
                                paginado={paginado}
                                key='Paginado'
                            />
                        </div>
                        <div className={style.total}>
                            {currentVideogames?.map((el) => ( //Mapeamos currentVideogames de modo que se aplique una division de los videogames por página. Cuando yo seteo el estado local currentPage se repite toda la logica desde mi const paginado, pasando por mi elemento Paginado y vuelta a currentVideogames 
                                <Link style={divStyle} to={'/videogame/' + el.id} id={el.id} key={el.id.toString()}>
                                    <GameCard
                                        /* key={el.id.toString()}  */
                                        img={el.background_image ? el.background_image : imageNotFound}
                                        name={el.name}
                                        rating={el.rating}
                                        genres={el.genres.map((gen) => {
                                            return `${gen.name}. `
                                        })}
                                    />
                                </Link>
                            )
                            )}
                        </div>
                    </div>)
                    :
                    (<div className={style.load}>
                        <div className={style.loader}>
                        </div>
                    </div>
                    )}

            </div>
        </div>
    )
}