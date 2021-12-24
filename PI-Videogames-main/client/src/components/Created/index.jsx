import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../../actions";
import crear from './index.module.css'

export default function VideogameCreate (){
    const dispatch= useDispatch()
    const genre= useSelector((state)=> state.genres)
    const platforms= useSelector((state)=> state.platforms)

    const [input, setInput] = useState({
        name: '',
        background_image: '',
        description: '',
        platforms: [],
        rating: 0,
        released: '',
        genres:[]
    })

    useEffect(()=>{
        dispatch(getGenres())
    },[])

    useEffect(()=>{
        dispatch(getPlatforms())
    },[])

    /* Funciones onClick/onChange */

    const handleChange=(e)=>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectP = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    const handleSelectG = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(postVideogame(input))
        alert("You've a New Video Game!")
        setInput({
            name: '',
            background_image: '',
            description: '',
            platforms: [],
            rating: 0,
            released: '',
            genres:[]
        })
    }

    return (
        <div className={crear.fondo}>
            <div className={crear.form}>
            <h1>NEW VIDEOGAME</h1>
            <form onSubmit={handleSubmit}>
                <div className={crear.box1}>
                <div>
                    <label>Name: </label>
                    <input type='text' placeholder="What is it called?" value={input.name} name='name' onChange={handleChange}></input>
                </div>
                <div>
                    <label>Rating: </label>
                    <input type='number' placeholder='1,00' value={input.rating} name='rating' onChange={handleChange} step="0.01" min="0" max="5"></input>
                </div>
                </div>
                <div>
                    <label>Description: </label>
                    <input type='text' placeholder="What is it about?" value={input.description} name='description' onChange={handleChange}></input>
                </div>
                <div className={crear.box2}>
                <div>
                    <label>Released: </label>
                    <input type='date' placeholder='when was it released?' value={input.released} name='released' onChange={handleChange}></input>
                </div>
                <div>
                    <label>Image: </label>
                    <input type='text' placeholder="Put the URL of the image" value={input.background_image} name='background_image' onChange={handleChange}></input>
                </div>
                </div>
                <div className={crear.platgen}>
                    <div >
                    <label>Platforms: </label>
                    <select onChange={handleSelectP}>
                        {platforms.map((p)=>(
                            <option value={p}>{p}</option>
                        ))}
                    </select>
                    <ul>{ !input.platforms.length ? <p>Select Platforms</p> : input.platforms.map(e=> <li>{e}</li>)}</ul>
                    </div>

                    <div>
                    <label>Genres: </label>
                    <select onChange={handleSelectG}>
                        {genre.map((p)=>(
                            <option value={p.name}>{p.name}</option>
                        ))}
                    </select>
                    <ul>{ !input.genres.length ? <p>Select Genres</p> : input.genres.map(e=> <li>{e}</li>)}</ul>
                    </div>
                </div>
                <div className={crear.button}>
                <button type="submit">Crear</button>
                <button type='button'>Cancel</button>
                </div>
            </form>
            </div>
        </div>
    )
}
