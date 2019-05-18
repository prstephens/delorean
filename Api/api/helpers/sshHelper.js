'use strict'
const SSH = require('simple-ssh');
const log = require('../logger');

const sendCommandReadOutput = (cmds, options) =>
{
    const ssh = new SSH(options);
    let data ='';

    return new Promise( (resolve, reject) => {
        cmds.forEach(cmd => {
            log.info('[SSH Helper] - calling: ' + cmd);
            ssh.exec(cmd, {
                out: stdout => {
                    log.info('[SSH Helper] - stdout: ' + stdout);
                    data += Strings.orEmpty( stdout );
                },
                exit: code => {
                    if (code != 0) {
                        log.error(new Error('[SSH Helper] - exit code: ' + code));
                        reject(new Error('[SSH Helper] - exit code: ' + code));
                    }
              
                    resolve(data);
                },
                err: err => {
                    ssh.end();
                    log.error('[!] SSH Error : ', err);
                    reject(err);
                }
            }).start();
        });
    });
};

const Strings = {};
Strings.orEmpty = entity => {
    return entity || "";
};

module.exports.sendCommandReadOutput = sendCommandReadOutput;