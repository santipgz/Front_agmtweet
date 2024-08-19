import React from "react";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header className="layout__navbar-nav">
      <div className="navbar__header-nav">
        <a href="#" className="navbar__title-nav">
          AGMTWEET
        </a>
      </div>

      <Nav></Nav>
    </header>
  );
};
