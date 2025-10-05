import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'SECURE YOUR DIGITAL IDENTITY';

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      <div className="terminal-header">
        <span className="terminal-title">root@cNada:~#</span>
      </div>
      
      <div className="terminal-body">
        <div className="ascii-art">
          <pre>{`
 ██████╗███╗   ██╗ █████╗ ██████╗  █████╗ 
██╔════╝████╗  ██║██╔══██╗██╔══██╗██╔══██╗
██║     ██╔██╗ ██║███████║██║  ██║███████║
██║     ██║╚██╗██║██╔══██║██║  ██║██╔══██║
╚██████╗██║ ╚████║██║  ██║██████╔╝██║  ██║
 ╚═════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝
          `}</pre>
        </div>

        <div className="typing-text">
          <span className="prompt">$ </span>
          <span className="typed">{typedText}</span>
          <span className={`cursor ${showCursor ? 'visible' : ''}`}>█</span>
        </div>

        <div className="content">
          <div className="content-grid">
            <div className="main-content">
              <div className="section mission-section">
                <h2 className="retro-title">Our Mission</h2>
                <div className="mission-card">
                  <p className="mission-text">
                    Premium Pixel phones with enhanced privacy.<br/>
                    No tracking. No spying. Just pure freedom.
                  </p>
                </div>
              </div>

              <div className="section devices-showcase">
                <h2 className="retro-title">Available Devices</h2>
                <div className="device-grid">
                  <div className="device-card">
                    <span className="badge new">NEW</span>
                    <h3>Pixel 9 Pro XL</h3>
                    <p>Ultimate flagship</p>
                  </div>
                  <div className="device-card">
                    <span className="badge new">NEW</span>
                    <h3>Pixel 9 Pro</h3>
                    <p>Pro performance</p>
                  </div>
                  <div className="device-card">
                    <span className="badge new">NEW</span>
                    <h3>Pixel 9</h3>
                    <p>Perfect balance</p>
                  </div>
                  <div className="device-card">
                    <h3>Pixel 8 Pro</h3>
                    <p>Proven power</p>
                  </div>
                  <div className="device-card">
                    <h3>Pixel 8</h3>
                    <p>Solid choice</p>
                  </div>
                  <div className="device-card">
                    <h3>Pixel 7a</h3>
                    <p>Budget friendly</p>
                  </div>
                </div>
              </div>

              <div className="section features-section">
                <h2 className="retro-title">Why Choose cNada?</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <span className="feature-icon">🛡️</span>
                    <h3>No Tracking</h3>
                    <p>Complete privacy protection</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">🔒</span>
                    <h3>Secure</h3>
                    <p>Military-grade encryption</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">⚡</span>
                    <h3>Fast</h3>
                    <p>No bloatware slowing you down</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">🔄</span>
                    <h3>Updates</h3>
                    <p>Regular security patches</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">🎯</span>
                    <h3>Control</h3>
                    <p>You own your device</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">🚀</span>
                    <h3>Freedom</h3>
                    <p>Install anything you want</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="phone-visual">
              <div className="phone-frame">
                <div className="phone-screen-content">
                  <div className="phone-display">
                    <h3 className="phone-title">cNada OS</h3>
                    <div className="phone-features">
                      <div className="phone-feature">✓ Privacy First</div>
                      <div className="phone-feature">✓ No Tracking</div>
                      <div className="phone-feature">✓ Your Data</div>
                      <div className="phone-feature">✓ Your Rules</div>
                    </div>
                    <div className="phone-status-bar">
                      <span className="status-badge">SECURE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <button 
              className="terminal-button primary"
              onClick={() => navigate('/devices')}
            >
              <span className="button-text">VIEW DEVICES</span>
            </button>
            <button className="terminal-button">
              <span className="button-text">LEARN MORE</span>
            </button>
          </div>

          <div className="footer">
            <div className="command-line">
              <span className="prompt">$ </span>
              <span className="command blink">_</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home