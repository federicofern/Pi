import VideogameCreate from '../components/Created/index';
import React from 'react';
import { render } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('<VideogameCreate /> Mounted', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<VideogameCreate />);
    });

    /* LABEL */
    it('El form debe tener un label que diga: "Name: "', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('label')[0]
        expect(element.innerHTML).toBe('Name: ');
    });
  
    it('El form debe tener un label que diga: "Rating: "', () => {
      const { container } = render(<VideogameCreate />)
      const element = container.querySelectorAll('label')[1]
      expect(element.innerHTML).toBe('Rating: ');
    });

    it('El form debe tener un label que diga: "Released: "', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('label')[2]
        expect(element.innerHTML).toBe('Released: ');
    });
  
    it('El form debe tener un label que diga: "Image: "', () => {
      const { container } = render(<VideogameCreate />)
      const element = container.querySelectorAll('label')[3]
      expect(element.innerHTML).toBe('Image: ');
    });

    it('El form debe tener un label que diga: "Description: "', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('label')[4]
        expect(element.innerHTML).toBe('Description: ');
    });
  
    it('El form debe tener un label que diga: "Platforms: "', () => {
      const { container } = render(<VideogameCreate />)
      const element = container.querySelectorAll('label')[5]
      expect(element.innerHTML).toBe('Platforms: ');
    });
  
    it('El form debe tener un label que diga: "Genres: "', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('label')[6]
        expect(element.innerHTML).toBe('Genres: ');
    });

    /* INPUT */
    it('El form debe tener un input con name "name" y type "text"', () => {
      const { container } = render(<VideogameCreate />)
      const element = container.querySelectorAll('input')[0]
      expect(element.type).toBe('text');
      expect(element.name).toBe('name');
    });
  
    it('El form debe tener un input con name "rating" y type "number"', () => {
      const { container } = render(<VideogameCreate />)
      const element = container.querySelectorAll('input')[1]
      expect(element.type).toBe('number');
      expect(element.name).toBe('rating');
    });

    it('El form debe tener un input con name "released" y type "date"', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('input')[2]
        expect(element.type).toBe('date');
        expect(element.name).toBe('released');
    });
    
    it('El form debe tener un input con name "background_image" y type "text"', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('input')[3]
        expect(element.type).toBe('text');
        expect(element.name).toBe('background_image');
    });

    it('El form debe tener un textarea con name "description"', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('textarea')[0]
        expect(element.name).toBe('description');
    });

    it('El form debe tener un select con name "platforms"', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('select')[0]
        expect(element.name).toBe('platforms');
    });

    it('El form debe tener un select con name "genres"', () => {
        const { container } = render(<VideogameCreate />)
        const element = container.querySelectorAll('select')[1]
        expect(element.name).toBe('genres');
    });
  
    /* MANEJO DE ERRORES */
    /* it('El input de username tiene que tener la clase danger si tiene un error',  () => {
        wrapper.find('input[name="username"]').simulate('change', {target: {name: 'username', value: 'My new value'}});
        const ele = wrapper.find('input[name="username"]');
        expect(ele.hasClass('danger')).toBeTruthy();
     });
    it('El input de username NO tiene que tener la clase danger si tiene un usuario correcto',  () => {
        wrapper.find('input[name="username"]').simulate('change', {target: {name: 'username', value: 'toni@soyhenry.com'}});
        const ele = wrapper.find('input[name="username"]');
  
        expect(ele.hasClass('danger')).toBeFalsy();
      });
    it('El input de password tiene que tener la clase danger si tiene un error',  () => {
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'My new value'}});
        const ele = wrapper.find('input[name="username"]');
        expect(ele.hasClass('danger')).toBeTruthy();
      });
    it('El input de password NO tiene que tener la clase danger si tiene un password correcto',  () => {
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'hola123'}});
        const ele = wrapper.find('input[name="password"]');
        expect(ele.hasClass('danger')).toBeFalsy();
      }); */
  });
  