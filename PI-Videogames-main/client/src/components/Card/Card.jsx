import React from "react";
import style from './card.module.css'


const GameCard = ({ name, img, genres, id }) => {
  
  return (
    <div  className={style.card} >
      <div className={style.box}>
        <img src={img? img : './IMG/IMG_NOT_FOUND-04.jpg'} alt='not found'/>      
      </div>
        <h4>{name}</h4>
        <p> {genres}</p>
    </div>
  );
};

export default GameCard;