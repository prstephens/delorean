import React from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import withRoot from '../../withRoot';
import AppSnackbar from '../AppSnackbar'
import CustomDialog from '../CustomDialog'
import AppTabs from '../AppTabs'
import store from '../../store'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  progressWrapper: {
    justifyContent: 'center',
    display: 'flex'
  },
  progress: {
    marginTop: theme.spacing.unit * 10
  },
});

class App extends React.Component {

  componentDidMount() {
    store.dispatch({ type: 'GET_IS_DNSSET' })
    store.dispatch({ type: 'GET_IS_TIMEMACHINE_ON' })
  }

  render() {
    const { classes, loading } = this.props

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress className={classes.progress} size={80} color="secondary" />
        </div>
      )
    }

    return (
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
  }
}

const mapStateToProps = (state) => ({
  loading: state.delorean.loading
})

App.propTypes = {
  classes: PropTypes.object,
  loading: PropTypes.bool
}

export default withRoot(withStyles(styles)(connect(mapStateToProps)(App)))