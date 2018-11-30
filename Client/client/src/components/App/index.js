import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import AppSnackbar from '../AppSnackbar'
import TimemachineContent from '../TimemachineContent'
import CustomDialog  from '../CustomDialog'

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar title="Delorean" />
      <TimemachineContent />
      <AppSnackbar/>
      <CustomDialog />
    </div>
  </MuiThemeProvider>
)

export default App