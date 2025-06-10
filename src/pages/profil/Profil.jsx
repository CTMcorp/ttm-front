import "./profil.scss";
import profilPhoto from "../../assets/profilPic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../config/AuthContext";
import UserService from "../../services/userService";

const Profil = () => {
  const { loginContext } = useContext(AuthContext);
  const { getUserById } = UserService();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById();
        if (response && response.data) {
          setUser(response.data);
          loginContext();
          console.log(response.data);
        }
      } catch (error) {
        console.log("oups", error);
      }
    };
    fetchUser();
  }, [getUserById, loginContext]);

  return (
    <>
      <div id="content">
        <div id="profile-info">
          <img
            className="profile-pic"
            alt="Photo de profil de l'utilisateur"
            src={profilPhoto}
          />
          <div className="identity">
            <div className="user-info">
              <div className="name">
                <p>{user?.firstname} </p>
                <p>{user?.lastname}</p>
              </div>
              <p>Métier</p>
            </div>
          </div>
          <div className="availabilities">
            <h3>Disponibilités :</h3>
            <p>lundi, mardi, mercredi, jeudi</p>
          </div>
          <div className="needs">
            <p>Types de réseaux / besoins</p>
            <p>
              {user?.secteursActivites.map((element) => {
                element;
              })}
            </p>
          </div>
          <div className="profile-btn">
            <FontAwesomeIcon icon={faTrashCan} />
            <p>Supprimer mon profil</p>
          </div>
        </div>
        <div className="profile-description">
          <h2>DESCRIPTION DU PROJET ET DES BESOINS</h2>
          <p>{user?.description}</p>
        </div>
      </div>
    </>
  );
};

export default Profil;
