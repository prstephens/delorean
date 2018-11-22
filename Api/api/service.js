'use strict'
const config = require('./config/config.json');

let isReachable = require('is-port-reachable');
let wol = require('wol');
let SSH = require('simple-ssh');

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

    sendCommandReadOutput(cmds, () => { });
};

const offTimemachine = () => {
    const cmds = [
        'shutdown /s /f /t 0'
    ];

    sendCommandReadOutput(cmds, () => {});
};

const restartTimemachine = () => {
    const cmds = [
        'shutdown /r /f /t 0'
    ];

    sendCommandReadOutput(cmds, () => {});
};

const isDnsSet = (callback) => {
    const cmd = [`ipconfig /all | findstr /R ${config.dnsAddresses[0]}`];

    sendCommandReadOutput( cmd, (err, data) => {
        if (err) {
          console.error(err.stack);
        } 
        else {
            if (data.length > 0){
                return callback(true);
            }
            else
            {
                return callback(false);
            }
        }
      });
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
    sendCommandReadOutput(cmds, () => {});
};

// private methods
const sendCommandReadOutput = (cmds, callback) =>
{
    const ssh = new SSH({
        host: config.timemachineHostname,
        user: config.timemachineUsername,
        pass: process.env.TM_PASS
    });

    let data ='';
    let error = null;

    cmds.forEach(cmd => {
        ssh.exec(cmd, {
            out: stdout => {
                data += stdout;
            },
            exit: code => {
                if (code != 0) return callback(new Error('exit code: ' + code));
          
                return callback(error, data);
            }
        });
    });

    ssh.start();

    ssh.on('error', (err) => {
        console.log('[!] SSH Error : ', err);
        ssh.end();
       });
};

module.exports.isTimeMachineOn = isTimeMachineOn;
module.exports.sleepTimemachine = sleepTimemachine;
module.exports.offTimemachine = offTimemachine;
module.exports.restartTimemachine = restartTimemachine;
module.exports.toggleDns = toggleDns;
module.exports.wakeTimemachine = wakeTimemachine;
module.exports.isDnsSet = isDnsSet;