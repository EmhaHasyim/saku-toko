import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main class="w-full max-w-full min-h-screen flex flex-col justify-center items-center gap-5">
			<img src="logo512.avif" alt="saku toko" class="max-w-20" />
			<span class="text-rotate text-4xl font-bold font-mono text-center">
				<span class="justify-items-center">
					<span>First</span>
					<span>Commit</span>
					<span>Saku Toko</span>
				</span>
			</span>
		</main>
	);
}
