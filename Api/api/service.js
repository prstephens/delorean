'use strict'
const config = require('./config/config.json');

let isReachable = require('is-port-reachable');
let wol = require('wol');
let rexec = require('remote-exec');

const isTimeMachineOn = () => {
    return isReachable(3389, { host: config.timemachineHostname }).then(reachable => { return reachable; });
};

const wakeTimemachine = () => {
    wol.wake(config.timemachineMAC, function (err, res) {
        console.log(res);
    });
};

const sleepTimemachine = () => {
    const cmds = [
        'powercfg -hibernate off',
        'rundll32.exe powrprof.dll,SetSuspendState 0,1,0'
    ];

    callRemoteCommand(cmds);
};

const offTimemachine = () => {
    const cmds = [
        'shutdown /s /f /t 0'
    ];

    callRemoteCommand(cmds);
};

const restartTimemachine = () => {
    const cmds = [
        'shutdown /r /f /t 0'
    ];

    callRemoteCommand(cmds);
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
    callRemoteCommand(cmds);
};

const callRemoteCommand = (cmds) => {

    const hosts = [
        config.timemachineHostname
    ];

    const connection_options = {
        port: 22,
        username: config.timemachineUsername,
        password: process.env.TM_PASS,
    };

    rexec(hosts, cmds, connection_options);
};

module.exports.isTimeMachineOn = isTimeMachineOn;
module.exports.sleepTimemachine = sleepTimemachine;
module.exports.offTimemachine = offTimemachine;
module.exports.restartTimemachine = restartTimemachine;
module.exports.toggleDns = toggleDns;
module.exports.wakeTimemachine = wakeTimemachine;