import React from "react";
import style from './card.module.css'
import imagen from './imagenes/notfound.jpg'

const GameCard = ({ name, img, genres, id }) => {

  return (
    <div className={style.card}>
        <div className={style.box}>
        <img src={img ? img : imagen} alt='not found' />
        </div>
        <div className={style.contenido}>
          <h4>{name}</h4>
          <div className={style.generos}> {genres.map((gen) => <p key={gen}>{gen}</p>)}</div>
        </div>
    </div>
  );
};

export default GameCard;