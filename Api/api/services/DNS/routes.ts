import { Request, Response } from "express";
import { getDnsProvider, setDns, resetDns} from "./dnsController";

export default [
  {
    path: "/timemachine/dns/which",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const providor = await getDnsProvider();
        res.status(200).json({ whichdns: providor });
      }
    ]
  },
  {
    path: "/timemachine/dns/set/:provider",
    method: "post",
    handler: [
      async ({ params }: Request, res: Response) => {
        const providerResult = await setDns(params.provider);
        res.status(200).json({ message: 'DNS Override requested' });
      }
    ]
  },
  {
    path: "/timemachine/dns/reset",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const providerResult = await resetDns();
        res.status(200).json({ message: 'DNS Reset requested' });
      }
    ]
  },
  {
    path: "/timemachine/dns/which",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const providor = await getDnsProvider();
        res.status(200).json({ whichdns: providor });
      }
    ]
  },
];