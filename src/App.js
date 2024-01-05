import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css';
import city from './images/city.jpg';
import Home from './components/Home';
import ArtificialIntelligence from './components/ArtificialIntelligence';
import MachineLearning from './components/MachineLearning';
import NeuralNetwork from './components/NeuralNetwork';
import Menu from './components/Menu';

function Main() {
  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  };

  const sectionStyle = {
    backgroundImage: `url(${city})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <div id='main' style={sectionStyle}>
      <div style={overlayStyle}></div>
      <div className='content'>
       <Home/>
      </div>
    </div>
  );
}

function App() {
  const [setCurrentSection] = useState('artificial-intelligence');

  return (
    <Router>
      <div className="App">
        <Main />
        <Menu onMenuClick={(section) => setCurrentSection(section)} />
        {/* Use o componente Routes para envolver as rotas */}
        <Routes>
          <Route
            path="/artificial-intelligence"
            element={<ArtificialIntelligence />}
          />
          <Route
            path="/machine-learning"
            element={<MachineLearning />}
          />
          <Route
            path="/neural-network"
            element={<NeuralNetwork />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;