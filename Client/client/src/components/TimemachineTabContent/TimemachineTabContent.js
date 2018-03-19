import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'
import ErrorDialog  from '../Dialogs/ErrorDialog'

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

const postOffRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_OFF' })
}

const TabContent = ({ isOn }) => (
  <div>
    <RaisedButton style={style} fullWidth={true} onClick={postWOLRequest} disabled={isOn} label="Wake up" secondary={true} />
    <br />
    <RaisedButton style={style} fullWidth={true} onClick={postSleepRequest} disabled={!isOn} label="Sleep" secondary={true} />
    <br />
    <RaisedButton style={style} fullWidth={true} onClick={postOffRequest} disabled={!isOn} label="Off" secondary={true} />
    <ErrorDialog />
  </div>
)

TabContent.propTypes = {
  isOn: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isOn: state.delorean.isOn
})

const mapDispatchToProps = {
};

const TimemachineTabContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContent)

export default TimemachineTabContent