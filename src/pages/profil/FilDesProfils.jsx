import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../config/AuthContext";
import profileService from "../../services/profileService";
import "./filDesProfils.scss";
import { Link } from "react-router";

const FilDesProfils = () => {
  const { user: currentUser } = useContext(AuthContext);
  const { getAllParrains, getAllUsers } = profileService();
  const [parrains, setParrains] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const fetchParrain = useCallback(async () => {
    try {
      const response = await getAllParrains();
      if (response && response.data) {
        setParrains(response.data);
      }
    } catch (error) {
      error("not found", error);
    }
  }, [setParrains, getAllParrains]);

  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await getAllUsers();
      if (response && response.data) {
        setAllUsers(response.data);
      }
    } catch (error) {
      error("not found ", error);
    }
  }, [getAllUsers, setAllUsers]);

  useEffect(() => {
    fetchParrain();
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <h1>Partez à la découverte des profils !</h1>
      {currentUser?.role === "[ROLE_PORTEUR]" ? (
        <>
          <div className="card-container">
            {parrains.map((parrain, index) => (
              <div className="profile-card" key={index}>
                <div className="card-title">
                  <div className="pic">PICTURE</div>
                  <div className="identity">
                    {parrain?.lastname} {parrain?.firstname}
                  </div>
                </div>
                <Link
                  className="voir-profil"
                  to={`/ttm/me/profil/${parrain?.userId}`}
                >
                  Voir le profil
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : currentUser?.role === "[ROLE_ADMIN]" ? (
        <div className="card-container">
          {allUsers.map((oneUser, index) => (
            <div className="profile-card" key={index}>
              <div className="card-title">
                <div className="pic">PICTURE</div>
                <div className="identity">
                  {oneUser?.lastname} {oneUser?.firstname}
                </div>
              </div>
              <Link
                className="voir-profil"
                to={`/ttm/me/profil/${oneUser?.userId}`}
              >
                Voir le profil
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>TEST</div>
      )}
    </>
  );
};

export default FilDesProfils;
