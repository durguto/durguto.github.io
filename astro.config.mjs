/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const SERVER_PORT = 3000;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://odurgut.dev";
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
let BASE_URL = LOCALHOST_URL;
if (isBuild) {
    BASE_URL = LIVE_URL;
}

export default defineConfig({
    server: { port: SERVER_PORT },
    site: "https://durguto.github.io",
    integrations: [
        tailwind({
            config: { applyBaseStyles: false },
        }),
    ],
});
