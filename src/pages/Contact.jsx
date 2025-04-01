import React from "react";
import NavBar from "../components/NavBar"; // Importation de la NavBar

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "8fce030a-f3d4-4f56-8b75-ba9023d77ec8");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <NavBar />

      <div className="w-full flex justify-center pt-32 md:pt-24">
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Une question ? <br /> Un projet ?
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto mt-12">
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Mikha est prêt à vous répondre !
          </h1>
          <p className="text-gray-400 text-lg">
            Vous avez une idée, une collaboration en tête ou vous souhaitez en savoir plus sur mes services ?
            <br />
            Remplissez le formulaire ou prenez directement un rendez-vous pour un appel.
          </p>
        </div>

        <form onSubmit={onSubmit} className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <input type="text" name="name" required placeholder="Nom*" className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"/>
          <input type="email" name="email" required placeholder="Email*" className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"/>
          <textarea name="message" required placeholder="Message*" className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"></textarea>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
            Envoyer
          </button>
        </form>

        <span className="text-white mt-4">{result}</span>
      </div>
    </div>
  );
}
