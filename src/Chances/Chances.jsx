import React, { Component } from "react";
import { reduxForm } from "redux-form";
import {
  getSpecialtiesByCode,
  getSpecialtiesBySubject
} from "../services/service";
import SpecResults from "../Card/SpecResults";

import "./Chances.scss";

class Chances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelRight: false,
      quota: false,
      selectedOption: "subject",
      points: "",
      subject: "",
      code: "",
      specialties: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.renderField = this.renderField.bind(this);
    this.handlePointChange = this.handlePointChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
  }

  renderInput = field => {
    return (
      <input
        type={field.type && field.type === "password" ? field.type : "text"}
        placeholder={field.placeholder}
        className={`input ${
          field.meta.touched && field.meta.error ? "input--danger" : ""
        }`}
        {...field.input}
      />
    );
  };

  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  handleSubjectChange(event) {
    this.setState({
      subject: event.target.value
    });
  }

  handlePointChange(event) {
    this.setState({
      points: event.target.value
    });
  }

  handleCodeChange(event) {
    this.setState({
      code: event.target.value
    });
  }

  toggleCheckbox() {
    this.setState({
      quota: !this.state.quota
    });
  }

  renderField() {
    if (this.state.selectedOption === "subject") {
      return <input type="text" placeholder="Предмет" />;
    } else {
      return <input type="text" placeholder="Специальность" />;
    }
  }

  handleSubmit = () => {
    this.setState({
      panelRight: true
    });
    if (this.state.selectedOption === "subject") {
      getSpecialtiesBySubject(this.state.subject, this.state.quota).then(
        data => {
          const specialties = [];
          data.data.res.map(specialty => {
            specialties.push(specialty);
          });
          this.setState({
            specialties: specialties
          });
        }
      );
    } else {
      getSpecialtiesByCode(this.state.code, this.state.quota).then(data => {
        console.log(data);
      });
    }
  };

  handleBackClick = () => {
    this.setState({
      panelRight: false
    });
  };

  render() {
    const { panelRight } = this.state;
    return (
      <div className={`Chances ${panelRight ? "right-panel-active" : ""}`}>
        <div className="Chances__form form-container">
          <div className="main-div">
            <h1>Введите все необходимые данные</h1>
            <input
              type="text"
              placeholder="Набранный балл"
              value={this.state.points}
              onChange={this.handlePointChange}
            />
            <div className="radio-wrapper">
              <label className="container">
                По предмету
                <input
                  id="subject"
                  type="radio"
                  name="type"
                  value="subject"
                  checked={this.state.selectedOption === "subject"}
                  onChange={this.handleOptionChange}
                />
                <span className="checkmark" />
              </label>
              <label className="container">
                По специальности
                <input
                  id="code"
                  type="radio"
                  name="type"
                  value="code"
                  checked={this.state.selectedOption === "code"}
                  onChange={this.handleOptionChange}
                />
                <span className="checkmark" />
              </label>
            </div>

            {this.state.selectedOption === "subject" ? (
              <input
                type="text"
                placeholder="Предмет"
                value={this.state.subject}
                onChange={this.handleSubjectChange}
              />
            ) : (
              <input
                type="text"
                placeholder="Специальность"
                value={this.state.code}
                onChange={this.handleCodeChange}
              />
            )}

            <label className="checkbox-container">
              Сельская квота
              <input type="checkbox" onChange={this.toggleCheckbox} />
              <span className="checkbox-checkmark" />
            </label>
            <button onClick={this.handleSubmit}>Узнать шансы</button>
          </div>
        </div>
        <div className="Chances__results form-container">
          <div>
            {this.state.specialties.map(specialty => {
              return <SpecResults specialty={specialty} />;
            })}
          </div>
        </div>
        <div className="Chances__overlay">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>ВНИМАНИЕ!</h1>
              <p className="Chances__paragraph">
                Предоставленные данные основаны на результатах прошлогоднего
                конкурса и не могут обеспечить 100% гарантию!
              </p>
              <button className="ghost" onClick={this.handleBackClick}>
                Назад
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Добро пожаловать!</h1>
              <p className="Chances__paragraph">
                Заполните все поля, чтобы посмотреть свои шансы! Выберите пункт
                "По специальности", если знаете на какую специальность хотите
                поступить, или "По предмету", если ещё не определились!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "ChancesForm"
})(Chances);
