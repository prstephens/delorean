import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
  }
});

const postWOLRequest = (event) => {
  event.preventDefault()
  store.dispatch({ type: 'POST_TIMEMACHINE_ON' })
}

const postSleepRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_SLEEP' })
}

const postRestartRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_RESTART' })
}

const postOffRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_OFF' })
}

const PowerTabContent = ({ isOn, classes }) => (
  <div>
    <Button className={classes.button} variant="contained" color="secondary" disabled={isOn} fullWidth={true} onClick={postWOLRequest}>
      Wake up
        </Button>
    <br />
    <Button className={classes.button} variant="contained" color="secondary" disabled={!isOn} fullWidth={true} onClick={postSleepRequest}>
      Sleep
        </Button>
    <br />
    <Button className={classes.button} variant="contained" color="secondary" disabled={!isOn} fullWidth={true} onClick={postRestartRequest}>
      Restart
        </Button>
    <br />
    <Button className={classes.button} variant="contained" color="secondary" disabled={!isOn} fullWidth={true} onClick={postOffRequest}>
      Off
        </Button>
  </div>
)

PowerTabContent.propTypes = {
  isOn: PropTypes.bool,
  classes: PropTypes.object
}

const mapStateToProps = (state) => ({
  isOn: state.delorean.isOn
})

export default withStyles(styles)(connect(mapStateToProps)(PowerTabContent))