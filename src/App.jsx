import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home'; 
import WrittenCompetition from './pages/WrittenCompetition';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/oral' element={<div>Oral Page</div>} />
        <Route path='/written' element={<WrittenCompetition />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;