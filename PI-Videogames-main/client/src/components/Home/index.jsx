import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getVideogames, orderByRating, filterCreated } from '../../actions'
import Card from '../Card/Card.jsx'
import {Link} from 'react-router-dom'
import Paginado from "../Paginado";
/* 
useDispatch: Devuelve una referencia a la función dispatch de la tienda Redux. Puede usarlo para enviar acciones según sea necesario.
useSelector: Le permite extraer datos del estado de la tienda Redux, usando una función de selector. El selector es aproximadamente equivalente al mapStateToProps conceptualmente.
*/

export default function Home(){

    const dispatch= useDispatch();
    const allVideoGames= useSelector((state) => state.videoGames) //Como todo mi app esta envuelta en el Povider, el state esta disponible para todos los componentes. Me guardo en esa constante todo lo que tiene el estado en videoGames.

    /* Nos traemos del estado el contenido, cuando el componente se monta */

    useEffect (()=>{
        dispatch(getVideogames())
    }) //Será llamado cuando el componente se monte y cuando se actualice.
    
    /* --------PAGINADO------- */
    /* Declaro mis estados locales para armar el paginado */
    const [currentPage, setCurrentPage]= useState(1) //pagina en la que me encuentro en ese momento
    const [videogamesPerPage, setVideogamesPerPage] = useState(15) //cantidad de videogames que necesito por página

    /* dividimos el total de los videogames que nos trae el estado dependiendo la cantidad que necesito por página */
    const positionOfLastVideogame= currentPage * videogamesPerPage; //15
    const positionOfFirstVideogame = positionOfLastVideogame- videogamesPerPage; //0

    const currentVideogames = allVideoGames.slice(positionOfFirstVideogame, positionOfLastVideogame) //Como el Slice divide el array desde el primer parametro hasta el segundo parámetro (sin incluirlo) nos vamos a traer los juegos de a 15.

    const paginado = (pageNumber) =>{ 
        setCurrentPage(pageNumber)
    }


    /* Funciones onClick/onChange */
    const handleFilterCreated = (e)=>{
        dispatch(filterCreated(e.target.value))
    }

    return (
        <div>
            <div>
                <div>   
                <p>Alphabetical Order</p>
                <select>
                    <option value="all">All</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>
                </div> 

                <div>   
                <p>Order by Rating</p>
                <select>
                    <option value="all2">All</option>
                    <option value="top">Top</option>
                    <option value="btt">Bottom</option>
                </select>
                </div>

                <div>   
                <p>Filter by Created</p>
                <select onChange={e => handleFilterCreated}>
                    <option value="all3">All</option>
                    <option value="created">Created</option>
                    <option value="exist">Existing</option>
                </select>
                </div>
            </div>

            <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideoGames={allVideoGames.length}
            paginado={paginado}
            />

            {currentVideogames && currentVideogames.map((el)=>( //Mapeamos currentVideogames de modo que se aplique una division de los videogames por página. Cuando yo seteo el estado local currentPage se repite toda la logica desde mi const paginado, pasando por mi elemento Paginado y vuelta a currentVideogames
                <Link to={'/videogame/' + el.id}>
                    <Card
                    name= {el.name}
                    img= {el.background_img} //PREGUNTAR POR QUE NO ME TRAE LAS IMAGENES
                    id={el.id}
                    key={el.id}
                    genres={el.genres.map((gen)=>{
                        return gen.name + ' '
                    })}
                    />
                </Link>
            )
            )}
        </div>
    )
}