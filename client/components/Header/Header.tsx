import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { NavLink, useNavigate } from 'react-router-dom'; 
import { Icon } from 'semantic-ui-react'; 
import { useAppSelector } from '../../hooks/hooks'; 
import { actionUserLogOut } from '../../store/reducers/userReducer';  
import './Header.scss'; // Ensure this import path is correct

function Header() {
  const [isOpen, setIsOpen] = useState(false); // State for menu toggle
  const navigate = useNavigate(); // Navigation hook
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu function
  };
  const isLogged = useAppSelector((state) => state.user.isLogged); // Selector hook
  const dispatch = useDispatch(); // Dispatch hook

  const logout = () => {
    dispatch(actionUserLogOut()); // Dispatch logout action
    navigate('/'); // Navigate to home
  };

  return (
    <header className="Header">
      <div className="Header-top">
        <div className="Header-block">
          <img
            className="Header-logo"
            src="/d20-7136921_640.png" // Corrected image path
            alt="Logo Dice Forge"
          />
          <NavLink to="/">
            <h1 className="Header-title">Dice Forge</h1>
          </NavLink>
        </div>
        <button type="button" className="Header-burger" onClick={toggleMenu}>
          <Icon name="bars" />
        </button>
      </div>
      <nav className={`Header-menu ${isOpen ? 'open' : ''}`}>
        {isLogged ? (
          <>
            <button type="button" className="Header-link-btn" onClick={logout}>
              Deconnexion
            </button>
            <NavLink className="Header-link" to="/api/profile">
              Profil
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="Header-link" to="/api/signup">
              Inscription
            </NavLink>
            <NavLink className="Header-link" to="/api/login">
              Connexion
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
