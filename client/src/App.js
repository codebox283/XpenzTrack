import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
