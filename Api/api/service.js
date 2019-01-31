'use strict'
const config = require('./config/config.json');
const sshHelper = require('./sshHelper.js');

const isReachable = require('is-port-reachable');
const wol = require('wol');

const sshOptions = {
    host: config.timemachineHostname,
    user: config.timemachineUsername,
    pass: process.env.TM_PASS
};

const isTimeMachineOn = () => {
    return isReachable(3389, { host: config.timemachineHostname }).then(reachable => { return reachable; });
};

const wakeTimemachine = () => {
    wol.wake(config.timemachineMAC, (err, res) => {
        console.log(res);
    });
};

const sleepTimemachine = () => {
    const cmds = [
        'powercfg -hibernate off',
        'rundll32.exe powrprof.dll,SetSuspendState 0,1,0'
    ];

    sshHelper.sendCommandReadOutput(cmds, sshOptions);
};

const offTimemachine = () => {
    const cmds = [
        'shutdown /s /f /t 0'
    ];

    sshHelper.sendCommandReadOutput(cmds, sshOptions);
};

const restartTimemachine = () => {
    const cmds = [
        'shutdown /r /f /t 0'
    ];

    sshHelper.sendCommandReadOutput(cmds, sshOptions);
};

const isDnsSet = async () => {
    const dnsProviders = config.dnsProvider;
    let cmds = [];
    let serverStr = '';

    dnsProviders.forEach(provider => {
        serverStr += provider.servers[0] + ' ';
    });

    cmds.push('ipconfig /all | findstr /R \"' + serverStr + '\"');

    console.log(cmds);
    return await sshHelper.sendCommandReadOutput(cmds, sshOptions);
};

const getDnsProvider = () => {
    let dnsProvider = '';
    let ip = '';

    return new Promise( (resolve, reject) => {
        callDnsFinder().then(data => {
            if (data.length > 0) {

                ip = data.substr(data.indexOf(':') + 1, data.length).trim();
                dnsProvider = getDnsProviderByIp(config.dnsProvider, ip);

                resolve(dnsProvider);
            }
        }).catch(err => {
            console.error(err.stack);
        });
    });
};

const setDns = (provider) => {
    let cmds = [];

    const dnsProvider = getDnsServersByProvider(config.dnsProvider, provider);

    resetDns();

    dnsProvider[0].servers.forEach(dnsAddress => {
        cmds.push(`netsh interface ipv4 add dnsservers ${config.adapterName} ${dnsAddress}`);
    });

    sshHelper.sendCommandReadOutput(cmds, sshOptions);
};

const resetDns = () => {
    let cmds = [`netsh interface ip set dns ${config.adapterName} dhcp`];
    sshHelper.sendCommandReadOutput(cmds, sshOptions);
};

// Private functions

const callDnsFinder = async () => {
    const cmd = ['ipconfig /all | findstr /R Servers'];
    return await sshHelper.sendCommandReadOutput(cmd, sshOptions);
};

const getDnsServersByProvider = (providerList, provider) => {
    return providerList.filter(
        function (providerList) {
            return providerList.name == provider
        }
    );
};

const getDnsProviderByIp = (providerList, ip) => {
    return providerList.filter(
        function (providerList) {
            return providerList.servers[0] == ip
        }
    )[0].name;
};

module.exports.isTimeMachineOn = isTimeMachineOn;
module.exports.sleepTimemachine = sleepTimemachine;
module.exports.offTimemachine = offTimemachine;
module.exports.restartTimemachine = restartTimemachine;
module.exports.wakeTimemachine = wakeTimemachine;
module.exports.isDnsSet = isDnsSet;
module.exports.setDns = setDns;
module.exports.resetDns = resetDns;
module.exports.getDnsProvider = getDnsProvider;