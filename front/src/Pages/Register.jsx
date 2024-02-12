import React, { useContext, useState } from "react";
import { register } from "../Services/AuthApi";
import { toast } from "react-toastify";
import { GlobalContext } from "../Context/Global";
import { Link } from "react-router-dom";

function Register() {
  const { setToken } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  /**
   * The handleRegister function is used to handle the registration process by sending a
   * request to the server with the user's email, password, and name,
   * and then setting the received token as the authentication token and reloading the page.
   */
  const handleRegister = (e) => {
    e.preventDefault();
    register(email, password, name)
      .then((res) => {
        const token = res.data.token;
        setToken(token);
        window.location.reload(false);
      })
      .catch(() => {
        toast.error("erreur d'enregistrement");
      });
  };

  return (
    <div className="main-container">
      <div className="left-container">
        <div className="logo" />
        <p className="heading">Inscription</p>
        <div className="col-lg-6 custom-background">
          <div className="container-half d-flex justify-content-center align-items-center input-container">
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="inputName">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder=" nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail">Mail</label>
                <input
                  type="Email"
                  className="form-control"
                  id="inputEmail"
                  placeholder=" john@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group" id="form-group">
                <label htmlFor="inputPassword">MOT DE PASSE</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="***********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="connecter">
                Inscription
              </button>
            </form>
          </div>
          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              vous avez déja un compte ?
              <Link to="/login" className="ml-2">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
}

export default Register;
