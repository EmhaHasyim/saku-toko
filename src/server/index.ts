import { Hono } from "hono";
import routes from "./routes";

const app = new Hono().basePath("/api/v1").route("/", routes);

export default app;
