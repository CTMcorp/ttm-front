import { useContext, useEffect, useState } from "react";

import("./connection.scss");
import Input from "../atoms/input/Input.jsx";
import Button from "../atoms/button/Button.jsx";
import { Link, useNavigate } from "react-router";
import userService from "../../services/userService.js";
import { AuthContext } from "../../config/AuthContext.jsx";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { register } = userService();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setIsAdmin(user?.role == "[ROLE_ADMIN]");
  }, [user]);
  console.log(isAdmin);
  console.log(user?.role);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!role) {
      setMessage("Veuillez sélectionner un rôle.");
      return;
    }
    try {
      const response = await register(
        firstname,
        lastname,
        email,
        password,
        role
      );
      console.log(response.data);
      if (response && response.data) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setMessage("Registration failed.");
      console.log(error);
    }
  };

  return (
    <>
      {isAdmin ? (
        <div id="formContainer">
          <h2 id="register-title">Créez un nouvel utilisateur!</h2>
          {/*// TODO rajouter l'action action="/newPage"*/}
          <form method="post" onSubmit={handleRegister} id="connectionForm">
            <Input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              name="Prénom"
              placeholder="Entrer votre prénom"
              className="text"
              useValueAsLabel={false}
            />
            <Input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              name="Nom"
              placeholder="Entrer votre nom"
              className="text"
              useValueAsLabel={false}
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="Email"
              placeholder="Entrer votre adresse email"
              className="text"
              useValueAsLabel={false}
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="Mot de passe"
              placeholder="Entrer votre mot de passe"
              className="text"
              useValueAsLabel={false}
            />
            <div id="checkbox">
              {/* FIXME si je passe en type radio, je peux quand même en sélectionner plusieurs. Problème avec les div ??*/}
              <Input
                type="radio"
                name="role"
                value="ADMIN"
                onChange={(e) => setRole(e.target.value)}
                className="checkbox"
                checked={role === "ADMIN"}
                useValueAsLabel={true}
              />
              <Input
                type="radio"
                name="role"
                value="PARRAIN"
                onChange={(e) => setRole(e.target.value)}
                className="checkbox"
                checked={role === "PARRAIN"}
                useValueAsLabel={true}
              />
              <Input
                type="radio"
                name="role"
                value="PORTEUR"
                onChange={(e) => setRole(e.target.value)}
                className="checkbox"
                checked={role === "PORTEUR"}
                useValueAsLabel={true}
              />
            </div>
            {message && <p>{message}</p>}
            {/* <Link
              to="/auth/login"
              style={{ textDecoration: "none", color: "#E31766" }}
            >
              Cliquez ici pour vous connecter si vous avez déjà votre compte !
            </Link> */}
            <Button text="Créer un utilisateur" type="submit"></Button>
          </form>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Register;
