import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

// Landing Page Component
function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <div className="landing-container">
        <div className="geometric-shape" onClick={() => navigate('/login', { replace: true })}>
          <svg viewBox="-120 -120 240 240" className="dodecahedron">
            <g className="dodecahedron-group">
              <polygon points="0,-100 95,-31 59,81 -59,81 -95,-31" fill="none" stroke="rgba(245,245,220,0.9)" strokeWidth="2" />
              <polygon points="0,100 76,25 47,-65 -47,-65 -76,25" fill="none" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
              <line x1="0" y1="-100" x2="0" y2="100" stroke="rgba(245,245,220,0.8)" strokeWidth="2" />
              <line x1="95" y1="-31" x2="76" y2="25" stroke="rgba(245,245,220,0.8)" strokeWidth="2" />
              <line x1="-95" y1="-31" x2="-76" y2="25" stroke="rgba(245,245,220,0.8)" strokeWidth="2" />
              <line x1="59" y1="81" x2="47" y2="-65" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
              <line x1="-59" y1="81" x2="-47" y2="-65" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
              <line x1="0" y1="-100" x2="47" y2="-65" stroke="rgba(245,245,220,0.7)" strokeWidth="1.5" />
              <line x1="0" y1="-100" x2="-47" y2="-65" stroke="rgba(245,245,220,0.7)" strokeWidth="1.5" />
              <line x1="95" y1="-31" x2="47" y2="-65" stroke="rgba(245,245,220,0.7)" strokeWidth="1.5" />
              <line x1="-95" y1="-31" x2="-47" y2="-65" stroke="rgba(245,245,220,0.7)" strokeWidth="1.5" />
              <line x1="59" y1="81" x2="76" y2="25" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
              <line x1="-59" y1="81" x2="-76" y2="25" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Login Page Component
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'R0m3' && password === 'BlueSuitTie') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/app', { replace: true }); // Use replace to prevent back to login
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLoginKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-box">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleLoginKeyPress}
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleLoginKeyPress}
            />
            {loginError && <div className="login-error">{loginError}</div>}
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

// Main App Component
function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [imdbInput, setImdbInput] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [contentType, setContentType] = useState('tv');
  const [season, setSeason] = useState('1');
  const [episode, setEpisode] = useState('1');
  const [showPlayer, setShowPlayer] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const [useQueryFormat, setUseQueryFormat] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  
  // Restore state from location if available
  useEffect(() => {
    if (location.state) {
      if (location.state.imdbId) setImdbId(location.state.imdbId);
      if (location.state.contentType) setContentType(location.state.contentType);
      if (location.state.season) setSeason(location.state.season);
      if (location.state.episode) setEpisode(location.state.episode);
      if (location.state.showPlayer !== undefined) setShowPlayer(location.state.showPlayer);
    }
  }, [location.state]);

  const extractImdbId = (input) => {
    // Extract tt ID from URL or use direct input
    const match = input.match(/tt\d+/);
    return match ? match[0] : '';
  };

  const handleSearch = () => {
    // If imdbId is already set (from search results), use it
    if (imdbId) {
      setShowPlayer(true);
      // Save to history state
      navigate('/app', {
        state: { imdbId, contentType, season, episode, showPlayer: true },
        replace: false
      });
    } else {
      // Otherwise extract from manual input
      const id = extractImdbId(imdbInput);
      if (id) {
        setImdbId(id);
        setShowPlayer(true);
        navigate('/app', {
          state: { imdbId: id, contentType, season, episode, showPlayer: true },
          replace: false
        });
      } else {
        alert('Please enter a valid IMDB URL or ID (e.g., tt4569062)');
      }
    }
  };

  const getPlayerUrl = () => {
    if (contentType === 'movie') {
      return `https://vidsrc-embed.ru/embed/movie/${imdbId}`;
    } else {
      const autoNextParam = autoNext ? '&autonext=1' : '';
      
      if (useQueryFormat) {
        // Query parameter format
        return `https://vidsrc-embed.ru/embed/tv?imdb=${imdbId}&season=${season}&episode=${episode}&autoplay=1${autoNextParam}`;
      } else {
        // Path format
        return `https://vidsrc-embed.ru/embed/tv/${imdbId}/${season}-${episode}?autoplay=1${autoNextParam}`;
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const searchIMDB = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      // Using OMDb API - Free tier: 1000 requests/day
      // Get your own key at: http://www.omdbapi.com/apikey.aspx
      const apiKey = 'trilogy'; // Demo key (limited), replace with your own
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=${apiKey}`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setSearchResults(data.Search || []);
      } else {
        setSearchResults([]);
        alert('No results found. Try a different search term.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    }
    setSearching(false);
  };

  const selectContent = (item) => {
    const newImdbId = item.imdbID;
    const newContentType = item.Type === 'movie' ? 'movie' : 'tv';
    setImdbId(newImdbId);
    setContentType(newContentType);
    setSearchResults([]);
    setSearchQuery('');
    
    if (item.Type === 'movie') {
      // Auto-play movies
      setShowPlayer(true);
      navigate('/app', {
        state: { imdbId: newImdbId, contentType: newContentType, showPlayer: true },
        replace: false
      });
    }
    // For TV series, let user select season/episode
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchIMDB();
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/', { replace: true });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="app-header">
          <div className="header-shape">
            <svg viewBox="-120 -120 240 240" className="dodecahedron-small">
              <g className="dodecahedron-group">
                <polygon points="0,-100 95,-31 59,81 -59,81 -95,-31" fill="none" stroke="rgba(245,245,220,0.9)" strokeWidth="2" />
                <polygon points="0,100 76,25 47,-65 -47,-65 -76,25" fill="none" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="0" y1="-100" x2="0" y2="100" stroke="rgba(245,245,220,0.8)" strokeWidth="2" />
                <line x1="95" y1="-31" x2="76" y2="25" stroke="rgba(245,245,220,0.8)" strokeWidth="2" />
                <line x1="-95" y1="-31" x2="-76" y2="25" stroke="rgba(245,245,220,0.8)" strokeWidth="2" />
                <line x1="59" y1="81" x2="47" y2="-65" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="-59" y1="81" x2="-47" y2="-65" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="0" y1="-100" x2="47" y2="-65" stroke="rgba(245,245,220,0.7)" strokeWidth="1.5" />
                <line x1="0" y1="-100" x2="-47" y2="-65" stroke="rgba(245,245,220,0.7)" strokeWidth="1.5" />
                <line x1="95" y1="-31" x2="47" y2="-65" stroke="rgba(245,245,220,0.7)" strokeWidth="1.5" />
                <line x1="-95" y1="-31" x2="-47" y2="-65" stroke="rgba(245,245,220,0.7)" strokeWidth="1.5" />
                <line x1="59" y1="81" x2="76" y2="25" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="-59" y1="81" x2="-76" y2="25" stroke="rgba(245,245,220,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
              </g>
            </svg>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        
        {!showPlayer ? (
          <div className="search-container">
            {!imdbId ? (
              <>
                <div className="search-mode-toggle">
                  <button
                    className={!showManualInput ? 'active' : ''}
                    onClick={() => setShowManualInput(false)}
                  >
                    Search IMDB
                  </button>
                  <button
                    className={showManualInput ? 'active' : ''}
                    onClick={() => setShowManualInput(true)}
                  >
                    Manual ID Entry
                  </button>
                </div>

                {!showManualInput ? (
                  <>
                    <div className="search-input-group">
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search for movies or TV shows..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                      />
                      <button 
                        className="search-button" 
                        onClick={searchIMDB}
                        disabled={searching}
                      >
                        {searching ? (
                          <div className="loader"></div>
                        ) : (
                          '🔍'
                        )}
                      </button>
                    </div>

                    {searching && (
                      <div className="loading-message">
                        <div className="loading-spinner"></div>
                        <span>Searching...</span>
                      </div>
                    )}

                    {searchResults.length > 0 && (
                      <div className="search-results">
                        {searchResults.map((item) => (
                          <div 
                            key={item.imdbID} 
                            className="result-item"
                            onClick={() => selectContent(item)}
                          >
                            <img 
                              src={item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/50x75?text=No+Image'} 
                              alt={item.Title}
                              className="result-poster"
                            />
                            <div className="result-info">
                              <div className="result-title">{item.Title}</div>
                              <div className="result-meta">
                                {item.Year} • {item.Type === 'movie' ? 'Movie' : 'TV Series'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Paste IMDB URL or ID (e.g., tt4569062)"
                    value={imdbInput}
                    onChange={(e) => setImdbInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                )}
              </>
            ) : (
              <div className="selected-content">
                <div className="selected-badge">Selected: {imdbId}</div>
                <button 
                  className="change-button"
                  onClick={() => {
                    setImdbId('');
                    setSearchResults([]);
                  }}
                >
                  Change Content
                </button>
              </div>
            )}
            
            {imdbId && (
            <div className="content-type-selector">
              <button
                className={contentType === 'movie' ? 'active' : ''}
                onClick={() => setContentType('movie')}
              >
                Movie
              </button>
              <button
                className={contentType === 'tv' ? 'active' : ''}
                onClick={() => setContentType('tv')}
              >
                TV Series
              </button>
            </div>
            )}

            {imdbId && contentType === 'tv' && (
              <div className="episode-selector">
                <div className="selector-group">
                  <label>Season</label>
                  <input
                    type="number"
                    min="1"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                  />
                </div>
                <div className="selector-group">
                  <label>Episode</label>
                  <input
                    type="number"
                    min="1"
                    value={episode}
                    onChange={(e) => setEpisode(e.target.value)}
                  />
                </div>
              </div>
            )}

            {contentType === 'tv' && (
              <>
                <div className="auto-next-toggle">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={autoNext}
                      onChange={(e) => setAutoNext(e.target.checked)}
                    />
                    <span>Auto-play next episode</span>
                  </label>
                </div>
              </>
            )}

            {imdbId && (
            <button className="play-button" onClick={handleSearch}>
              ▶ Play
            </button>
            )}
          </div>
        ) : (
          <div className="player-container">
            <div className="player-header">
              <div className="player-info">
                <span className="imdb-badge">IMDB: {imdbId}</span>
                {contentType === 'tv' && (
                  <span className="episode-badge">S{season} E{episode}</span>
                )}
              </div>
              <button className="back-button" onClick={() => {
                setShowPlayer(false);
                navigate('/app', {
                  state: { imdbId, contentType, season, episode, showPlayer: false },
                  replace: false
                });
              }}>
                ← Back to Search
              </button>
            </div>

            {contentType === 'tv' && (
              <div className="episode-controls">
                <button 
                  className="nav-button"
                  onClick={() => setEpisode(Math.max(1, parseInt(episode) - 1).toString())}
                  disabled={parseInt(episode) <= 1}
                >
                  ← Previous Episode
                </button>
                <div className="episode-info">
                  Season {season} - Episode {episode}
                </div>
                <button 
                  className="nav-button"
                  onClick={() => setEpisode((parseInt(episode) + 1).toString())}
                >
                  Next Episode →
                </button>
              </div>
            )}

            <iframe
              key={getPlayerUrl()}
              src={getPlayerUrl()}
              className="video-player"
              frameBorder="0"
              referrerPolicy="origin"
              allowFullScreen
              title="Video Player"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Router wrapper
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
