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

const postSetDNSRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_SETDNS' })
  store.dispatch({ type: 'GET_IS_DNSSET' })
}

const postResetDNSRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_RESETDNS' })
  store.dispatch({ type: 'GET_IS_DNSSET' })
}

const DnsTabContent = ({ isOn, isDnsSet, classes }) => (
  <div>
    <Button className={classes.button} variant="contained" color="secondary" disabled={!(isOn && !isDnsSet)} fullWidth={true} onClick={postSetDNSRequest}>
      Set DNS
        </Button>
    <br />
    <Button className={classes.button} variant="contained" color="secondary" disabled={!(isOn && isDnsSet)} fullWidth={true} onClick={postResetDNSRequest}>
      Reset DNS
        </Button>
  </div>
)

DnsTabContent.propTypes = {
  isOn: PropTypes.bool,
  isDnsSet: PropTypes.bool,
  classes: PropTypes.object
}

const mapStateToProps = (state) => ({
  isOn: state.delorean.isOn,
  isDnsSet: state.delorean.isDnsSet
})

export default withStyles(styles)(connect(mapStateToProps)(DnsTabContent))