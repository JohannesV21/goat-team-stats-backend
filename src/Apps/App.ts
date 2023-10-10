import { AppDataSource } from "../Configs/DBConfig";
import { ServerConfig } from "../Configs/ServerConfig";
import indexRoutes from "./Routes/IndexRoutes";
import userRoutes from "./Routes/Users/UserRoutes";

class App extends ServerConfig {
  constructor() {
    super();
    this.Routes();
    this.InitDB();
  }

  private Routes(): void {
    this.app.use("/index", indexRoutes);
    this.app.use("/users", userRoutes);
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
