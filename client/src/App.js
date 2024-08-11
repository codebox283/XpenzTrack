import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal'; // Import Modal
import Home from './pages/Home.js';
import Contact from './pages/Contact';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Account from './pages/Account.js';
import Expenses from './pages/Expenses.js';
import Goals from './pages/Goals.js';
import Dashboard from './pages/Dashboard.js';
import TrackMoney from './pages/TrackMoney.js';
import SaveMoney from './pages/SaveMoney.js';
import Team from './pages/Team.js';


Modal.setAppElement('#root');

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/trackExpense' element={<TrackMoney />} />
                <Route path='/trackGoal' element={<SaveMoney />} />
                <Route path='/team' element={<Team />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses/>} />
                <Route path='/goals' element={<Goals />} />
                <Route path='/account' element={<Account/>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
