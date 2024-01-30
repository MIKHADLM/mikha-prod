import React from "react";
import NavBar from "../components/NavBar";
import Carte from "../assets/carte.gif";

const About = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col p-5 flex-grow">
        <div>
          <div className="text-4xl font-bold text-white pt-5">
            MICHAEL PHILIBERT
          </div>
          <div className="text-2xl text-white pb-10">
            RÉALISATEUR / CADREUR / MONTEUR / VIDÉASTE FREELANCE
          </div>
          <div className="text-xl text-white py-5">
            Enfant d'internet né en 2000, je fais des trucs avec une caméra et
            mon ordinateur. <br />
            Je teste, j'expérimente, j'apprends...
          </div>
          <button className="bg-white text-black p-3 w-80 h-15">
            FICHIER MP3
          </button>
          <img src={Carte} alt="carte" className="h-80 pl-60" />
          <div className="text-xl text-white py-5">
            Toujours ouvert à de nombreux projets, n'hésitez pas à me contacter
            en cas de questions !
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="flex flex-row justify-between leading-loose">
          <div className="pt-5 flex flex-col pl-20">
            <div className="text-xl font-bold text-white pb-2">
              Localisations :
            </div>
            <div className="text-l text-white">Basé sur Lille, France</div>
            <div className="text-l text-white">Déplacement possible</div>
            <div className="text-l text-white">Titulaire d'un permis B</div>
          </div>
          <div className="pt-5 flex flex-col pr-20">
            <div className="text-xl font-bold text-white pb-2">Diplômes :</div>
            <div className="text-l text-white">
              Détenteur d'une Licence Arts du spectable - Études
              cinématographique
            </div>
            <div className="text-l text-white">
              Détenteur d'une Licence Professionnelle Techniques et Activités de
              l'Image et du Son
            </div>
            <div className="text-l text-white">
              Convergence Internet Audiovisuel Numérique{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
