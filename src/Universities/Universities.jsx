import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import {
  getUniversitiesByType,
  getSpecialtyByCode,
  getUniversityByCode
} from "../services/service";

import Card from "../Card/Card";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = {
  root: {
    flexGrow: 1,
    width: "100%"
  }
};

const univerTable = {
  headers: ["Название", "Локация", "Сайт"]
};

class Universities extends Component {
  state = {
    value: 0,
    nationalUnivers: [],
    governmentUnivers: [],
    privateUnivers: [],
    aoUnivers: []
  };

  componentDidMount() {
    getUniversitiesByType("национальный").then(data => {
      const univers = [];
      data.data.res.map(univer => {
        univers.push(univer);
      });
      this.setState({
        nationalUnivers: univers
      });
    });
    getUniversitiesByType("государственный").then(data => {
      const univers = [];
      data.data.res.map(univer => {
        univers.push(univer);
      });
      this.setState({
        governmentUnivers: univers
      });
    });
    getUniversitiesByType("акционированный").then(data => {
      const univers = [];
      data.data.res.map(univer => {
        univers.push(univer);
      });
      this.setState({
        aoUnivers: univers
      });
    });
    getUniversitiesByType("частный").then(data => {
      const univers = [];
      data.data.res.map(univer => {
        univers.push(univer);
      });
      this.setState({
        privateUnivers: univers
      });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Акционированные вузы" />
            <Tab label="Национальные" />
            <Tab label="Государственные" />
            <Tab label="Частные вузы" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            {this.state.aoUnivers.map(univer => {
              return <Card uni={univer} />;
            })}
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {this.state.nationalUnivers.map(univer => {
              return <Card uni={univer} />;
            })}
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {this.state.governmentUnivers.map(univer => {
              return <Card uni={univer} />;
            })}
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {this.state.privateUnivers.map(univer => {
              return <Card uni={univer} />;
            })}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

Universities.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Universities);
