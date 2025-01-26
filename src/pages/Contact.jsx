import React, { useState } from "react";
import NavBar from "../components/NavBar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer le formulaire, comme une requête à un backend ou un service comme Formspree
    console.log(formData);
    setSuccessMessage("Votre message a bien été envoyé !");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Contactez-moi</h2>
          {successMessage && (
            <p className="text-green-400 text-center mb-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-semibold">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-1 font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-2 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full transition"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
