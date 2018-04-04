import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import AppSnackbar from '../AppSnackbar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TimemachineContent from '../TimemachineContent'
import ErrorDialog  from '../ErrorDialog'

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar title="Delorean" />
      <TimemachineContent />
      <AppSnackbar/>
      <ErrorDialog />
    </div>
  </MuiThemeProvider>
)

export default App