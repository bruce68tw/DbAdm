import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {

    const isProd = mode === "production";

    return {

        build: {

            outDir: "wwwroot",
            emptyOutDir: false,

            minify: isProd ? "terser" : false,
            cssMinify: true,

            rollupOptions: {

                input: {

                    lib: resolve(__dirname, "ts-entry/lib.ts"),

                    ...(isProd
                        ? {
                            my: resolve(__dirname, "ts-entry/my.ts")
                        }
                        : {
                            "js-base": resolve(__dirname, "ts-entry/base-dev.ts"),
                            "js-view": resolve(__dirname, "ts-entry/view-dev.ts")
                        }
                    ),

                    "locale-zh-TW": resolve(__dirname, "ts-entry/locale-zh-TW.ts"),
                    "locale-zh-CN": resolve(__dirname, "ts-entry/locale-zh-CN.ts"),
                    "locale-en-US": resolve(__dirname, "ts-entry/locale-en-US.ts")
                },

                output: {

                    entryFileNames: (chunk) => {

                        if (chunk.name === "lib") return "lib.min.js";
                        if (chunk.name === "my") return "my.min.js";

                        if (chunk.name.startsWith("js-")) {
                            return "js/[name].js";
                        }

                        if (chunk.name.startsWith("locale-")) {
                            return "[name].min.js";
                        }

                        return "[name].js";
                    }
                }
            }
        }
    };
});