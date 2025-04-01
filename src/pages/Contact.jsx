import React, { useState } from "react";
import NavBar from "../components/NavBar"; // Importation de la NavBar

const Contact = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Ajout de menuOpen pour la NavBar

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alert("Votre message a été envoyé avec succès !");
      event.target.reset();
    } else {
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Vidéo d'arrière-plan - si tu souhaites l'ajouter */}
      <video
        className="absolute z-10 w-full h-full object-cover"
        src="https://www.example.com/your-background-video.mp4" // Remplace par ton lien de vidéo si tu souhaites
        loop
        muted
        playsInline
        autoPlay
        style={{ zIndex: -1 }}
      />

      {/* Barre de navigation */}
      <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

      {/* Contenu principal */}
      <div className="w-full flex justify-center pt-32 md:pt-24">
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Une question ? <br /> Un projet ?
          </h1>
        </div>
      </div>

      {/* Contenu principal en deux colonnes */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto mt-12">
        
        {/* Colonne gauche - Texte d'introduction */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Mikha est prêt à vous répondre !
          </h1>
          <p className="text-gray-400 text-lg">
            Vous avez une idée, une collaboration en tête ou vous souhaitez en savoir plus sur mes services ?
            <br />
            Remplissez le formulaire ou prenez directement un rendez-vous pour un appel.
          </p>

          {/* Bouton pour ouvrir le pop-up Calendly */}
          <button
            onClick={openCalendlyPopup}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Réserver un appel !
          </button>
        </div>

        {/* Colonne droite - Formulaire */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <input type="hidden" name="access_key" value="8fce030a-f3d4-4f56-8b75-ba9023d77ec8" />

          <input
            type="text"
            name="nom"
            required
            placeholder="Nom*"
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />

          <input
            type="text"
            name="prenom"
            required
            placeholder="Prénom*"
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />

          <input
            type="text"
            name="entreprise"
            placeholder="Entreprise"
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email*"
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />

          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone"
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />

          <textarea
            name="message"
            rows="4"
            required
            placeholder="Dites-moi en plus sur votre projet*"
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
