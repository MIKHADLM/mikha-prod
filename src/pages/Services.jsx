import React, { useState, useRef } from "react"; // Importation de useRef
import NavBar from "../components/NavBar"; // Importation de la NavBar
import Footer from "../components/Footer";
import process_1 from "../assets/process_1.png";
import process_2 from "../assets/process_2.png";
import process_3 from "../assets/process_3.png";
import process_4 from "../assets/process_4.png";
import photo_mikha_2 from "../assets/photo_mikha_2.png"
import { Import } from "lucide-react";


const services = [
  {
    title: "PACK Réseaux",
    description: "Soignez la qualité de vos vidéos pour booster votre visibilité.",
    points: [
      "3 à 5 vidéos courtes pour vos réseaux",
      "Montage soigné et impactant",
      "Livraison sous 5 jours",
      "1 révision incluse",
    ],
    price: "À partir de 255 €",
    image: "/path-to-your-image-1.png",
  },
  {
    title: "PACK Réseaux PRO",
    description: "Accompagnement sur la durée pour maximiser votre impact.",
    points: [
      "8 à 10 vidéos courtes par mois",
      "Suivi et amélioration continu",
      "Analyse des performances",
      "Livraison continue",
    ],
    price: "À partir de 840 €",
    image: "/path-to-your-image-2.png",
  },
];

// Fonction pour ouvrir le pop-up Calendly
const openCalendlyPopup = () => {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: "https://calendly.com/mikha-vizion/30min" });
  } else {
    alert("Calendly n'est pas disponible. Vérifiez votre connexion internet.");
  }
};

const Services = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // État pour savoir quelle section est active

  // Crée une référence pour la section "Alors, on se lance ?"
  const scrollToSection = useRef(null);

  // Fonction pour scroller vers la section "Alors, on se lance ?"
  const scrollToPacks = () => {
    if (scrollToSection.current) {
      // Utilisation de window.scrollTo pour contrôler la vitesse du scroll
      window.scrollTo({
        top: scrollToSection.current.offsetTop, // position de l'élément
        behavior: "smooth" // Défilement fluide
      });
    }
  };

  // Fonction pour gérer le clic sur un point
  const toggleSection = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  return (
    <div className="main">
      {/* Intégration de la NavBar */}
      <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} className="mt-[-80px]" />

      {/* Le reste du contenu de la page */}
      <div className="bg-black min-h-screen overflow-x-hidden pt-[100px] w-full flex justify-center">
        <div className="container mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold text-center text-blue-400 mb-8 uppercase">
            Les Packs
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col text-white justify-center">
              <h1 className="text-2xl font-bold text-blue-400 mb-8 uppercase">Donner vie à vos idées de la plus belle des manières.</h1>
              
              <p className="mb-4">
                Que ce soit dans mes réalisations de clips, mes contenus sur mes réseaux ou ceux de mes clients, je veux quelque chose d'impactant, d'efficace et d'esthétique.
              </p>
              <button onClick={scrollToPacks} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">
                Voir les packs
              </button>
            </div>

            {/*
            <div className="flex justify-center items-center">
              <video className="w-full h-auto" controls>
                <source src="" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
            */}

            {/* Image temporaire en attendant la vidéo */}

            <div className="flex justify-center items-center">
              <img src={photo_mikha_2} alt="Image temporaire" className="w-full h-auto rounded-lg" />
            </div>

          </div>
          
          
          <div className="text-white justify-center">
            <h1 className="text-2xl font-bold text-blue-400 text-center mb-8 uppercase">Une production gérée de A à Z</h1>
            <p>
              De par mon parcours, j'ai appris à gérer la totalité des besoins d'une réalisation vidéo, de l'idée de base jusqu'à sa diffusion.
              Je vous accompagne de A à Z pour créer ensemble des vidéos qui vous ressemblent vraiment.
              Que vous soyez une entreprise, un créateur de contenu ou un artiste, je mets mon savoir-faire au service de vos projets, en vous proposant des solutions sur-mesure et de qualité.
              <br/>
              <br/>
            </p>

            {/* Section avec les points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
              {/* Point 1: Écriture */}
              <div className="relative group transform transition-transform duration-300 hover:scale-105">
                <img src={process_1} alt="process_1" className="w-full h-auto rounded-lg" />
                <div
                  onClick={() => toggleSection("ecriture")}
                  className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center cursor-pointer"
                >
                  <span className="text-white text-xl font-semibold uppercase">Écriture</span>
                </div>
              </div>

              {/* Point 2: Captation */}
              <div className="relative group transform transition-transform duration-300 hover:scale-105">
                <img src={process_2} alt="process_2" className="w-full h-auto rounded-lg" />
                <div
                  onClick={() => toggleSection("captation")}
                  className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center cursor-pointer"
                >
                  <span className="text-white text-xl font-semibold uppercase">Captation</span>
                </div>
              </div>

              {/* Point 3: Montage */}
              <div className="relative group transform transition-transform duration-300 hover:scale-105">
                <img src={process_3} alt="process_3" className="w-full h-auto rounded-lg" />
                <div
                  onClick={() => toggleSection("montage")}
                  className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center cursor-pointer"
                >
                  <span className="text-white text-xl font-semibold uppercase">Montage</span>
                </div>
              </div>

              {/* Point 4: Diffusion */}
              <div className="relative group transform transition-transform duration-300 hover:scale-105">
                <img src={process_4} alt="process_4" className="w-full h-auto rounded-lg" />
                <div
                  onClick={() => toggleSection("diffusion")}
                  className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center cursor-pointer"
                >
                  <span className="text-white text-xl font-semibold uppercase">Diffusion</span>
                </div>
              </div>
            </div>

            {/* Rectangle avec informations complémentaires */}
            {activeSection && (
              <div className="mt-8 p-6 bg-gray-800 bg-opacity-80 rounded-lg">
                {activeSection === "ecriture" && (
                  <>
                    <h2 className="text-xl font-bold mb-4">Pré-production</h2>
                    <p>
                      "Tout projet commence par une réflexion. Lors de cette première étape, nous discuterons de vos attentes, de votre vision et de vos objectifs. Je me charge de la conception de l’idée, de l’écriture du script, et de la préparation de toute la logistique nécessaire à la réussite de la réalisation. De la création de storyboards à la planification des ressources, chaque détail est pris en compte pour que le tournage soit fluide et efficace."
                    </p>
                  </>
                )}
                {activeSection === "captation" && (
                  <>
                    <h2 className="text-xl font-bold mb-4">Captation</h2>
                    <p>
                      Avec des équipements professionnels et un œil affûté pour les détails, je m’assure que chaque prise soit parfaite. Que ce soit pour un clip, une vidéo corporate ou un contenu pour les réseaux sociaux, la captation est réalisée dans les meilleures conditions, en tenant compte de l’esthétique, du rythme et de la narration.
                    </p>
                  </>
                )}
                {activeSection === "montage" && (
                  <>
                    <h2 className="text-xl font-bold mb-4">Montage</h2>
                    <p>
                      Le montage est là où la magie opère. C’est ici que je donne vie à vos images, en y apportant un travail soigné, rythmé et percutant. En utilisant des techniques de montage créatives et un storytelling adapté, je m’assure que votre vidéo capte l’attention de votre public et qu’elle reste mémorable.
                    </p>
                  </>
                )}
                {activeSection === "diffusion" && (
                  <>
                    <h2 className="text-xl font-bold mb-4">Diffusion</h2>
                    <p>
                      Une fois la vidéo terminée, il est temps de la diffuser. Je m’occupe de la stratégie de diffusion, en choisissant les bons canaux et formats adaptés à vos besoins. De plus, je réalise un suivi précis des performances afin de vous fournir des données sur l’impact de votre vidéo (vues, engagement, conversion…), afin que vous puissiez ajuster votre stratégie et maximiser vos résultats.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Section "Alors, on se lance ?" */}
          <div ref={scrollToSection} className="text-center my-8">
            <h2 className="text-3xl font-semibold text-blue-400 uppercase ">Alors, on se lance ?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-90 text-white p-6 rounded-lg shadow-lg border border-gray-700"
              >
               {/* <img src={service.image} alt={service.title} className="rounded-lg mb-4" /> */}
                <h2 className="text-2xl font-semibold text-blue-300 uppercase">{service.title}</h2>
                <p className="mt-2 mb-4">{service.description}</p>
                <ul className="mb-4">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-center">
                      ✅ {point}
                    </li>
                  ))}
                </ul>
                <p className="font-bold text-lg">{service.price}</p>
               
                <button
                    onClick={openCalendlyPopup}
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
                >
                  Réserver un appel !
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Services;