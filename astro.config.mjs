/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
    server: { port: 3000 },
    site: "https://durguto.com",
    integrations: [
        tailwind({
            config: { applyBaseStyles: false },
        }),
    ],
});
