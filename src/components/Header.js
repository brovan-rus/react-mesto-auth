import React from "react";
import { Link } from "react-router-dom";

function Header({ linkText, linkTo, email, place }) {
  return (
    <header className="header page__header">
      <nav className="header__nav">
        <a className="header__logo" href="#" target="_self" />
        {(linkText || email) && (
          <div className="header__info">
            {email && <p className="header__email">{email}</p>}
            {linkText && (
              <Link
                className={`header__link ${
                  place === "main" && "header__link_place_main"
                }`}
                to={linkTo}
              >
                {linkText}
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
