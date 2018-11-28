'use strict'
const SSH = require('simple-ssh');

const sendCommandReadOutput = (cmds, options) =>
{
    const ssh = new SSH(options);
    let data ='';

    return new Promise( (resolve, reject) => {
        cmds.forEach(cmd => {
            ssh.exec(cmd, {
                out: stdout => {
                    data += stdout;
                },
                exit: code => {
                    if (code != 0) {
                        console.log(new Error('exit code: ' + code));
                        reject(new Error('exit code: ' + code));
                    }
              
                    resolve(data);
                },
                error: err => {
                    ssh.end();
                    console.log('[!] SSH Error : ', err);
                    reject(err);
                }
            }).start();
        });
    });
};

module.exports.sendCommandReadOutput = sendCommandReadOutput;