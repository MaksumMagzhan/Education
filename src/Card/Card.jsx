import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import emptyImg from "../assets/images/empty.png";
import "./Card.scss";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: ""
    };

    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  componentDidMount() {
    if (this.props.uni) {
      this.setState({
        img: this.props.uni.img
      });
    }
  }

  handleMoreClick() {
    if (this.props.history) {
      this.props.history.push(`/university/${this.props.uni.code}`);
    }
  }

  render() {
    const { uni } = this.props;
    return (
      <div className="Card">
        {this.state.img ? (
          <img
            className="Card__image"
            src={this.state.img}
            width="300"
            height="300"
            alt="univer"
          />
        ) : (
          <img
            className="Card__image"
            src={emptyImg}
            width="300"
            height="300"
            alt="univer"
          />
        )}
        <div className="Card__body">
          <p className="Card__title">{uni ? uni.name : "Some Text"}</p>
          <a className="Card__subtitle" href={uni ? uni.site : "site"}>
            {uni ? uni.site : "site"}
          </a>
          <p className="Card__description">
            {uni ? uni.description : "Some text"}
          </p>
          <button className="Card__button" onClick={this.handleMoreClick}>
            Подробнее
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
