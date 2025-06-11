import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../config/AuthContext";
import profileService from "../../services/profileService";
import "./filDesProfils.scss";

const FilDesProfils = () => {
  const { loginContext } = useContext(AuthContext);
  const { getAllParrains } = profileService();
  const [parrains, setParrains] = useState([]);

  useEffect(() => {
    const fetchParrain = async () => {
      try {
        const response = await getAllParrains();
        if (response && response.data) {
          setParrains(response.data);
          loginContext();
          console.log(response.data);
        }
      } catch (error) {
        console.log("not found", error);
      }
    };
    fetchParrain();
  }, []);

  return (
    <div>
      <h1>Partez à la découverte des profils !</h1>
      <div className="card-container">
        {parrains.map((parrain, index) => (
          <div className="profile-card" key={index}>
            <div className="card-title">
              <div className="pic">PICTURE</div>
              <div className="identity">
                {parrain?.lastname} {parrain?.firstname}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilDesProfils;
