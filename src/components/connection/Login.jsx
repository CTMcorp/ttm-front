import "./connection.scss";
import Button from "../atoms/button/Button.jsx";
import Input from "../atoms/input/Input.jsx";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import userService from "../../services/userService.js";
import { AuthContext } from "../../config/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { login: loginRequest } = userService();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginRequest(email, password);
      if (response && response.data) {
        login(response.data["accessToken"]);
        navigate("/");
      }
    } catch (error) {
      setMessage("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <div id="formContainer">
      {/* TODO rajouter l'action action="/mapage"*/}
      <form method="post" onSubmit={handleLogin} id="connectionForm">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="Email"
          placeholder="Entrer votre adresse email"
          useValueAsLabel={false}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="Mot de passe"
          placeholder="Entrer votre mot de passe"
          useValueAsLabel={false}
        />
        <Link
          to="/auth/register"
          style={{ textDecoration: "none", color: "#E31766" }}
        >
          Cliquez ici si vous n&apos;avez pas encore de compte !
        </Link>
        <p>{message}</p>
        <Button text="Se connecter" type="submit" onClick={() => {}}></Button>
      </form>
    </div>
  );
};

export default Login;
