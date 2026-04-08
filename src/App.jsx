import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/oral' element={<div>Oral Page</div>} />
        <Route path='/written' element={<div>Written Page</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;