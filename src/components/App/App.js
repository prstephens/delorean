import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import AppTabs from '../AppTabs/AppTabs'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closeSnackbar } from '../../actions'

const App = ({ openSnackbar, snackbarMessage, closeSnackbar }) => (
  <MuiThemeProvider>
    <div>
      <AppBar showMenuIconButton={false} title="Delorean" />
      <AppTabs />
      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={4000}
        onRequestClose={closeSnackbar}
      />
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