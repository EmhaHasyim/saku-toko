import auth from "./modules/auth";
import health from "./modules/health";
import { createOpenApiApp, registerOpenApiDocs } from "./openapi";

const app = createOpenApiApp();

const routes = app.route("/auth", auth).route("/health", health);

registerOpenApiDocs(routes);

export type AppType = typeof routes;

export default routes;
