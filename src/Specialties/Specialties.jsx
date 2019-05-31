import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { getSpecialties } from "../services/service";

import SpecCard from "../Card/SpecCard";

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

class Specialties extends Component {
  state = {
    value: 0,
    mathPhys: [],
    chemBio: [],
    privateUnivers: [],
    aoUnivers: []
  };

  componentDidMount() {
    getSpecialties("Математика и Физика").then(data => {
      const specialties = [];
      data.data.res.map(specialty => {
        specialties.push(specialty);
      });
      this.setState({
        mathPhys: specialties
      });
    });
    getSpecialties("Химия и Биология").then(data => {
      const specialties = [];
      data.data.res.map(specialty => {
        specialties.push(specialty);
      });
      this.setState({
        chemBio: specialties
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
            <Tab label="Математика и Физика" />
            <Tab label="Химия и Биология" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            {this.state.mathPhys.map(specialty => {
              return <SpecCard specialty={specialty} />;
            })}
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {this.state.chemBio.map(specialty => {
              return <SpecCard specialty={specialty} />;
            })}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

Specialties.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Specialties);
