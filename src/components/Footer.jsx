import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.leftSection}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>MIKHA</h1>
        </div>
       
        <div style={styles.navRow} className="footer-nav-row">
          <nav style={styles.nav} className="footer-nav">
            <Link to="/" style={styles.link}>Portfolio</Link>
            <Link to="/services" style={styles.link}>Services</Link>
            <Link to="/about" style={styles.link}>À propos</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
          </nav>
          <div style={styles.socialLinks} className="footer-social">
            <a href="https://www.instagram.com/mikha_dlm/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" style={{...styles.iconImage, className: "footer-icon"}} />
            </a>
            <a href="https://www.youtube.com/@mikha_dlm" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg" alt="YouTube" style={{...styles.iconImage, className: "footer-icon"}} />
            </a>
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
  iconImage: {
    width: "24px",
    height: "24px",
    filter: "brightness(0) invert(1)",
  },
};

const mobileResponsiveStyles = `
  @media (max-width: 768px) {
    .footer-nav-row {
      flex-direction: column;
      align-items: center;
    }
    .footer-nav {
      justify-content: center !important;
      flex-wrap: wrap;
      gap: 10px;
    }
    .footer-social {
      justify-content: center !important;
      margin-top: 10px;
    }
    .footer-icon {
      width: 32px !important;
      height: 32px !important;
    }
  }
`;

const styleTag = document.createElement("style");
styleTag.type = "text/css";
styleTag.innerHTML = mobileResponsiveStyles;
document.head.appendChild(styleTag);

export default Footer;
