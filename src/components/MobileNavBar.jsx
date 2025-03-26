import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bouton d'ouverture du menu mobile */}
      <div
        className={`mobile-icon ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="screen-reader-text">Menu</span>
        <span aria-hidden="true">
          <i className="lines-button x2">
            <i className="lines"></i>
          </i>
        </span>
      </div>

      {/* Menu coulissant mobile */}
      <nav
        className={`mobile-nav ${menuOpen ? 'open' : ''}`}
        aria-label="Main Menu"
      >
        <ul className="sf-menu">
          <li className="menu-item">
            <Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
          </li>
          <li className="menu-item">
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          </li>
          <li className="menu-item">
            <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          </li>
          <li className="menu-item">
            <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          </li>
          <li className="menu-item">
            <Link to="/materiel" onClick={() => setMenuOpen(false)}>Matériel vidéo</Link>
          </li>
          <li className="menu-item">
            <Link to="/about" onClick={() => setMenuOpen(false)}>À propos</Link>
          </li>
          <li className="menu-item">
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li className="menu-item button_solid_color">
            <Link to="/devis" onClick={() => setMenuOpen(false)}>Obtenir un devis ➜</Link>
          </li>
        </ul>
      </nav>

      {/* Styles CSS */}
      <style jsx>{`
        .mobile-icon {
          display: block;
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
        }

        .mobile-nav {
          position: fixed;
          top: 0;
          right: -250px; /* Position initiale du menu (caché) */
          width: 250px;
          height: 100vh;
          background-color: #333;
          transition: right 0.3s ease;
          z-index: 999;
        }

        /* Menu ouvert */
        .mobile-nav.open {
          right: 0; /* Affiche le menu */
        }

        .sf-menu {
          list-style: none;
          padding: 20px;
        }

        .menu-item {
          margin: 20px 0;
        }

        .menu-item a {
          color: white;
          text-decoration: none;
          font-size: 18px;
        }

        .menu-item a:hover {
          font-weight: bold;
        }

        .button_solid_color a {
          font-weight: bold;
          color: #4f46e5;
        }

        /* Ajout de styles pour le hamburger icon */
        .lines-button {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 25px;
          height: 20px;
        }

        .lines {
          background-color: #fff;
          height: 3px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default MobileNavBar;
