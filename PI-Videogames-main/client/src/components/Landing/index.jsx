import React from "react";
import { Link } from 'react-router-dom';
import style from'./index.module.css'
import welcome from './welcome1.png'

export default function LandingPage() {
    return(
        <div className={style.landing}>
          
            <img id="bienvenido" src={welcome} className={style.welcome} alt=""/>
            <Link to= '/home'>
                <button className={style.iniciar} >START</button>
            </Link>
        
        </div>
    )
}  