import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closeDialog } from '../../actions'

const QuestionDialogContainer = ({ closeDialog }) => (
      <Dialog
        title="Shutdown requested"
        actions={[
          <FlatButton
            label="Yes"
            primary={true}
            onClick={closeDialog}
          />,
          <FlatButton
          label="No"
          primary={true}
          onClick={closeDialog}
        />
        ]}
        modal={true}
        open={apiError.length > 0}
        onRequestClose={closeDialog}
      >
        Are you sure?
      </Dialog>
  )
  
  QuestionDialogContainer.propTypes = {
    closeDialog: PropTypes.func
  }
  
  const mapStateToProps = (state) => ({
    isOn: state.delorean.isOn,
    apiError: state.delorean.apiError
  })
  
  const mapDispatchToProps = {
    closeDialog
  };
  
  const QuestionDialog = connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionDialogContainer)
  
  export default QuestionDialog