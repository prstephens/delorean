import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closeDialog } from '../../actions'

const CustomDialog = ({ dialogTitle, dialogMessage, closeDialog }) => (
  <Dialog
    open={dialogMessage != null}
    onClose={closeDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {dialogMessage}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeDialog} color="primary" autoFocus>
        OK
    </Button>
    </DialogActions>
  </Dialog>
)

CustomDialog.propTypes = {
  dialogTitle: PropTypes.string,
  dialogMessage: PropTypes.string,
  closeDialog: PropTypes.func
}

const mapStateToProps = (state) => ({
  dialogTitle: state.delorean.dialogTitle,
  dialogMessage: state.delorean.dialogMessage
})

const mapDispatchToProps = {
  closeDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDialog)