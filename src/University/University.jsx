import React, { Component } from "react";
import emptyImg from "../assets/images/empty.png";

import { getUniversityByCode } from "../services/service";

import "./University.scss";

class University extends Component {
  state = {
    img: "",
    univerCode: "",
    description: "",
    univer: null,
    specialties: []
  };

  componentDidMount() {
    this.setState({
      univerCode: this.props.location.pathname.substr(12, 15)
    });

    if (this.props.uni && this.props.uni.img) {
    }
    const specialties = [];

    getUniversityByCode(this.props.location.pathname.substr(12, 15)).then(
      data => {
        this.setState({
          univer: data.data
        });
      }
    );

    if (this.state.univer) {
      this.state.univer.specialties.map(specialty => {
        specialties.push(specialty);
      });

      this.setState({
        specialties: specialties
      });

      this.setState({
        img: this.state.univer.img
      });

      console.log(this.state.univer);
    }
  }
  render() {
    return (
      <div className="University">
        <h1>{this.state.univer ? this.state.univer.name : "Some Title"}</h1>
        <div className="University__content">
          {this.state.univer && this.state.univer.img ? (
            <img
              className="University__image"
              src={this.state.univer.img}
              width="300"
              height="300"
              alt="univer"
            />
          ) : (
            <img
              className="University__image"
              src={emptyImg}
              width="300"
              height="300"
              alt="univer"
            />
          )}
          <p className="University__description">
            {this.state.univer ? this.state.univer.description : "Some Title"}
          </p>
        </div>
        <div className="University__table" />
      </div>
    );
  }
}

export default University;
