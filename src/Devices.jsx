import { useState } from 'react'
import './Devices.css'

function Devices() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showSpecs, setShowSpecs] = useState(false);

  const devices = [
    {
      id: 'pixel9pro',
      name: 'Pixel 9 Pro',
      model: 'pixel_9_pro',
      price: '$1299',
      status: 'NEW',
      available: true,
      specs: {
        screen: '6.3" LTPO OLED',
        processor: 'Google Tensor G4',
        ram: '16GB',
        storage: '256GB / 512GB / 1TB',
        camera: '50MP Triple Camera',
        battery: '4700 mAh',
        security: 'Titan M2 Security Chip'
      },
      features: [
        'Latest Tensor G4 chip',
        'Enhanced AI features disabled by default',
        'Premium build quality',
        'Best camera system'
      ]
    },
    {
      id: 'pixel9',
      name: 'Pixel 9',
      model: 'pixel_9',
      price: '$899',
      status: 'NEW',
      available: true,
      specs: {
        screen: '6.3" OLED',
        processor: 'Google Tensor G4',
        ram: '12GB',
        storage: '128GB / 256GB',
        camera: '50MP Dual Camera',
        battery: '4700 mAh',
        security: 'Titan M2 Security Chip'
      },
      features: [
        'Latest Tensor G4 chip',
        'Excellent value',
        'Compact design',
        'All-day battery'
      ]
    },
    {
      id: 'pixel8a',
      name: 'Pixel 8a',
      model: 'pixel_8a',
      price: '$549',
      status: 'POPULAR',
      available: true,
      specs: {
        screen: '6.1" OLED',
        processor: 'Google Tensor G3',
        ram: '8GB',
        storage: '128GB / 256GB',
        camera: '64MP Dual Camera',
        battery: '4492 mAh',
        security: 'Titan M2 Security Chip'
      },
      features: [
        'Best budget option',
        'Same security features',
        'Tensor G3 performance',
        'Incredible value'
      ]
    },
    {
      id: 'pixel8pro',
      name: 'Pixel 8 Pro',
      model: 'pixel_8_pro',
      price: '$999',
      status: null,
      available: true,
      specs: {
        screen: '6.7" LTPO OLED',
        processor: 'Google Tensor G3',
        ram: '12GB',
        storage: '128GB / 256GB / 512GB',
        camera: '50MP Triple Camera',
        battery: '5050 mAh',
        security: 'Titan M2 Security Chip'
      },
      features: [
        'Large display',
        'Pro camera features',
        'Temperature sensor',
        'Premium materials'
      ]
    },
    {
      id: 'pixel8',
      name: 'Pixel 8',
      model: 'pixel_8',
      price: '$699',
      status: null,
      available: true,
      specs: {
        screen: '6.2" OLED',
        processor: 'Google Tensor G3',
        ram: '8GB',
        storage: '128GB / 256GB',
        camera: '50MP Dual Camera',
        battery: '4575 mAh',
        security: 'Titan M2 Security Chip'
      },
      features: [
        'Compact flagship',
        'Tensor G3 chip',
        'Excellent cameras',
        'Smooth performance'
      ]
    },
    {
      id: 'pixel7a',
      name: 'Pixel 7a',
      model: 'pixel_7a',
      price: '$449',
      status: 'LIMITED',
      available: true,
      specs: {
        screen: '6.1" OLED',
        processor: 'Google Tensor G2',
        ram: '8GB',
        storage: '128GB',
        camera: '64MP Dual Camera',
        battery: '4385 mAh',
        security: 'Titan M2 Security Chip'
      },
      features: [
        'Most affordable',
        'Proven reliability',
        'Tensor G2 chip',
        'Great starter device'
      ]
    }
  ];

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    setShowSpecs(false);
  };

  const handleShowSpecs = () => {
    setShowSpecs(!showSpecs);
  };

  return (
    <div className="devices-container">
      <div className="devices-header">
        <div className="terminal-prompt">
          <span className="prompt">$ </span>
          <span className="command">ls -la /devices/available/ --show-all</span>
        </div>
        <div className="loading-text">
          Scanning available devices... [OK]
        </div>
      </div>

      <div className="devices-grid">
        <div className="devices-list">
          <div className="section-title">
            <span className="prompt">$ </span>
            SELECT DEVICE:
          </div>
          
          <div className="device-cards">
            {devices.map(device => (
              <div 
                key={device.id} 
                className={`device-card ${selectedDevice?.id === device.id ? 'selected' : ''}`}
                onClick={() => handleDeviceSelect(device)}
              >
                <div className="device-header">
                  <span className="device-name">{device.name}</span>
                  {device.status && (
                    <span className={`device-status ${device.status.toLowerCase()}`}>
                      {device.status}
                    </span>
                  )}
                </div>
                <div className="device-info">
                  <div className="device-line">
                    <span className="label">Model:</span> {device.model}
                  </div>
                  <div className="device-line">
                    <span className="label">Price:</span> <span className="price">{device.price}</span>
                  </div>
                  <div className="device-line">
                    <span className="label">Status:</span> 
                    <span className="availability">
                      {device.available ? '[AVAILABLE]' : '[OUT OF STOCK]'}
                    </span>
                  </div>
                </div>
                <div className="device-features">
                  {device.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <span className="feature-marker">></span> {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedDevice && (
          <div className="device-details">
            <div className="section-title">
              <span className="prompt">$ </span>
              cat /devices/{selectedDevice.model}/info.txt
            </div>
            
            <div className="details-content">
              <div className="ascii-device">
                <pre>{`
     ┌─────────────┐
     │ ░░░░░░░░░░░ │
     │ ░ cNadaOS ░ │
     │ ░░░░░░░░░░░ │
     │             │
     │   ${selectedDevice.name.padEnd(9, ' ')}  │
     │             │
     │ ▓▓▓▓▓▓▓▓▓▓▓ │
     │ ▓▓▓▓▓▓▓▓▓▓▓ │
     │ ▓▓▓▓▓▓▓▓▓▓▓ │
     │             │
     └─────────────┘
          [●●●]
                `}</pre>
              </div>

              <div className="specs-section">
                <button 
                  className="terminal-button specs-button"
                  onClick={handleShowSpecs}
                >
                  <span className="button-text">
                    {showSpecs ? '[-]' : '[+]'} VIEW SPECIFICATIONS
                  </span>
                </button>

                {showSpecs && (
                  <div className="specs-list">
                    {Object.entries(selectedDevice.specs).map(([key, value]) => (
                      <div key={key} className="spec-line">
                        <span className="spec-key">{key}:</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="price-section">
                  <div className="price-display">
                    <span className="price-label">PRICE:</span>
                    <span className="price-value">{selectedDevice.price}</span>
                  </div>
                  <div className="price-note">
                    * Includes cNadaOS pre-installed
                    <br />
                    * Lifetime security updates
                    <br />
                    * No Google services by default
                  </div>
                </div>

                <div className="cta-buttons">
                  <button className="terminal-button order-button">
                    <span className="button-text">> ORDER NOW</span>
                  </button>
                  <button className="terminal-button info-button">
                    <span className="button-text">> MORE INFO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="devices-footer">
        <div className="terminal-line">
          <span className="prompt">$ </span>
          <span className="blink">_</span>
        </div>
      </div>
    </div>
  )
}

export default Devices