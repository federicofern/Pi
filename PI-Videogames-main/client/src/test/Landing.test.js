import React from 'react';
import LandingPage from '../components/Landing/index'
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import style from'../components/Landing/index.module.css'
import welcome from '../components/Landing/welcome1.png'

configure({ adapter: new Adapter() });

describe('<LandingPage /> Mounted', () => {

    it("Renderiza sin Romperse", () => {
        shallow(<LandingPage />);
      });

      it("Renderiza el botón", () => {
        const render = shallow(<LandingPage />);
        const start = <button className={style.iniciar} >START</button>;
        expect(render.contains(start)).toEqual(true);
      });

      it("Renderiza  'Welkome' ", () => {
        const wrapper = shallow(<LandingPage />);
        const welcomeImg = <img id="bienvenido" src={welcome} className={style.welcome} alt=""/>;
        expect(wrapper.contains(welcomeImg)).toEqual(true);
      });
})