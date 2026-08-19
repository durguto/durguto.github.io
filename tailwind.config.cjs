/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.astro"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                body: ['"Ioskeley Mono"', "ui-monospace", "SFMono-Regular", "SF Mono", "monospace"],
                heading: ['"Ioskeley Mono"', "ui-monospace", "SFMono-Regular", "SF Mono", "monospace"],
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                primary: {
                    main: "rgb(var(--color-primary-main) / <alpha-value>)",
                },
                text: {
                    body: "rgb(var(--color-text-body) / <alpha-value>)",
                    bold: "rgb(var(--color-text-bold) / <alpha-value>)",
                    heading: "rgb(var(--color-text-heading) / <alpha-value>)",
                    muted: "rgb(var(--color-text-muted) / <alpha-value>)",
                    code: "rgb(var(--color-text-code) / <alpha-value>)",
                    link: "rgb(var(--color-text-link) / <alpha-value>)",
                    selection: "rgb(var(--color-text-selection) / <alpha-value>)",
                },
                bg: {
                    body: "rgb(var(--color-bg-body) / <alpha-value>)",
                    code: "rgb(var(--color-bg-code) / <alpha-value>)",
                    selection: "rgb(var(--color-bg-selection) / <alpha-value>)",
                },
                border: {
                    code: "rgb(var(--color-border-code) / <alpha-value>)",
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        lineHeight: "1.85",
                        letterSpacing: "0.01em",
                        h1: { fontSize: "1em", fontWeight: "600" },
                        h2: { fontSize: "1em", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" },
                        h3: { fontSize: "1em", fontWeight: "500" },
                        h4: { fontSize: "1em", fontWeight: "500" },
                        h5: { fontSize: "1em", fontWeight: "400" },
                        h6: { fontSize: "1em", fontWeight: "400" },
                        a: {
                            "text-decoration": "underline",
                            "text-underline-offset": "2px",
                            "text-decoration-color": "rgb(var(--color-border-code))",
                            "text-decoration-thickness": "1px",
                            "&:hover": {
                                opacity: "0.6",
                            },
                        },
                        "h1, h2, h3, h4, h5": {
                            color: "rgb(var(--color-text-heading))",
                        },
                        "code::before": { content: "none" },
                        "code::after": { content: "none" },
                        "ul": {
                            "list-style-type": '"* "',
                            "padding-left": "1.5em",
                        },
                        "ul > li": {
                            "padding-left": "0.25em",
                        },
                        "ul > li::before": {
                            content: "none",
                        },
                        "ul > li::marker": {
                            color: "rgb(var(--color-text-muted))",
                        },
                        "ol": {
                            "padding-left": "1.5em",
                        },
                        "ol > li": {
                            "padding-left": "0.25em",
                        },
                        "ol > li::marker": {
                            color: "rgb(var(--color-text-muted))",
                        },
                        blockquote: {
                            background: "rgb(var(--color-bg-code))",
                            padding: "1em 1.25em 1em 2em",
                            margin: "1.75em 0",
                            "border-left": "none",
                            "border-top": "none",
                            "border-right": "none",
                            "border-bottom": "none",
                            "font-style": "normal",
                            color: "rgb(var(--color-text-body))",
                            position: "relative",
                            width: "100%",
                        },
                        "blockquote::before": {
                            content: "'▸'",
                            position: "absolute",
                            top: "1em",
                            left: "0.625em",
                            color: "rgb(var(--color-text-muted))",
                            "font-size": "0.85em",
                            "line-height": "1",
                        },
                        "blockquote::after": { content: "none" },
                        "blockquote p:first-of-type::before": { content: "none" },
                        "blockquote p:last-of-type::after": { content: "none" },
                        hr: {
                            "border-style": "dashed",
                            "border-color": "rgb(var(--color-border-subtle))",
                            "border-top-width": "1px",
                            "margin-top": "2.5em",
                            "margin-bottom": "2.5em",
                        },
                        table: {
                            "font-size": "1em",
                            "border-collapse": "collapse",
                            width: "100%",
                            margin: "1.75em 0",
                        },
                        "thead": {
                            "border-bottom": "1px dashed rgb(var(--color-border-subtle))",
                        },
                        "thead th": {
                            border: "1px dashed rgb(var(--color-border-subtle))",
                            padding: "0.5em 1em",
                            "font-weight": "500",
                            "text-align": "left",
                            "line-height": "1.4",
                        },
                        "thead th:first-child": { "padding-left": "1em" },
                        "tbody tr": {
                            "border-top": "1px dashed rgb(var(--color-border-subtle))",
                            "border-bottom": "1px dashed rgb(var(--color-border-subtle))",
                        },
                        "tbody td": {
                            border: "1px dashed rgb(var(--color-border-subtle))",
                            padding: "0.45em 1em",
                            "vertical-align": "top",
                            "line-height": "1.6",
                        },
                        "tbody td:first-child": { "padding-left": "1em" },
                        "tbody tr:last-child td": {},
                        pre: {
                            "border-radius": "0",
                            border: "1px solid rgb(var(--color-border-code))",
                            "font-size": "1em",
                            "line-height": "1.65",
                            padding: "1em",
                        },
                    },
                },
                newspaper: {
                    css: {
                        "--tw-prose-body": "rgb(var(--color-text-body))",
                        "--tw-prose-headings": "rgb(var(--color-text-heading))",
                        "--tw-prose-lead": "rgb(var(--color-text-body))",
                        "--tw-prose-links": "rgb(var(--color-text-body))",
                        "--tw-prose-bold": "rgb(var(--color-text-bold))",
                        "--tw-prose-counters": "rgb(var(--color-text-body))",
                        "--tw-prose-bullets": "rgb(var(--color-text-body))",
                        "--tw-prose-hr": "rgb(var(--color-border-subtle))",
                        "--tw-prose-quotes": "rgb(var(--color-text-muted))",
                        "--tw-prose-quote-borders": "rgb(var(--color-border-subtle))",
                        "--tw-prose-captions": "rgb(var(--color-text-muted))",
                        "--tw-prose-quote-captions": "rgb(var(--color-text-muted))",
                        "--tw-prose-code": "rgb(var(--color-text-code))",
                        "--tw-prose-pre-code": "rgb(var(--color-text-code))",
                        "--tw-prose-pre-bg": "rgb(var(--color-bg-code))",
                        "--tw-prose-th-borders": "rgb(var(--color-border-subtle))",
                        "--tw-prose-td-borders": "rgb(var(--color-border-subtle))",
                    },
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
