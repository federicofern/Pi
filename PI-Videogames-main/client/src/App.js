import './App.css';
import LandingPage from './components/Landing/index.jsx'
import Home from './components/Home/index'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
  <div className="App">
    <Routes>
      
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
      
   </Routes>
  </div>
  );
}

export default App;
