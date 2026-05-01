import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { Suspense } from "solid-js";
import { HydrationScript } from "solid-js/web";

import styleCss from "../styles.css?url";

const siteUrl = "https://saku-toko.xorex859-27a.workers.dev";

export const Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{
				title: "Saku Toko - POS UMKM Gratis dan Open Source",
			},
			{
				name: "description",
				content:
					"Saku Toko adalah aplikasi kasir POS gratis dan open source untuk UMKM, toko kecil, warung, dan usaha rumahan.",
			},
			{
				name: "robots",
				content: "index, follow",
			},
			{
				property: "og:title",
				content: "Saku Toko - POS UMKM Gratis dan Open Source",
			},
			{
				property: "og:description",
				content:
					"Aplikasi kasir sederhana, gratis, dan open source untuk membantu UMKM mengelola transaksi penjualan.",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:url",
				content: siteUrl,
			},
			{
				property: "og:image",
				content: `${siteUrl}/og-image.avif`,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: styleCss,
			},
			{
				rel: "canonical",
				href: siteUrl,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
		],
	}),
	shellComponent: RootComponent,
});

function RootComponent() {
	return (
		<html lang="id">
			<head>
				<HydrationScript />
				<HeadContent />
			</head>
			<body>
				<Suspense>
					<Outlet />
					{import.meta.env.DEV && <TanStackRouterDevtools />}
				</Suspense>
				<Scripts />
			</body>
		</html>
	);
}
