import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.leftSection}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>MIKHA</h1>
        </div>
       
        <div style={styles.navRow}>
          <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Portfolio</Link>
            <Link to="/services" style={styles.link}>Services</Link>
            <Link to="/about" style={styles.link}>À propos</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
          </nav>
          <div style={styles.socialLinks}>
            <a href="https://www.instagram.com/mikha_dlm/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>Instagram</a>
            <a href="https://www.youtube.com/@mikha_dlm" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>YouTube</a>
          </div>
        </div>
      </div>

      <div style={styles.bottomSection}>
        <p style={styles.copyright}>© MIKHA - 2025</p>
        <p style={styles.builtBy}>Site co-construit par <span style={styles.highlight}>Liam Le Strat et Michael Philibert</span></p>
        <nav style={styles.legalNav}>
          <Link to="/legal" style={styles.legalLink}>Mentions légales</Link>
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
  leftSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
  },
  logoContainer: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "flex-start",
  },
  logo: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#60a5fa",
  },

  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",
  },
  nav: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  socialLinks: {
    display: "flex",
    gap: "15px",
  },
  socialIcon: {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "bold",
  },
  bottomSection: {
    borderTop: "1px solid #60a5fa",
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
    color: "#60a5fa",
    fontWeight: "bold",
  },
  legalNav: {
    display: "flex",
    gap: "15px",
  },
  legalLink: {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Footer;
