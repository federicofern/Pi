import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getGamesbyName} from '../../actions/index'
import s from './index.module.css'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName]= useState('')

    const handleChange= (e)=>{
        e.preventDefault()
        setName(e.target.value)
    }

    const handleClick=(e)=>{
        e.preventDefault()
        dispatch(getGamesbyName(name))
        setName('')
    }

    return (
        <div className={s.search}>
            <input type='text' placeholder='Search Video Game' onChange={handleChange}/>
            <button type='submit' onClick ={handleClick}>Search</button>
        </div>
    )
}