import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff6500" // orange
        },
        secondary: {
            main: "#09015f" // navy blue
        }
    },
    typography: {
        fontFamily: "Poppins"
    }
})

export default theme