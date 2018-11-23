'use strict'
const SSH = require('simple-ssh');

const sendCommandReadOutput = (cmds, options, callback) =>
{
    const ssh = new SSH(options);

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

module.exports.sendCommandReadOutput = sendCommandReadOutput;