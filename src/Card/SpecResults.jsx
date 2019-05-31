import React, { Component } from "react";

import emptyImg from "../assets/images/empty.png";
import "./Card.scss";

class SpecResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: ""
    };
  }

  render() {
    const { specialty } = this.props;
    return (
      <div className="Result__card">
        <div className="Card__body">
          <p className="Card__title">
            {specialty ? specialty.name : "Some Text"}
          </p>
          <p className="Card__subtitle">
            Код: {specialty ? specialty.code : "code"}
          </p>
          <div className="Card__grid">
            <p>Медиана: {specialty ? specialty.medianAll : "Mediana"}</p>
            <p>Средний проходной: {specialty ? specialty.avgAll : "Average"}</p>
            <p>
              Минимальный проходной:{" "}
              {specialty ? specialty.minimalAll : "Minimal"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SpecResults;
