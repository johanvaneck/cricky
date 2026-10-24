import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "../server.js";
import { t as __exportAll } from "./routes-BCW7N6iR.js";
import { HeadContent, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
// src/routes/__root.tsx
var Route$1 = createRootRoute({
	head: () => ({ meta: [{ title: "Cricky — Cricket scoring" }, {
		name: "description",
		content: "Protea-themed cricket scoring"
	}] }),
	component: () => /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Scripts, {})] })]
	})
});
// node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
// src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-Bna-n5uc.js");
var load = createServerFn({ method: "GET" }).handler(createSsrRpc("3814e0a9d7c3d0cde0c9bca5fa5ada164f541069e9601e37f9836155659cee02"));
var Route = createFileRoute("/")({
	loader: () => load(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
// src/routeTree.gen.ts
var rootRouteChildren = { IndexRoute: Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
// src/router.tsx
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultPreload: "intent"
	});
}
export { getRouter, Route as n, createSsrRpc as r, router_exports as t };
