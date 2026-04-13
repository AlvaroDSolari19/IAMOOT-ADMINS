import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home'; 
import WrittenCompetition from './pages/WrittenCompetition';
import WrittenTeamDetails from './pages/WrittenTeamDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/oral' element={<div>Oral Page</div>} />
        <Route path='/written' element={<WrittenCompetition />} />
        <Route path='written/team/:teamID' element={<WrittenTeamDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;