import React from "react";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header className="layout__navbar-private">
      <div className="navbar__header-private">
        <a href="#" className="navbar__title-private">
          AGMTWEET
        </a>
      </div>

      <Nav></Nav>
    </header>
  );
};
