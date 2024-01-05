import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // 

const Menu = () => {
  return (
    <div className='section-menu'>
      <h2>Menu</h2>
      <ul className="menu-list">
        <li>
          <Link to="/artificial-intelligence">Inteligência Artificial</Link>
        </li>
        <li>
          <Link to="/machine-learning">Aprendizado de Máquinas</Link>
        </li>
        <li>
          <Link to="/neural-network">Redes Neurais</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;