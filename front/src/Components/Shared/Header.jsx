import React, { useContext } from "react";
import { GlobalContext } from "../../Context/Global";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Auth/useUser";

function Header() {
  const navigate = useNavigate();
  const user = useUser();
  const { messages, setMessages, setToken } = useContext(GlobalContext);

  /**
   * The `logout` function clears the token, messages, and navigates to the login page.
   */
  const logout = () => {
    setToken("");
    setMessages([]);
    navigate("/login");
  };

  return (
    <div className="nav">
      <div className="logo" />
      <div className="right-logo">
        <div className="logo-make">
          <div className="circle1"></div>
          <p className="p">{messages?.length}</p>
        </div>
        <div className="logo-content">
          <div className="name1">{user?.user?.name}</div>
          <div className="gmail">{user?.user?.email}</div>
        </div>
        <i className="fa-solid fa-arrow-up-from-bracket" onClick={logout} />
      </div>
    </div>
  );
}

export default Header;
