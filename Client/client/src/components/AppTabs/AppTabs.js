import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import TimemachineTabContent from '../TimemachineTabContent/TimemachineTabContent';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10,
  },
};

export default class AppTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = { slideIndex: 0 };
  };

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Timemachine" value={0} />
          <Tab label="Media Centre" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={styles.slide}>
            <TimemachineTabContent />
          </div>
          <div style={styles.slide}>
          </div>
        </SwipeableViews>
      </div>
    );
  };
}