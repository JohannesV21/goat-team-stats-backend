import { AppDataSource } from "../Configs/DBConfig";
import { ServerConfig } from "../Configs/ServerConfig";
import indexRoutes from "./Routes/IndexRoutes";

class App extends ServerConfig {
  constructor() {
    super();
    this.Routes();
    this.InitDB();
  }

  private Routes(): void {
    this.app.use("/index", indexRoutes);
  }

  // Database initialization
  private InitDB(): void {
    AppDataSource.initialize()
      .then(() => console.log("Database successfully conected"))
      .catch((err) => console.error(err));
  }
}

const APP = new App();
APP.Start();
