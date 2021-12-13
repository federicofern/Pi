import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesbyName} from "../../redux/actions";
import style from "./style.module.css";
import loadImg from "../../img/kisspng-playstation-4-game-controllers-video-game-dualshoc-joystick-5ac65913083124.6942663115229483710336.png";

export default function NavBar({allGames,setCurrentPage}) {
  const dispatch = useDispatch();
  const [busqueda, setBusqueda] = useState("");


  const handleSearch = (ev) => {
    ev.preventDefault();
    setBusqueda(ev.target.value);
  };

  const handleSubmit =  (ev) => {

    ev.preventDefault();
     dispatch(getGamesbyName(busqueda));
     setCurrentPage(1)
    setBusqueda("");
    
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    window.location.reload();
  }

  return (
    <div className={style.container}>
      <h1>VIDEO GAMES</h1>
      <Link onClick= {handleClick} to="/videogames"> Home </Link>
      <Link to="/videogame"> Create Videogame </Link>
      <Link to="/contact"> Contact </Link>
      <Link to="/about"> About me </Link>
      <div  className={style.container_input}>

        {allGames.length > 0?<form onSubmit={(e)=>handleSubmit(e)}>
          <input
            id='name'
            name= 'name'
            type="text"
            value={busqueda}
            onChange={(ev) => handleSearch(ev)}
          />
          <button type='submit' >
            Buscar
          </button>
          </form>
          : <img src={`${loadImg}`} alt="No mames" />    
        }
      </div>
    </div>
  );
}