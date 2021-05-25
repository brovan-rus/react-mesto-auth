import React from "react";
import { Link } from "react-router-dom";

function Header({ linkText, linkTo, email }) {
  return (
    <header className="header page__header">
      <nav className="header__nav">
        <a className="header__logo" href="#" target="_self" />
        {(linkText || email) && (
          <div className="header__info">
            {email && <p className="header__email">{email}</p>}
            {linkText && (
              <Link className="header__link" to={linkTo}>
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
