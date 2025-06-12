import "./profil.scss";
import profilPhoto from "../../assets/profilPic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UserService from "../../services/userService";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import UpdateUser from "../../components/molecules/updateUser/UpdateUser";
import { useNavigate } from "react-router";
import { AuthContext } from "../../config/AuthContext";
import UpdateSecteurs from "../../components/molecules/updateSecteurs/UpdateSecteurs";

// eslint-disable-next-line react/prop-types
const Profil = () => {
  let { id } = useParams();
  const { deleteUser, getUserById } = UserService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecteursModalOpen, setIsSecteursModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        if (response && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.log("oups", error);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteUser(user?.userId);
      if (response) {
        logout();
        navigate("/auth/register");
      }
    } catch (error) {
      console.log("oups", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
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
          <p>{user?.email}</p>
        </div>
        <div className="profile-btn">
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={handleOpenModal}
          ></FontAwesomeIcon>
          <UpdateUser
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            userData={user}
            onUserUpdated={(updateUser) => setUser(updateUser)}
          />
          <p>Modifier mes informations personnelles</p>
          <FontAwesomeIcon icon={faTrashCan} onClick={handleDeleteUser} />
          <p>Supprimer mon compte</p>
        </div>
      </div>
      <div className="needs">
        <div id="secteurs">
          <p>Secteurs d&apos;activités</p>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => setIsSecteursModalOpen(true)}
          />
          <UpdateSecteurs
            isOpen={isSecteursModalOpen}
            onClose={() => setIsSecteursModalOpen(false)}
            userData={user}
            onUserUpdated={(updateUser) => setUser(updateUser)}
          />
          <ul>
            {user?.secteursActivites.map((element, index) => (
              <li key={index}>{element.toLowerCase().replaceAll("_", " ")}</li>
            ))}
          </ul>
        </div>
        <div id="types">
          <p>Types d&apos;accompagnements nécessaires</p>
          <ul>
            {user?.typesAccompagnements.map((element, index) => (
              <li key={index}>{element.toLowerCase().replaceAll("_", " ")}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="profile-description">
        <h2>Description du projet et des besoins</h2>
        <p>{user?.description}</p>
      </div>
    </div>
  );
};

export default Profil;
