import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from '../../actions/index'
import { Link, useParams } from 'react-router-dom'
import style from './details.module.css'


const divStyle = {
    textDecoration: "none",
    };

export default function Details(props) {
    const dispatch = useDispatch()
    const {id}= useParams()
    

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, id])
    
    let details =  useSelector((state) => state.detail)
    

    return (
        <div className={style.cont}>
                {details? 
                    <div className={style.card}>
                                <Link to="/home" style={divStyle}>
                                    <button>Back</button>
                                </Link>
                        <img src={`${details[0]?.background_image}`} alt="Not Found" />
                        <h1>{details[0]?.name}</h1>
                        <div>
                           <h2> {details[0]?.genres?.map((gen) => gen?.name ? 
                        gen.name+ ' ' : gen + ' ')
                        }</h2>
                        </div>
                        <p> Released: {details[0]?.released}</p>
                        <p>Rating: {details[0]?.rating}</p>
                        <p>Platforms: {details[0]?.platforms} </p>
                        <p>Description:</p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: details[0]?.description,
                            }}
                        ></p>
                    </div>
             :  
                <div>
                    <div>
                        <h1> Game not found</h1>
                        <Link to="/videogames">
                            <button> Back to Games </button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}