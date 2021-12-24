import React from "react";
import { Link } from "react-router-dom";
import navbar from './index.module.css'

export default function NavBar() {
  return (
    <nav className={navbar.barra}>
      <Link exact to="/home" className={navbar.title}>VideoGame</Link>
      <div className={navbar.links}>
      <Link to="/created"> Create Videogame </Link>
      <Link to="/about"> About Pi </Link>
      </div>
    </nav>
  );
}