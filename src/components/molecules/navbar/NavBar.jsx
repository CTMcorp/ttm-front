import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faHouse,
  faRightFromBracket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.scss";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../config/AuthContext.jsx";
import Button from "../../atoms/button/Button.jsx";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hideMenu = () => setIsOpen(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navBarContainer">
      <nav id="navBar" className={isOpen ? "isOpen" : ""}>
        <button
          id="burger"
          onClick={() => setIsOpen(!isOpen)}
          onBlur={hideMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to="/" id="homeButton" className="navBarLink">
          <button>
            <FontAwesomeIcon icon={faHouse} />
          </button>
        </Link>
        <div id="links">
          <button id="closeMenu" onClick={hideMenu}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {user?.role === "[PORTEUR]" || user?.role === "[ROLE_Administrateur]" ? (
            <Link to="/ttm/me/filProfils" className="navBarLink">
              Découvrir les profils
            </Link>
          ) : null}
          <Link to="/ttm/me/messagerie" className="navBarLink">
            Messagerie
          </Link>
          <Link to="" className="navBarLink">
            Mes matchs
          </Link>
          <Link to="" className="navBarLink">
            Boîte à outils
          </Link>
          <Link to="" className="navBarLink">
            Mes rendez-vous
          </Link>
        </div>
        <Link to={"/ttm/me/profil"} className="navBarLink">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link id="notification" to={""} className="navBarLink">
          <FontAwesomeIcon icon={faBell} />
        </Link>
        {user ? (
          <Button
            text={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={logout}
            className="logout navBarLink"
          ></Button>
        ) : null}
      </nav>
    </div>
  );
};

export default NavBar;
