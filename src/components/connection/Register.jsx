import { useState } from "react";

import("./connection.scss");
import Input from "../atoms/input/Input.jsx";
import Button from "../atoms/button/Button.jsx";
import { useNavigate } from "react-router";
import userService from "../../services/userService.js";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { register } = userService();

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
        navigate("/auth/login");
      }
    } catch (error) {
      setMessage("Registration failed.");
      console.log(error);
    }
  };

  return (
    <div id="formContainer">
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
        <p>{message}</p>
        <Button text="S'enregistrer" type="submit"></Button>
      </form>
    </div>
  );
};

export default Register;
