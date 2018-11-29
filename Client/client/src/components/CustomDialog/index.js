import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closeDialog } from '../../actions'

const CustomDialogContainer = ({dialogTitle, dialogMessage, closeDialog }) => (
      <Dialog
        title={dialogTitle}
        actions={[
          <FlatButton
            label="OK"
            primary={true}
            onClick={closeDialog}
          />
        ]}
        modal={true}
        open={dialogMessage != null}
        onRequestClose={closeDialog}
      >
        {dialogMessage}
      </Dialog>
  )
  
  CustomDialogContainer.propTypes = {
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
  
  const CustomDialog = connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomDialogContainer)
  
  export default CustomDialog