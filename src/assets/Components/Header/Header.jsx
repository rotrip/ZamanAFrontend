import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = ({ isLoggedIn, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleOpenCart = async (e) => {
    e.preventDefault();
    navigate("/cart");
  };

  return (
    <div className="headerFull">
      <h1 className="zamana">ZamanA</h1>
      {isLoggedIn && (
        <div className="userNameHeader">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="cartSymbol"
            onClick={handleOpenCart}
          />

          <div
            className="dropdownWrapper"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <FontAwesomeIcon className="loggedInUser" icon={faUser} />

            {showDropdown && (
              <div className="dropdown">
                <Link className="dropdownItem" to="/list">
                  Home
                </Link>
                <Link className="dropdownItem" to="/profile">
                  Profile
                </Link>
                <p className="dropdownItem" onClick={onLogout}>
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
