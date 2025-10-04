import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Privacy() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('freedom');
  const [typingText, setTypingText] = useState('');
  const fullText = 'YOUR DEVICE. YOUR RULES. NO COMPROMISE.';
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const sections = {
    freedom: {
      title: 'DIGITAL FREEDOM',
      icon: '🔓',
      points: [
        'No forced biometric enrollment',
        'No digital ID requirements',
        'No remote attestation',
        'No mandatory app signatures',
        'No kill switches',
        'Full root access available'
      ]
    },
    privacy: {
      title: 'TRUE PRIVACY',
      icon: '🛡️',
      points: [
        'No Google Services tracking',
        'No advertising identifiers',
        'MAC address randomization',
        'No persistent device fingerprints',
        'No telemetry or analytics',
        'No location tracking by default'
      ]
    },
    control: {
      title: 'USER CONTROL',
      icon: '⚙️',
      points: [
        'Hardware sensor toggles',
        'Network permission per-app',
        'Mic/Camera hardware switches',
        'Contact & storage scopes',
        'Firewall all connections',
        'Airplane mode that actually works'
      ]
    },
    resistance: {
      title: 'SURVEILLANCE RESISTANCE',
      icon: '✊',
      points: [
        'No face scanning databases',
        'No voice print collection',
        'No behavioral profiling',
        'No predictive algorithms',
        'No social credit integration',
        'No government backdoors'
      ]
    }
  };

  return (
    <div className="privacy-container">
      <div className="terminal-header">
        <span className="terminal-title">root@cNada:~/privacy#</span>
      </div>

      <div className="terminal-body">
        {/* ASCII Header */}
        <div className="ascii-header">
          <pre>{`
╔══════════════════════════════════════════════════════════════════╗
║  ██████╗ ██████╗ ██╗██╗   ██╗ █████╗  ██████╗██╗   ██╗         ║
║  ██╔══██╗██╔══██╗██║██║   ██║██╔══██╗██╔════╝╚██╗ ██╔╝         ║
║  ██████╔╝██████╔╝██║██║   ██║███████║██║      ╚████╔╝          ║
║  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔══██║██║       ╚██╔╝           ║
║  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██║╚██████╗   ██║            ║
║  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝   ╚═╝            ║
╚══════════════════════════════════════════════════════════════════╝
          `}</pre>
        </div>

        {/* Typing Effect */}
        <div className="typing-header">
          <span className="prompt">$ </span>
          <span className="typed-text">{typingText}</span>
          <span className="cursor-blink">_</span>
        </div>

        {/* Warning Message */}
        <div className="warning-box">
          <div className="warning-header">
            [!] SURVEILLANCE STATE ALERT [!]
          </div>
          <div className="warning-content">
            <p>Digital authoritarianism is expanding globally.</p>
            <p>Biometric databases. Social credit scores. Device attestation.</p>
            <p>Mandatory digital IDs. Location tracking. Behavioral analysis.</p>
            <p className="highlight-text">cNada devices are designed to resist.</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="privacy-tabs">
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              className={`tab-button ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              <span className="tab-icon">{sections[key].icon}</span>
              <span className="tab-text">{sections[key].title}</span>
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="section-content">
          <div className="section-header">
            <span className="prompt">$ </span>
            <span className="command">cat /etc/cnada/{activeSection}.conf</span>
          </div>
          
          <div className="feature-grid">
            {sections[activeSection].points.map((point, idx) => (
              <div key={idx} className="feature-item">
                <span className="feature-indicator">[✓]</span>
                <span className="feature-text">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="tech-section">
          <div className="section-header">
            <span className="prompt">$ </span>
            <span className="command">./show_technical_measures.sh</span>
          </div>
          
          <div className="tech-grid">
            <div className="tech-block">
              <h3>[HARDWARE LEVEL]</h3>
              <ul>
                <li>▸ Verified boot with custom keys</li>
                <li>▸ Hardware kill switches (optional)</li>
                <li>▸ Titan M2 security chip</li>
                <li>▸ Encrypted storage by default</li>
              </ul>
            </div>
            
            <div className="tech-block">
              <h3>[SOFTWARE LEVEL]</h3>
              <ul>
                <li>▸ GrapheneOS/CalyxOS based</li>
                <li>▸ No proprietary blobs</li>
                <li>▸ F-Droid as primary store</li>
                <li>▸ Sandboxed apps only</li>
              </ul>
            </div>
            
            <div className="tech-block">
              <h3>[NETWORK LEVEL]</h3>
              <ul>
                <li>▸ Tor integration available</li>
                <li>▸ VPN always-on support</li>
                <li>▸ DNS over HTTPS</li>
                <li>▸ No carrier bloatware</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="comparison-section">
          <div className="section-header">
            <span className="prompt">$ </span>
            <span className="command">diff standard_android cnada_os</span>
          </div>
          
          <table className="comparison-table">
            <thead>
              <tr>
                <th>FEATURE</th>
                <th className="standard">STANDARD ANDROID</th>
                <th className="cnada">cNADA OS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Services</td>
                <td className="bad">✗ MANDATORY</td>
                <td className="good">✓ REMOVED</td>
              </tr>
              <tr>
                <td>Location Tracking</td>
                <td className="bad">✗ ALWAYS ON</td>
                <td className="good">✓ OPT-IN ONLY</td>
              </tr>
              <tr>
                <td>Advertising ID</td>
                <td className="bad">✗ ENABLED</td>
                <td className="good">✓ NONE</td>
              </tr>
              <tr>
                <td>Telemetry</td>
                <td className="bad">✗ CONSTANT</td>
                <td className="good">✓ DISABLED</td>
              </tr>
              <tr>
                <td>App Permissions</td>
                <td className="bad">✗ BROAD</td>
                <td className="good">✓ GRANULAR</td>
              </tr>
              <tr>
                <td>Updates</td>
                <td className="bad">✗ FORCED</td>
                <td className="good">✓ OPTIONAL</td>
              </tr>
              <tr>
                <td>Root Access</td>
                <td className="bad">✗ BLOCKED</td>
                <td className="good">✓ AVAILABLE</td>
              </tr>
              <tr>
                <td>Bootloader</td>
                <td className="bad">✗ LOCKED</td>
                <td className="good">✓ UNLOCKABLE</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Use Cases */}
        <div className="use-cases">
          <div className="section-header">
            <span className="prompt">$ </span>
            <span className="command">ls /use_cases/</span>
          </div>
          
          <div className="use-case-grid">
            <div className="use-case">
              <h4>[JOURNALISTS]</h4>
              <p>Protect sources. Avoid surveillance. Communicate securely.</p>
            </div>
            <div className="use-case">
              <h4>[ACTIVISTS]</h4>
              <p>Organize safely. Resist tracking. Maintain anonymity.</p>
            </div>
            <div className="use-case">
              <h4>[BUSINESSES]</h4>
              <p>Protect trade secrets. Prevent espionage. Secure communications.</p>
            </div>
            <div className="use-case">
              <h4>[CITIZENS]</h4>
              <p>Preserve privacy. Resist profiling. Own your data.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="resistance-message">
            <pre>{`
┌─────────────────────────────────────────────────────────┐
│  "Privacy is not about hiding.                         │
│   It's about protecting what makes us human:          │
│   Our thoughts, beliefs, and right to exist           │
│   without constant observation."                      │
│                                                        │
│   Join the resistance. Choose cNada.                  │
└─────────────────────────────────────────────────────────┘
            `}</pre>
          </div>
          
          <div className="cta-buttons">
            <button 
              className="terminal-button primary"
              onClick={() => navigate('/devices')}
            >
              <span className="button-text">{'>'} GET YOUR DEVICE</span>
            </button>
            <button className="terminal-button">
              <span className="button-text">{'>'} LEARN MORE</span>
            </button>
            <button className="terminal-button">
              <span className="button-text">{'>'} JOIN COMMUNITY</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="privacy-footer">
          <div className="command-line">
            <span className="prompt">$ </span>
            <span className="text">echo "Take back control. One device at a time."</span>
          </div>
          <div className="output">Take back control. One device at a time.</div>
          <div className="command-line">
            <span className="prompt">$ </span>
            <span className="blink">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy