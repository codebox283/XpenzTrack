import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal'; // Import Modal
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
// import Dashboard from './pages/Dashboard.js';
import Expenses from './pages/Expenses.js';
import Goals from './pages/Goals.js';


Modal.setAppElement('#root');

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/expenses" element={<Expenses/>} />
                <Route path='/goals' element={<Goals />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
