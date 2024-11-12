import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// select colors with Tailwind https://www.tailwindshades.com/
// invert rows for light theme

export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            bluePrimary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#1F2A40",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
            },
            grayPrimary: {
                50: '#BAC1CA',
                100: '#AFB6C1',
                200: '#98A1AF',
                300: '#818D9D',
                400: '#6B788A',
                500: '#596473',
                600: '#414953',
                700: '#282D34',
                800: '#101214'
            },
            orangeAccent: {
                50: '#241500',
                100: '#5C3700',
                200: '#945800',
                300: '#CC7A00',
                400: '#F59200',
                500: '#FFA51F',
                600: '#FFB547',
                700: '#FFC670',
                800: '#FFCE85'
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
            },
        }
        : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            bluePrimary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0", // manually changed
                500: "#141b2d",
                600: "#1F2A40",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            grayPrimary: {
                50: '#101214',
                100: '#282D34',
                200: '#414953',
                300: '#596473',
                400: '#6B788A',
                500: '#818D9D',
                600: '#98A1AF',
                700: '#AFB6C1',
                800: '#BAC1CA',
            },
            orangeAccent: {
                50: '#FFCE85',
                100: '#FFC670',
                200: '#FFB547',
                300: '#FFA51F',
                400: '#F59200',
                500: '#CC7A00',
                600: '#945800',
                700: '#5C3700',
                800: '#241500',
                900: '#000000',
                950: '#000000'
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
        }),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    primary: {
                        dark: colors.grayPrimary[800],
                        main: colors.grayPrimary[700],
                        light: colors.grayPrimary[600]
                    },
                    secondary: {
                        dark: colors.orangeAccent[700],
                        main: colors.orangeAccent[600],
                        light: colors.orangeAccent[100],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[300],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.grayPrimary[700],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        dark: colors.grayPrimary[600],
                        main: colors.grayPrimary[700],
                        light: colors.grayPrimary[800]
                    },
                    secondary: {
                        dark: colors.orangeAccent[700],
                        main: colors.orangeAccent[500],
                        light: colors.orangeAccent[100],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[400],
                        light: colors.grey[500],
                    },
                    background: {
                        default: "#ededed",
                    },
                }),
        },
        typography: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

export const ColorModeContext = createContext({

    toggleColorMode: () => { },

});

export const useMode = () => {

    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};