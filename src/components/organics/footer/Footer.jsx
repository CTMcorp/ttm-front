import hologramme from "../../../assets/logosInitiative/hologrammeColor.png"
import "./footer.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faInstagram, faLinkedinIn, faTiktok} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <div id="footer">
            <img src={hologramme} alt="hologramme du site"/>

            <div className="footerText">
                <p>Votre plateforme :</p>
                <p>
                    <a href="https://www.initiative79.com">Initiative Deux-Sèvres</a>
                </p>
                <p>
                    <a href="tel:+33679875609">06 79 87 56 09</a>
                </p>
                <p>
                    <a href="mailto:accompagnement@initiativedeuxsevres.fr">accompagnement@initiativedeuxsevres.fr</a>
                </p>
            </div>

            <div className="footerIcons">
                <a href="https://www.instagram.com/initiative_deux_sevres">
                    <FontAwesomeIcon icon={faInstagram}/>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61556616180678#">
                    <FontAwesomeIcon icon={faFacebookF}/>
                </a>
                <a href="https://www.linkedin.com/company/initiative-deux-sevres/?originalSubdomain=fr">
                    <FontAwesomeIcon icon={faLinkedinIn}/>
                </a>
                <a href="https://www.tiktok.com/@initiative.deux.s">
                    <FontAwesomeIcon icon={faTiktok}/>
                </a>
            </div>
        </div>
    )
}

export default Footer;