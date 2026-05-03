import auth from "./modules/auth";
import health from "./modules/health";
import { handleError, handleNotFound } from "./middleware/error";
import { registerMiddleware } from "./middleware";
import { createOpenApiApp, registerOpenApiDocs } from "./openapi";

const app = createOpenApiApp();

registerMiddleware(app);

const routes = app.route("/auth", auth).route("/health", health);

routes.onError(handleError);
routes.notFound(handleNotFound);

registerOpenApiDocs(routes);

export type AppType = typeof routes;

export default routes;
