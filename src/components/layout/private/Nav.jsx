import React from "react";
import Avatar from "../../../assets/img/user.png";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";

//Nav entorno logueado
export const Nav = () => {
  const { auth } = useAuth();

  return (
    <nav className="navbar__container-lists-private">
      <ul className="container-lists__menu-list-private">
        {/* <li className="menu-list__item-private">
          <NavLink to="/social" className="menu-list__link-private">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title-private">Inicio</span>
          </NavLink>
        </li> */}

        <li className="menu-list__item-private">
          <NavLink to="/social/feed" className="menu-list__link-private">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title-private">Feed</span>
          </NavLink>
        </li>

        <li className="menu-list__item-private">
          <NavLink to="/social/people" className="menu-list__link-private">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title-private">People</span>
          </NavLink>
        </li>
      </ul>

      <ul className="container-lists__list-end-private">
        <li className="list-end__item-private">
          <NavLink
            to={"/social/perfil/" + auth._id}
            className="list-end__link-image-private"
          >
            {auth.image !== "default.png" ? (
              <img
                src={Global.url + "user/avatar/" + auth.image}
                className="list-end__img-private"
                alt="Foto de perfil"
              />
            ) : (
              <img
                src={Avatar}
                className="list-end__img-private"
                alt="Foto de perfil"
              />
            )}
            <span className="list-end__name-private">{auth.nick}</span>
          </NavLink>
        </li>

        <li className="list-end__item-private">
          <NavLink to="/social/config" className="list-end__link-private">
            <i className="fa-solid fa-gear"></i>
            <span className="list-end__name-private"></span>
          </NavLink>
        </li>
        <li className="list-end__item-private">
          <NavLink to="/social/logout" className="list-end__link-private">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="list-end__name-private"></span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
