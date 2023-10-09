import { Request, Response } from "express";

export class IndexController {
  public WelcomeApi(_req: Request, res: Response): void {
    res.status(200).json({ message: "Welcome to Goat TeamStats API" });
  }
}

const indexController = new IndexController();
export default indexController;
