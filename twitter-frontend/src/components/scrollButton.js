import React,{ PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import scrollUp from '../assets/scrollUp.svg';
import home from '../assets/home.svg';

const styles = theme => ({
  buttonDown:{
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
  buttonTop:{
    margin: theme.spacing.unit,
    position: 'fixed',
    top: '10px',
    left: '10px',
  }
})
class ScrollButton extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      intervalId: 0
    };
  }

  scrollStep = () => {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop = () => {
    if(this.props.home !== undefined) {
      this.props.getTimeline(); //call parent function
    }
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    const { classes } = this.props;
    if (this.props.home === undefined) {
      return (
        <Button variant="contained" className={classes.buttonDown} onClick={ () => { this.scrollToTop(); }}>
          <img src={scrollUp} alt="scrollup" width="30px" height="30px"/>
        </Button>
      )
    } else {
        return (
          <Button variant="contained" className={classes.buttonTop} onClick={ () => { this.scrollToTop(); }}>
            <img src={home} alt="home" width="30px" height="30px"/>
          </Button>
        )
      }
    }
  }

ScrollButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollButton);
