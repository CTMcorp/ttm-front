import logo from "../../../assets/logosInitiative/logo.png"
import logoColor from "../../../assets/logosInitiative/logoColor.png"
import "./header.scss"
import NavBar from "../../molecules/navbar/NavBar.jsx";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header id="header">
            <div id="logoInitiative">
                <img className="logos" src={logo} alt="Logo du réseau initiative Deux-Sèvres"/>
                <Link to="/">
                    <img className="logos" src={logoColor} alt="Logo de l'application Trouve ton match"/>
                </Link>
            </div>
            <NavBar></NavBar>
        </header>
    );
}

export default Header;