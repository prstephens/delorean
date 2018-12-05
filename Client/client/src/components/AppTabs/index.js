import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PowerTabContent from '../PowerTabContent'
import DnsTabContent from '../DnsTabContent'

class AppTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <Tabs value={this.state.value}
          onChange={this.handleChange}
          fullWidth>
          <Tab label="Power" />
          <Tab label="DNS" />
          <Tab label="Message" />
        </Tabs>
          {value === 0 && <PowerTabContent/>}
          {value === 1 && <DnsTabContent/>}
      </div>
    );
  }
}

export default AppTabs;