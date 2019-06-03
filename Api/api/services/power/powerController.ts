import isReachable from "is-port-reachable";
import wol from "wol";
import { sendCommandReadOutput } from "../../utils/";
import config from "config";

const sshOptions = {
  host: config.get('timemachineHostname'),
  user: config.get('timemachineUsername'),
  pass: process.env.TM_PASS
};

export const isTimeMachineOn = async () => {
  let hostname = config.get('timemachineHostname');

  const result = await isReachable(3389, { host: hostname });
  
  return result;
};

export const wakeTimemachine = async () => {
  await wol.wake(config.get('timemachineMAC'), () => {});
};

export const offTimemachine = async () => {
  const cmds = [
      'shutdown /s /f /t 0'
  ];

  const result = await sendCommandReadOutput(cmds, sshOptions);
  console.log(result);
};

export const sleepTimemachine = async () => {
  const cmds = [
      'powercfg -hibernate off',
      'rundll32.exe powrprof.dll,SetSuspendState 0,1,0'
  ];

  await sendCommandReadOutput(cmds, sshOptions);
};

export const restartTimemachine = async () => {
  const cmds = [
      'shutdown /r /f /t 0'
  ];

  await sendCommandReadOutput(cmds, sshOptions);
};