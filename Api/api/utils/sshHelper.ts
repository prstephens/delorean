import SSH from "simple-ssh";
import { logger } from "../middleware/logger";

export const sendCommandReadOutput = (cmds: string[], sshOptions: any) =>
{
    const ssh = new SSH(sshOptions);
    let data ='';

    return new Promise( (resolve, reject) => {
        cmds.forEach(cmd => {
            logger.debug('[SSH Helper] - options: ' + JSON.stringify(sshOptions));
            logger.info('[SSH Helper] - calling: ' + cmd);
            ssh.exec(cmd, {
                out: (stdout: string) => {
                    logger.info('[SSH Helper] - stdout: ' + stdout);
                    data += stdout ;
                },
                exit: (code: number) => {
                    if (code != 0) {
                        logger.error(new Error('[SSH Helper] - exit code: ' + code));
                        reject(new Error('[SSH Helper] - exit code: ' + code));
                    }
              
                    resolve(data);
                },
                err: (err: string) => {
                    ssh.end();
                    logger.error('[!] SSH Error : ', err);
                    reject(err);
                }
            }).start();
        });
    });
};