import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/index.jsx'
import Home from './components/Home/index'
import NavBar from './components/Navbar/NavBar';
import VideogameCreate from './components/Created';
import Details from './components/GameDetails';

function App() {
  return (
  <div className="App">
    <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
    </Routes>
    <div>
        <NavBar/>
    <Routes>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/created' element={<VideogameCreate/>}/>
        <Route exact path='/videogame/:id' element={<Details/>}/>
   </Routes>
    </div>
  </div>
  );
}

export default App;
