import React from "react";
import Avatar from "../../../assets/img/user.png";
import { NavLink } from "react-router-dom";

//Nav entorno no logueado
export const Nav = () => {
  return (
    <nav className="navbar__container-lists-nav">
      <ul className="container-lists__menu-list-nav">
        <li className="menu-list__item-nav">
          <NavLink to="/login" href="#" className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title-nav">Login</span>
          </NavLink>
        </li>

        <li className="menu-list__item-nav">
          <NavLink to="/registro" href="#" className="menu-list__link-nav">
            <i className="fa-solid fa-users"></i>
            <span className="menu-list__title-nav">Registro</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
