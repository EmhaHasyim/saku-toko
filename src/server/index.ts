import { handleError, handleNotFound } from "@server/middleware/error";
import { registerMiddleware } from "@server/middleware";
import auth from "@server/modules/auth";
import health from "@server/modules/health";
import { createOpenApiApp, registerOpenApiDocs } from "@server/openapi";

const app = registerMiddleware(createOpenApiApp());

const routes = app.route("/auth", auth).route("/health", health);

app.onError(handleError);
app.notFound(handleNotFound);

registerOpenApiDocs(app);

export type AppType = typeof routes;

export default app;
