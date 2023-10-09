import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import moment from "moment";
import consoleStamp from "console-stamp";
import {
  consoleTimeFormat,
  morganDateFormat,
  morganDebugFormat,
} from "./GlobalVariablesx";

export abstract class ServerConfig {
  protected app: Application = express();

  constructor() {
    this.Config();
  }

  private Config(): void {
    dotenv.config();
    //--- Debug
    morgan.token("customDate", (req, res) => moment().format(morganDateFormat));
    consoleStamp(console, { format: consoleTimeFormat });
    this.app.use(morgan(morganDebugFormat));
    //---

    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.set("port", process.env.PORT || 8000);
  }

  public Start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server listen on port ${this.app.get("port")}`);
    });
  }
}
