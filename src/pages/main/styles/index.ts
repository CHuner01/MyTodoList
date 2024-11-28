import {createTheme} from "@mui/material";
import {orange, purple} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: orange[400],
            dark: orange[500],
        },
        secondary: {
            main: "#FFFFFF",
            dark: "#000000"
        }
    },
    typography: {
        h1: {
            fontSize: "3rem",
            fontWeight: 600,
            marginTop: 10,
            marginBottom: 10,
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 600,
            marginTop: 6,
            marginBottom: 6,
        },
        h3: {
            fontSize: "1.4rem",
            fontWeight: 600,
            marginTop: 4,
            marginBottom: 4,
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    borderRadius: "6px",
                    textTransform: "none",
                    fontSize: "18px"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: "secondary",

                }
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    '&:before': {
                        borderColor: 'yellow',
                    },
                    '&:after': {
                        borderColor: 'yellow',
                    },
                    '&:not(.Mui-disabled):hover::before': {
                        borderColor: 'yellow',
                    },
                },
                icon: {
                    fill: 'black',
                },
                root: {
                    color: 'black',
                },
            }
        }
    }
})