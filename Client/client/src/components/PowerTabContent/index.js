import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import pink from '@material-ui/core/colors/pink';

import RestartIcon from '@material-ui/icons/AutoRenew';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import SleepIcon from '@material-ui/icons/AirlineSeatIndividualSuite';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    margin: 10,
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
    height: 70,
    width: 70,
  },
  icon: {
    height: 50,
    width: 50,
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
    {!isOn && (<Card className={classes.card}>
      <CardActionArea onClick={postWOLRequest}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <PowerIcon className={classes.icon}/>
            </Avatar>
          }
          title="Wake up"
          subheader="Turn on the Timemachine"
        />
      </CardActionArea>
    </Card>
    )}
    {isOn && (
      <Card className={classes.card}>
        <CardActionArea onClick={postRestartRequest}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <RestartIcon className={classes.icon}/>
              </Avatar>
            }
            title="Restart"
            subheader="Restart the Timemachine"
          /></CardActionArea>
      </Card>
    )}
    {isOn && (
      <Card className={classes.card}>
        <CardActionArea onClick={postSleepRequest}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <SleepIcon className={classes.icon}/>
              </Avatar>
            }
            title="Sleep"
            subheader="Put the Timemachine to sleep"
          /></CardActionArea>
      </Card>
    )}
    {isOn && (
      <Card className={classes.card}>
        <CardActionArea onClick={postOffRequest}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <PowerIcon className={classes.icon}/>
              </Avatar>
            }
            title="Power off"
            subheader="Shutdown the Timemachine"
          /></CardActionArea>
      </Card>)}
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