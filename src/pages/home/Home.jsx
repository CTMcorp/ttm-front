import "./home.scss";
import Button from "../../components/atoms/button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../config/AuthContext.jsx";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/login");
  };

  return (
    <div id="container">
      {!user ? (
        <Button onClick={handleClick} text="Se connecter"></Button>
      ) : (
        <div>
          <h2>Bienvenue !</h2>
        </div>
      )}
      <div id="content">
        <div id="titleContent">
          <p id="title">Qu'est-ce que Trouve Ton Match ?</p>
        </div>
        <div id="description">
          <p>
            Trouve Ton Match est une application qui vous permettra de trouver
            LA personne pour vous accompagner et vous soutenir, une épaule sur
            laquelle vous reposer.
          </p>
          <p>
            Le but étant de créer un climat de confiance avec cette personne
            afin que vous puissiez vous tourner vers elle lorsque vous avez des
            soucis ou des besoins.
          </p>
          <p>
            Cette marraine / parrain peut être un chef d’entreprise ou un cadre
            dirigeant ayant de l’expérience et un réseau important pour faire
            appel à des partenaires experts dans vos besoins.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
