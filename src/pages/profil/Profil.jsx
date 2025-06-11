import "./profil.scss";
import profilPhoto from "../../assets/profilPic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../config/AuthContext";
import UserService from "../../services/userService";

const Profil = () => {
  const { user } = useContext(AuthContext);
  // const { getUserById } = UserService();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await getUserById();
  //       if (response && response.data) {
  //         setUser(response.data);
  //         loginContext();
  //         console.log(response.data);
  //       }
  //     } catch (error) {
  //       console.log("oups", error);
  //     }
  //   };
  //   fetchUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
            <p>{user?.firstname} </p>
            <p>{user?.lastname}</p>
          </div>
          <div className="profile-btn">
            <FontAwesomeIcon icon={faPenToSquare} />
            <p>Modifier</p>
            <FontAwesomeIcon icon={faTrashCan} />
            <p>Supprimer</p>
          </div>
        </div>
        <div className="needs">
          <div id="secteurs">
            <p>Secteurs d&apos;activités</p>
            <ul>
              {user?.secteursActivites.map((element, index) => (
                <li key={index}>
                  {element.toLowerCase().replaceAll("_", " ")}
                </li>
              ))}
            </ul>
          </div>
          <div id="types">
            <p>Types d&apos;accompagnements nécessaires</p>
            <ul>
              {user?.typesAccompagnements.map((element, index) => (
                <li key={index}>
                  {element.toLowerCase().replaceAll("_", " ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="profile-description">
          <h2>Description du projet et des besoins</h2>
          <p>{user?.description}</p>
        </div>
      </div>
    </>
  );
};

export default Profil;
