import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig(({ mode }) => {
	const isProd = mode === "production";
	const isTest = mode === "test";

	return {
		resolve: {
			tsconfigPaths: true,
		},

		define: {
			"process.env.NODE_ENV": JSON.stringify(
				isProd ? "production" : "development",
			),
		},

		plugins: [
			devtools({
				removeDevtoolsOnBuild: true,
			}),

			!isTest &&
				cloudflare({
					viteEnvironment: { name: "ssr" },
				}),

			tailwindcss(),
			tanstackStart(),
			solidPlugin({ ssr: true }),
		],

		build: {
			target: "esnext",
			minify: "oxc",
			cssMinify: "lightningcss",
			sourcemap: false,
			modulePreload: {
				polyfill: false,
			},
			cssCodeSplit: true,
			reportCompressedSize: true,
		},

		environments: {
			ssr: {
				build: {
					target: "esnext",
					minify: "oxc",
					sourcemap: true,
					reportCompressedSize: true,
				},
			},
		},
	};
});
