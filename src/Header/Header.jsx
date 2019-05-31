import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="Header borderXwidth">
        <Link to="/universities" className="Header__link">
          Университеты
        </Link>
        <Link to="/specialties" className="Header__link">
          Специальности
        </Link>
        <Link to="/chances" className="Header__link">
          Шансы
        </Link>
        <Link to="/news" className="Header__link">
          Новости
        </Link>
      </div>
    );
  }
}

export default Header;
