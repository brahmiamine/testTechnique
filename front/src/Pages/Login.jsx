import React, { useContext, useState } from "react";
import { login } from "../Services/AuthApi";
import { toast } from "react-toastify";
import { GlobalContext } from "../Context/Global";
import { Link } from "react-router-dom";

function Login() {
  const { setToken } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * The function is used to handle the login process, including sending a request to
   *  the server with the email and password, setting the token
   * received in the response, and reloading the page.
   */
  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password)
      .then((res) => {
        const token = res.data.token;
        setToken(token);
        window.location.reload(false);
      })
      .catch(() => {
        toast.error("email ou mot de passe invalide");
      });
  };

  return (
    <div className="main-container">
      <div className="left-container">
        <div className="logo" />
        <p className="heading">Connexion</p>
        <div className="col-lg-6 custom-background">
          <div className="container-half d-flex justify-content-center align-items-center input-container">
            <form onSubmit={handleLogin}>
              <div className="form-group" id="form-group">
                <label htmlFor="inputEmail">EMAIL</label>
                <input
                  type="eamil"
                  className="form-control"
                  id="inputEmail"
                  placeholder=" john@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="fa-solid fa-user input-icon" />
              </div>
              <div className="form-group" id="form-group">
                <label htmlFor="inputPassword">MOT DE PASSE</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder=" ***********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="fa-solid fa-key input-icon" />
              </div>
              <button type="submit" className="connecter">
                Se connecter
              </button>
            </form>
          </div>
          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              Vous n'avez pas de compte ?
              <Link to="/register" className="ml-2">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
}

export default Login;
