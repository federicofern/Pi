import React, {useEffect} from "react";

import html from './img/html.svg'
import css from './img/css.svg'
import express from './img/express-10.svg'
import js from './img/JS.svg'
import node from './img/nodeJS.svg'
import postgresql from './img/postgresql.svg'
import react from './img/react.svg'
import redux from './img/redux.svg'
import sequelize from './img/sequelize.svg'
import gmail from './img/gmail.svg'
import link from './img/linkedin.svg'
import github from './img/github-10.svg'

import style from './index.module.css'


export default function About() {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className={style.fond}>
            <div className={style.contenedor}>
                <h1>Hi, my name is Federico Fernández!</h1>
                <pre>Living in Argentina &#127462;&#127479;, studying the career of Full Stack Developer &#128187;.
                    <br />
                    I am an image and sound designer 🎥🎞️, passionate about graphic, web and editorial design.
                    <br />
                    I'm a team player who likes challenges and adapts to changes.
                    #StudentModeAlways&#128218;
                </pre>
                <h2><span>&lt;</span> <h3>Skills</h3> &nbsp;<span>/&gt;</span></h2>
                <h4>Frontend</h4>
                <div className={style.cont}>
                    <div>
                        <img src={html} alt="HTML" />
                        <p>HTML</p>
                    </div>
                    <div>
                        <img src={css} alt="CSS" />
                        <p>CSS</p>
                    </div>
                    <div>
                        <img src={js} alt="JS" />
                        <p>JavaScript</p>
                    </div>
                    <div>
                        <img src={react} alt="REACT" />
                        <p>React</p>
                    </div>
                    <div>
                        <img src={redux} alt="REDUX" />
                        <p>Redux</p>
                    </div>
                </div>
                <h4>Backend</h4>
                <div className={style.cont}>
                    <div>
                        <img src={node} alt="NODE" />
                        <p>Node JS</p>
                    </div>
                    <div>
                        <img src={express} alt="EXPRESS" />
                        <p>Express</p>
                    </div>
                    <div>
                        <img src={postgresql} alt="POSTGRESQL" />
                        <p>PostgreSQL</p>
                    </div>
                    <div>
                        <img src={sequelize} alt="SEQUELIZE" />
                        <p>Sequelize</p>
                    </div>
                </div>
                <div className={style.contact}>
                <h2><span>&lt;</span><h3>Contact</h3> &nbsp;<span>/&gt;</span></h2>
                </div>
                <div className={style.cont}>
                    <div>
                        <a href="mailto:fedefdez.ffn@gmail.com">
                            <img src={gmail} alt="Gmail" />
                        </a>
                        <p>Gmail</p>
                    </div>
                    <div>
                        <a href='https://github.com/federicofern' target="_blank">
                            <img src={github} alt="GitHub" />
                        </a>
                        <p>GitHub</p>
                    </div>
                    <div>
                        <a href='https://www.linkedin.com/in/federicofern/' target="_blank">
                            <img src={link} alt="Linkedin" />
                        </a>
                        <p>Linkedin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}