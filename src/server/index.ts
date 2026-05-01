import { Hono } from "hono";
import indexRoute from "./indexRoute";

const app = new Hono().basePath("/api/v1").route("/", indexRoute);

export default app;
