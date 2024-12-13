import React from 'react';
import '../css/NavBar.css'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Minha Loja</h1>
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/protected" className="nav-link">Rota Protegida</a>
        </li>
        <li className="nav-item">
          <a href="#sobre" className="nav-link">Sobre</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
