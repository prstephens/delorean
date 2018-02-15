import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closeDialog } from '../../actions'

const ErrorDialogContainer = ({ dialogErrorMessage, closeDialog }) => (
      <Dialog
        title="Oopsy, something went bang!"
        actions={[
          <FlatButton
            label="OK"
            primary={true}
            onClick={closeDialog}
          />
        ]}
        modal={true}
        open={dialogErrorMessage != null}
        onRequestClose={closeDialog}
      >
        {dialogErrorMessage}
      </Dialog>
  )
  
  ErrorDialogContainer.propTypes = {
    dialogErrorMessage: PropTypes.string,
    closeDialog: PropTypes.func
  }
  
  const mapStateToProps = (state) => ({
    isOn: state.delorean.isOn,
    dialogErrorMessage: state.delorean.dialogErrorMessage
  })
  
  const mapDispatchToProps = {
    closeDialog
  };
  
  const ErrorDialog = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ErrorDialogContainer)
  
  export default ErrorDialog