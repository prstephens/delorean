import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closeSnackbar } from '../../actions'
import TimemachineContent from '../TimemachineContent/TimemachineContent'
import ErrorDialog  from '../Dialogs/ErrorDialog'

const App = ({ openSnackbar, snackbarMessage, closeSnackbar }) => (
  <MuiThemeProvider>
    <div>
      <AppBar title="Delorean" />
      <TimemachineContent />
      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={4000}
        onRequestClose={closeSnackbar}
      />
      <ErrorDialog />
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  openSnackbar: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  closeSnackbar: PropTypes.func
}

const mapStateToProps = (state) => ({
  openSnackbar: state.delorean.openSnackbar,
  snackbarMessage: state.delorean.snackbarMessage
})

const mapDispatchToProps = {
  closeSnackbar
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer