import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Homepage from './components/homepage';
import MovieDetails from './components/movieDetails.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/searchdetails/:showtype/:id' element={<MovieDetails/>}/>
    </Routes>
    </BrowserRouter>
  );

}



export default App;
