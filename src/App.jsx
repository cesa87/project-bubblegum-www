import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Devices from './Devices'
import './App.css'

function App() {

  return (
    <Router>
      <div className="terminal">
        <nav className="terminal-nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <span className="nav-prompt">$</span> cNada
            </Link>
            <ul className="nav-menu">
              <li>
                <Link to="/" className="nav-item">
                  <span className="nav-prefix">./</span>home
                </Link>
              </li>
              <li>
                <Link to="/devices" className="nav-item">
                  <span className="nav-prefix">./</span>devices
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-prefix">./</span>about
              </li>
              <li className="nav-item">
                <span className="nav-prefix">./</span>security
              </li>
              <li className="nav-item">
                <span className="nav-prefix">./</span>docs
              </li>
              <li className="nav-item">
                <span className="nav-prefix">./</span>contact
              </li>
            </ul>
            <div className="nav-status">
              <span className="status-dot"></span>
              <span className="status-text">SECURE</span>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
