import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import withRoot from '../../withRoot';
import AppSnackbar from '../AppSnackbar'
import CustomDialog from '../CustomDialog'
import AppTabs from '../AppTabs'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
};

const App = (classes) => (
  <div className={classes.root}>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Delorean
          </Typography>
      </Toolbar>
    </AppBar>
    <AppTabs />
    <AppSnackbar />
    <CustomDialog />
  </div>
)

App.propTypes = {
  classes: PropTypes.object
}

export default withRoot(withStyles(styles)(App))