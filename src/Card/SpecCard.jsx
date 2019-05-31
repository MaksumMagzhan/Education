import React, { Component } from "react";

import emptyImg from "../assets/images/empty.png";
import "./Card.scss";

class SpecCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: ""
    };
  }

  render() {
    const { specialty } = this.props;
    return (
      <div className="Card">
        {this.state.img ? (
          <img
            className="Card__image"
            src={this.state.img}
            width="300"
            height="300"
            alt="specialty"
          />
        ) : (
          <img
            className="Card__image"
            src={emptyImg}
            width="300"
            height="300"
            alt="specialty"
          />
        )}
        <div className="Card__body">
          <p className="Card__title">
            {specialty ? specialty.name : "Some Text"}
          </p>
          <p className="Card__subtitle">
            {specialty ? specialty.code : "code"}
          </p>
          <p className="Card__description">
            {specialty ? specialty.short_desc : "Some text"}
          </p>
          <button className="Card__button">Подробнее</button>
        </div>
      </div>
    );
  }
}

export default SpecCard;
