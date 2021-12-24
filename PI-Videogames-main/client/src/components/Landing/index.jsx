import React from "react";
import { Link } from 'react-router-dom';
import l from'./index.module.css'
import welcome from './welcome1.png'

export default function LandingPage() {
    return(
        <div className={l.landing}>
          
            <img id="bienvenido" src={welcome} className={l.welcome} alt=""/>
            <Link to= '/home'>
                <button className={l.iniciar} >START</button>
            </Link>
        
        </div>
    )
}  