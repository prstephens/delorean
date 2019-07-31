import { sendCommandReadOutput } from "../../utils";
import config from "config";
import { logger } from "../../middleware/logger";

const sshOptions = {
  host: config.get('timemachineHostname'),
  user: config.get('timemachineUsername'),
  pass: process.env.TM_PASS
};

export const getDnsProvider = async () => {
  let dnsProvider = '';
  let ip = '';

  return new Promise( (resolve, reject) => {
      callDnsFinder().then((data: any) => {
          if (data.length > 0) {

              ip = data.substr(data.indexOf(':') + 1, data.length).trim();
              dnsProvider = getDnsProviderByIp(config.get('dnsProvider'), ip);

              resolve(dnsProvider);
          }
      }).catch((err: any) => {
          logger.error(err.stack);
      });
  });
};

export const setDns = async (provider: string) => {
  let cmds: any = [];

  const dnsProvider = getDnsServersByProvider(config.get('dnsProvider'), provider);

  resetDns();

  dnsProvider[0].servers.forEach((dnsAddress: string) => {
      cmds.push(`netsh interface ipv4 add dnsservers ${config.get('adapterName')} ${dnsAddress}`);
  });

  await sendCommandReadOutput(cmds, sshOptions);
};

export const resetDns = async () => {
  let cmds = [`netsh interface ip set dns ${config.get('adapterName')} dhcp`];
  await sendCommandReadOutput(cmds, sshOptions);
};

// PRIVATE FUNCTIONS

const callDnsFinder = async () => {
  const cmd = ['echo | nslookup | findstr Address'];
  return await sendCommandReadOutput(cmd, sshOptions);
};

const getDnsServersByProvider = (providerList: any[], provider: string) => {
  return providerList.filter(
      function (providerList) {
          return providerList.name == provider
      }
  );
};

const getDnsProviderByIp = (providerList: any[], ip: string) => {
  return providerList.filter(
      function (providerList) {
          return providerList.servers[0] == ip
      }
  )[0].name;
};