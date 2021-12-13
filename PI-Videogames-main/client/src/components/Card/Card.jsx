import React from "react";
import { Link } from "react-router-dom";


const GameCard = ({ name, img, genres, id }) => {
  
  return (
    <div /* className={style.container} */>
      <Link to= {`/videogame/${id}`} match="asd" >
        <h4>{name}</h4>
        <p> {genres}</p>
        <img src={img? img : './IMG/IMG_NOT_FOUND-04.jpg'} alt='not found'/>
      </Link>
        
    </div>
  );
};

export default GameCard;