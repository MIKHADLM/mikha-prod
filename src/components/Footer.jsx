import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>MIKHA</h1>
      </div>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Portfolio</Link>
        <Link to="/services" style={styles.link}>Services</Link>
        <Link to="/about" style={styles.link}>À propos</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </nav>

      <div style={styles.bottomSection}>
        <p style={styles.copyright}>© MIKHA - 2024</p>
        <p style={styles.builtBy}>Site co-construit par <span style={styles.highlight}>Liam Le Strat et Michael Philibert</span></p>
        <nav style={styles.legalNav}>
          <Link to="/legal" style={styles.legalLink}>Mentions légales</Link>
          <a href="https://instagram.com" target="_blank" rel="https://www.instagram.com/mikha_dlm/" style={styles.legalLink}>Instagram</a>
        </nav>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    textAlign: "center",
    padding: "40px 20px",
  },
  logoContainer: {
    marginBottom: "20px",
  },
  logo: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#f5e1a4",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  bottomSection: {
    borderTop: "1px solid #f5e1a4",
    paddingTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  copyright: {
    color: "#aaa",
  },
  builtBy: {
    color: "#aaa",
  },
  highlight: {
    color: "#f5e1a4",
    fontWeight: "bold",
  },
  legalNav: {
    display: "flex",
    gap: "15px",
  },
  legalLink: {
    color: "#f5e1a4",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Footer;
