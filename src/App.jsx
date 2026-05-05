import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home'; 
import WrittenCompetition from './pages/WrittenCompetition';
import WrittenTeamDetails from './pages/WrittenTeamDetails';
import OralCompetition from './pages/OralCompetition';
import Preliminaries from './pages/Preliminaries';
import Semifinals from './pages/Semifinals';
import PreliminaryMatchDetails from './pages/PreliminaryMatchDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/oral' element={<OralCompetition />} />
        <Route path='/oral/preliminaries' element={<Preliminaries />} />
        <Route path='/oral/preliminaries/match/:matchID' element={<PreliminaryMatchDetails />} /> 
        <Route path='/oral/semifinals' element={<Semifinals />} />
        <Route path='/written' element={<WrittenCompetition />} />
        <Route path='written/team/:teamID' element={<WrittenTeamDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;