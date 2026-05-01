import { Hono } from "hono";
import route from "./route";

const app = new Hono().basePath("/api/v1").route("/", route);

export default app;
