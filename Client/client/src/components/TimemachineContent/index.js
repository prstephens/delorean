import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'

const style = {
  margin: '10px 0px 10px 0px'
}

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

const Content = ({ isOn, isDnsSet }) => (
  <div>
    <RaisedButton style={style} fullWidth={true} onClick={postWOLRequest} disabled={isOn} label="Wake up" secondary={true} />
    <br />
    <RaisedButton style={style} fullWidth={true} onClick={postSleepRequest} disabled={!isOn} label="Sleep" secondary={true} />
    <br />
    <RaisedButton style={style} fullWidth={true} onClick={postRestartRequest} disabled={!isOn} label="Restart" secondary={true} />
    <br />
    <RaisedButton style={style} fullWidth={true} onClick={postOffRequest} disabled={!isOn} label="Off" secondary={true} />
    <br />
    <RaisedButton style={style} fullWidth={true} onClick={postSetDNSRequest} disabled={!(isOn && !isDnsSet)} label="Set DNS" secondary={true} />
    <br />
    <RaisedButton style={style} fullWidth={true} onClick={postResetDNSRequest} disabled={!(isOn && isDnsSet)} label="Reset DNS" secondary={true} />
  </div>
)

Content.propTypes = {
  isOn: PropTypes.bool,
  isDnsSet: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isOn: state.delorean.isOn,
  isDnsSet: state.delorean.isDnsSet
})

const mapDispatchToProps = {
};

const TimemachineContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)

export default TimemachineContent