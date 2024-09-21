/* eslint-disable */
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography'), daisyui],
    daisyui: {
        themes: [
            {
                bumblebee: {
                    ...require("daisyui/src/theming/themes")["bumblebee"],
                    "accent": "#EEA12D",
                    "base-100": "#000326",
                },
            }
        ],
    },
};
