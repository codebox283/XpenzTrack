import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/register" element={<RegisterPage />} /> */}
                <Route path="/login" element={<Login />} />
                {/* <Route path="/home" element={<Homepage />} />
                <Route path="/resume-parser" element={<ResumeParser />} /> */}
            </Routes>
        </div>
    </Router>
  );
}

export default App;
