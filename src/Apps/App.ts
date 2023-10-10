import { AppDataSource } from "../Configs/DBConfig";
import { ServerConfig } from "../Configs/ServerConfig";
import indexRoutes from "./Routes/IndexRoutes";
import userRoutes from "./Routes/Users/UserRoutes";
import adminRoutes from "./Routes/Admin/AdminRoutes";
import teamRoutes from "./Routes/Team/TeamRoutes";
import matchRoutes from "./Routes/Match/MatchRoutes";
import roleRoutes from "./Routes/Role/RoleRoutes";

class App extends ServerConfig {
  constructor() {
    super();
    this.Routes();
    this.InitDB();
  }

  private Routes(): void {
    this.app.use("/index", indexRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/admin", adminRoutes);
    this.app.use("/team", teamRoutes);
    this.app.use("/match", matchRoutes);
    this.app.use("/role", roleRoutes);
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
