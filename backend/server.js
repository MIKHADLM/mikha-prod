require("dotenv").config(); // Charge les variables d'environnement depuis le fichier .env
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
const allowedOrigins = [
  'https://www.mikhaprod.com',
  'https://mikhaprod.com',
  'http://localhost:5173', // Vite dev local
  'http://localhost:3000'  // Au cas où
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests) ?? 
    // Pour la sécurité stricte d'un site web, on peut refuser no origin, 
    // mais pour le dev localhost parfois l'origin est null.
    // Ici on autorise si pas d'origin (ex: appel serveur à serveur) ou si dans la liste.
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La politique CORS de ce site interdit l\'accès depuis cette origine.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.json());

// Configuration de Nodemailer avec les variables d'environnement
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,  // smtp-relay.brevo.com
  port: process.env.EMAIL_PORT,  // 587
  secure: false, // Utilise false pour le port 587
  auth: {
    user: process.env.EMAIL_USER, // 88cb28001@smtp-brevo.com
    pass: process.env.EMAIL_PASS, // Clé API Brevo
  },
});

// Route POST pour envoyer un email
app.post("/send", (req, res) => {
  const { nom, prenom, entreprise, email, telephone, message, demande } = req.body;

  if (!nom || !prenom || !email || !message || !demande) {
    return res.status(400).json({ message: "Merci de remplir tous les champs obligatoires." });
  }

  const mailOptions = {
    from: 'contact@mikhaprod.com',  // L'adresse email d'expéditeur
    to: process.env.EMAIL_TO,  // L'adresse de destination
    subject: `Nouveau message de ${nom} ${prenom}`,  // Sujet de l'email
    text: `
      Vous avez un nouveau message :

      📌 Nom: ${nom}
      📌 Prénom: ${prenom}
      🏢 Entreprise: ${entreprise || "Non précisé"}
      ✉ Email: ${email}
      📞 Téléphone: ${telephone || "Non précisé"}

      🎯 Demande: ${demande}

      📩 Message:
      ${message}
    `,
  };

  // Envoi de l'email avec les options définies
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur d'envoi du message:", error);
      return res.status(500).json({ message: "Erreur d'envoi du message." });
    }
    console.log("Email envoyé :", info.response);
    return res.status(200).json({ message: "Message envoyé avec succès !" });
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
