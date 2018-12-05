import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import { closeSnackbar } from '../../actions'

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

const AppSnackbar = ({ openSnackbar, snackbarMessage, closeSnackbar, classes }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={openSnackbar}
    autoHideDuration={6000}
    onClose={closeSnackbar}
  >
    <SnackbarContent
      className={classes.success}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <CheckCircleIcon className={classes.icon}/>
          {snackbarMessage}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={closeSnackbar}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  </Snackbar>
)

AppSnackbar.propTypes = {
  openSnackbar: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  closeSnackbar: PropTypes.func,
  classes: PropTypes.object
}

const mapStateToProps = (state) => ({
  openSnackbar: state.delorean.openSnackbar,
  snackbarMessage: state.delorean.snackbarMessage
})

const mapDispatchToProps = {
  closeSnackbar
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppSnackbar))