import React, { useState } from "react";
import { PopupWidget } from "react-calendly";

const Contact = () => {
  const [formData, setFormData] = useState({
    demande: "",
    nom: "",
    prenom: "",
    entreprise: "",
    email: "",
    telephone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire envoyées :", formData);
    alert("Votre message a été envoyé !");
    // Ici, tu pourras ajouter l'envoi vers un backend ou un service comme Formspree
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-6xl font-bold mb-6">Un Projet ? <br/>Une question ?</h1>

      {/* Formulaire de contact */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <label className="block mb-2">Votre demande concerne *</label>
        <select
          name="demande"
          value={formData.demande}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        >
          <option value="">Sélectionnez une option</option>
          <option value="Projet vidéo">Un projet vidéo</option>
          <option value="Collaboration">Demande de collaboration</option>
        </select>

        <label className="block mb-2">Nom *</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        />

        <label className="block mb-2">Prénom *</label>
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        />

        <label className="block mb-2">Entreprise</label>
        <input
          type="text"
          name="entreprise"
          value={formData.entreprise}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        />

        <label className="block mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        />

        <label className="block mb-2">Téléphone</label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        />

        <label className="block mb-2">Dites-moi en plus sur votre projet</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          Envoyer
        </button>
      </form>

      {/* Widget Calendly */}
      <div className="mt-6">
        <PopupWidget
          url="https://calendly.com/mikha-vizion/30min"
          rootElement={document.getElementById("root")}
          text="Prendre un rendez-vous"
          textColor="#ffffff"
          color="#4f46e5"
        />
      </div>
    </div>
  );
};

export default Contact;
