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
              <div className="section">
                <div className="command-line">
                  <span className="prompt">$ </span>
                  <span className="command">cat /etc/mission.txt</span>
                </div>
                <p className="output">
                  We provide Pixel devices pre-installed with cNadaOS.<br/>
                  Maximum privacy. Zero compromise. Complete control.
                </p>
              </div>

              <div className="section">
                <div className="command-line">
                  <span className="prompt">$ </span>
                  <span className="command">ls -la /devices/available/</span>
                </div>
                <div className="output">
                  <div className="file-list">
                    <div className="file">drwxr-xr-x  pixel_9_pro_xl/     <span className="highlight">NEW</span></div>
                    <div className="file">drwxr-xr-x  pixel_9_pro/        <span className="highlight">NEW</span></div>
                    <div className="file">drwxr-xr-x  pixel_9/            <span className="highlight">NEW</span></div>
                    <div className="file">drwxr-xr-x  pixel_8_pro/</div>
                    <div className="file">drwxr-xr-x  pixel_8/</div>
                    <div className="file">drwxr-xr-x  pixel_7a/</div>
                  </div>
                </div>
              </div>

              <div className="section">
                <div className="command-line">
                  <span className="prompt">$ </span>
                  <span className="command">./why_cnada.sh</span>
                </div>
                <div className="output features">
                  <div className="feature">[✓] No Google Services tracking</div>
                  <div className="feature">[✓] Hardened security features</div>
                  <div className="feature">[✓] Network permission toggle</div>
                  <div className="feature">[✓] Sensors permission toggle</div>
                  <div className="feature">[✓] Contact scopes</div>
                  <div className="feature">[✓] Storage scopes</div>
                  <div className="feature">[✓] Sandboxed Google Play (optional)</div>
                  <div className="feature">[✓] Regular security updates</div>
                </div>
              </div>
            </div>

            <div className="phone-visual">
              <div className="phone-device">
                <div className="phone-screen">
                  <div className="phone-terminal">
                    <div className="terminal-line">root@cNada:~$</div>
                    <div className="terminal-line">./secure_device.sh</div>
                    <div className="terminal-line">[<span className="progress-bar">████████</span>] 100%</div>
                    <div className="terminal-line"> </div>
                    <div className="terminal-line green-glow">SYSTEM SECURED</div>
                    <div className="terminal-line"> </div>
                    <div className="terminal-line">▶ NO TRACKING</div>
                    <div className="terminal-line">▶ NO SPYWARE</div>
                    <div className="terminal-line">▶ YOUR PRIVACY</div>
                    <div className="terminal-line"> </div>
                    <div className="terminal-line blink">_</div>
                  </div>
                  <div className="phone-logo">cNada</div>
                </div>
                <div className="phone-button"></div>
              </div>
              <div className="phone-status">
                <span className="status-indicator">●</span>
                <span className="status-text">PIXEL DEVICE READY</span>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <button 
              className="terminal-button"
              onClick={() => navigate('/devices')}
            >
              <span className="button-text">{'>'} VIEW DEVICES</span>
            </button>
            <button className="terminal-button">
              <span className="button-text">{'>'} LEARN MORE</span>
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