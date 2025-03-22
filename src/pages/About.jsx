import React from "react";
import NavBar from "../components/NavBar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import EnfantInternet from "../assets/Enfant_Internet.mp3";
import Photo_mikha_1 from "../assets/Photo_mikha_1.jpg";

const About = () => {
  function playAudio() {
    document.getElementById("audiomp3").play();
  }

  return (
    <div className="bg-black min-h-screen overflow-x-hidden pt-14 px-0 flex flex-col items-center">
      <NavBar />
      <div className="flex flex-col p-8 flex-grow items-center text-center w-full">
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-white pt-5">
            Réalisateur, vidéaste, cadreur/monteur et fondateur de Mehomies
          </div>
          <div className="text-6xl text-white pb-5">
            Salut ! Moi, c'est Mikha.
          </div>
          
          <div className="text-xl text-white pb-8">
            <span className="text-[#00FF00] text-2xl pr-3 font-extrabold">
              ●
            </span>
            DISPONIBLE POUR TOUS PROJETS
          </div> 
          {/* Centrage de l'image */}
          <img src={Photo_mikha_1} alt="À propos" className="w-[70vw] max-w-none rounded-lg shadow-lg mx-auto" />
          
          <div className="text-xl text-white pb-1 font-semibold"> {/* Contact */} </div>
          <div className="text-lg text-white font-thin">
            {/*
            <MailOutlineIcon /> contact@mikhaprod.com
            */}
          </div>
          <div 
            className="text-lg text-white pb-5 font-thin">
              {/*
            <InstagramIcon /> mikha_dlm
            */}
          </div>
          <div  className="text-xl text-white font-semibold inline">
            {/*
            Enfant d'internet{" "}
            <span className="text-xs">
              (expression){" "}
              <VolumeUpOutlinedIcon
                onClick={playAudio}
                className="cursor-pointer mb-2"
              />
            </span>
            */}
          </div> 
          <audio id="audiomp3" src={EnfantInternet} type="audio/mp3"></audio>
          <div  className="text-lg text-white pb-5 font-thin lg:w-1/2">
            {/*
             Personne ayant été exposée assez jeune à Internet et ayant développé
             une grande partie de ses compétences grâce à des outils numériques. 
            */}
          </div>
        
          <div className="text-xl text-white pb-1 font-semibold text-left">
            Mon parcours
          </div>
          <div className="text-lg text-white pb-5 font-thin lg:w-1/2 text-left text-justify">
            <br/>
            Basé à Lille, j'accompagne depuis 2019 des artistes et des entreprises de tous horizons dans la mise en valeur de leur vision afin d’engager leur audience. <br/>
            <br/>
            C’est par passion pour la création et avec l’envie d’entreprendre que je suis devenu vidéaste freelance à 19 ans. D’abord en parallèle de mes études, puis à plein temps depuis novembre 2023. <br/>
            <br/>
            Grâce à mon expérience dans la réalisation de clips et mes collaborations avec des entreprises aux secteurs variés, j’ai développé une grande polyvalence. Aujourd’hui, je peux vous accompagner de A à Z, de l'idée initiale jusqu'à la rencontre avec votre public.
          </div>

          <div className="text-xl text-white pb-1 font-semibold text-left">
            Derrière mais aussi devant la caméra ! 
          </div>
          <div className="text-lg text-white pb-5 font-thin lg:w-1/2 text-left text-justify">
            <br/>
              Depuis 2024, je prends énormément de plaisir à créer du contenu, que ce soit pour mes propres réseaux ou pour le média Hip-Hop RapMinute. Cette activité me permet d'expérimenter différents formats et d'affiner ma vision de la création digitale.
            <br/>
            <br/>
            Avec plus d'un million de vues cumulées sur mes vidéos, j'ai beaucoup appris sur l'importance du storytelling ainsi que sur l'impact d'un montage qualitatif et percutant. Fort de cette expérience, j'accompagne aujourd'hui créateurs de contenu et entrepreneurs dans leur communication.
            <br/>
          </div>

          <div className="text-xl text-white pb-1 font-semibold text-left">Diplômes</div>
          {/* Suppression de pl-5 pour bien centrer la liste */}
          <div className="text-lg text-white pb-5 font-thin">
            <li className="lg:w-1/2">
              Détenteur d'une{" "}
              <b>Licence Arts du spectacle - Études cinématographiques</b>
            </li>
            <li className="lg:w-1/2">
              Détenteur d'une{" "}
              <b>
                Licence Professionnelle Techniques et Activités de l'Image et du
                Son, Convergence Internet Audiovisuel Numérique Arts du
                spectacle
              </b>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
