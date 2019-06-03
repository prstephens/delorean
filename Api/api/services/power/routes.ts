import { Request, Response } from "express";
import { isTimeMachineOn, wakeTimemachine, offTimemachine, sleepTimemachine, restartTimemachine } from "./powerController";

export default [
  {
    path: "/timemachine/ison",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const isOn = await isTimeMachineOn();
        res.status(200).json({ ison: isOn });
      }
    ]
  },
  {
    path: "/timemachine/on",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        await wakeTimemachine();
        res.status(200).json({ message: 'Wake on Lan requested' });
      }
    ]
  },
  {
    path: "/timemachine/off",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        await offTimemachine();
        res.status(200).json({ message: 'Shutdown requested' });
      }
    ]
  },
  {
    path: "/timemachine/sleep",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        await sleepTimemachine();
        res.status(200).json({ message: 'Sleep requested' });
      }
    ]
  },
  {
    path: "/timemachine/restart",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        await restartTimemachine();
        res.status(200).json({ message: 'Restart requested' });
      }
    ]
  }
];