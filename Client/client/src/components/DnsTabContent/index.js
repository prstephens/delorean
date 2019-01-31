import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

import DNSIcon from '@material-ui/icons/CloudQueue';
import ComputerIcon from '@material-ui/icons/DesktopAccessDisabled';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    margin: 10,
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
    height: 70,
    width: 70,
  },
  dnsSetAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
    height: 70,
    width: 70,
  },
  dnsResetAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: orange[500],
    height: 70,
    width: 70,
  },
  icon: {
    height: 50,
    width: 50,
  },
  computericon: {
    height: 70,
    width: 70,
  },

});

const postSetCloudflareDNSRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_SETDNS', provider: 'Cloudflare' })
  store.dispatch({ type: 'GET_WHICH_DNS' })

}

const postSetOpenDNSRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_SETDNS', provider: 'OpenDNS' })
  store.dispatch({ type: 'GET_WHICH_DNS' })

}

const postResetDNSRequest = (event) => {
  event.preventDefault();
  store.dispatch({ type: 'POST_TIMEMACHINE_RESETDNS' })
}

const DnsTabContent = ({ isOn, dnsProvider, classes }) => (
  <div>
    {!isOn && (<Card className={classes.card}>
      <CardHeader
        avatar={
          <ComputerIcon className={classes.computericon} />
        }
        title="Timemachine is off!"
        subheader="The Computer seems to be off. Please wake it up using the option in the Power tab"
      />
    </Card>
    )}
    {isOn && (<Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.dnsSetAvatar}>
            <DNSIcon className={classes.icon} />
          </Avatar>
        }
        title="DNS has been set"
        subheader={dnsProvider}
      />
    </Card>
    )}
    {isOn && (<Card className={classes.card}>
      <CardActionArea onClick={postSetOpenDNSRequest}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <DNSIcon className={classes.icon} />
            </Avatar>
          }
          title="OpenDNS"
          subheader="Sets OpenDNS IP addresses to the adapter"
        />
      </CardActionArea>
    </Card>
    )}
    {isOn && (<Card className={classes.card}>
      <CardActionArea onClick={postSetCloudflareDNSRequest}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <DNSIcon className={classes.icon} />
            </Avatar>
          }
          title="Cloudflare"
          subheader="Sets Cloudflare IP addresses to the adapter"
        />
      </CardActionArea>
    </Card>
    )}
    {isOn && (<Card className={classes.card}>
      <CardActionArea onClick={postResetDNSRequest}>
        <CardHeader
          avatar={
            <Avatar className={classes.dnsResetAvatar}>
              <DNSIcon className={classes.icon} />
            </Avatar>
          }
          title="Reset DNS"
          subheader="Reset the DNS servers to ISP defaults"
        />
      </CardActionArea>
    </Card>
    )}
  </div>
)

DnsTabContent.propTypes = {
  isOn: PropTypes.bool,
  dnsProvider: PropTypes.string,
  classes: PropTypes.object
}

const mapStateToProps = (state) => ({
  isOn: state.delorean.isOn,
  dnsProvider: state.delorean.dnsProvider
})

export default withStyles(styles)(connect(mapStateToProps)(DnsTabContent))