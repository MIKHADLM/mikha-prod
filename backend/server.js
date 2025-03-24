require("dotenv").config(); // Charge les variables d'environnement depuis le fichier .env
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
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
