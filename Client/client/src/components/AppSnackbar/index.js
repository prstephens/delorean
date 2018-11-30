import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closeSnackbar } from '../../actions'

const AppSnackbar = ({ openSnackbar, snackbarMessage, closeSnackbar }) => (
      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={4000}
        onRequestClose={closeSnackbar}
      />
)

AppSnackbar.propTypes = {
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

export default  connect(mapStateToProps, mapDispatchToProps)(AppSnackbar)