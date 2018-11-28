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
    const cmd = [`ipconfig /all | findstr /R ${config.dnsAddresses[0]}`];

    const result = await sshHelper.sendCommandReadOutput(cmd, sshOptions);
    return result;
};

const toggleDns = (type) => {
    let cmds = [];

    if (type == 'set') {
        config.dnsAddresses.forEach(dnsAddress => {
            cmds.push(`netsh interface ipv4 add dnsservers ${config.adapterName} ${dnsAddress}`);
        });
    }
    else {
        cmds = [
            `netsh interface ip set dns ${config.adapterName} dhcp`
        ];
    }

    sshHelper.sendCommandReadOutput(cmds, sshOptions);
};

module.exports.isTimeMachineOn = isTimeMachineOn;
module.exports.sleepTimemachine = sleepTimemachine;
module.exports.offTimemachine = offTimemachine;
module.exports.restartTimemachine = restartTimemachine;
module.exports.toggleDns = toggleDns;
module.exports.wakeTimemachine = wakeTimemachine;
module.exports.isDnsSet = isDnsSet;