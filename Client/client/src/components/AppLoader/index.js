import React from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

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

const AppLoader = ({classes}) => (
        <div>
          <div className={classes.progressWrapper}>
            <CircularProgress className={classes.progress} size={80} color="secondary" />
          </div>
          <Typography align="center" variant="body2" color="inherit" className={classes.grow}>
            Starting time circuits...
            </Typography>
        </div>
)

AppLoader.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(AppLoader)