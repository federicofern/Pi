import React from "react";
import style from './card.module.css'


const GameCard = ({ name, img, genres, id }) => {

  return (
    <div className={style.card} >
      <div className={style.box}>
        {img ?
          <img src={img} alt='not found' /> :
          <img src={'./imagenes/notfound.jpg'} alt='not found' />}
      </div>
      <div className={style.contenido}>
        <h4>{name}</h4>
        <div className={style.generos}> {genres.map((gen) => <p>{gen}</p>)}</div>
      </div>
    </div>
  );
};

export default GameCard;