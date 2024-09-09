
import './App.css'
import PressureReadingsList from "./components/PressureReadingsList.tsx";
import { styled, Typography, ThemeProvider, createTheme } from "@mui/material";
import Layout from "./components/Layout.tsx";
import {deepOrange} from "@mui/material/colors";


const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: deepOrange
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },

});

function App() {


    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <StyledTypography variant="h1" color="primary" align="center">track your health</StyledTypography>
                <PressureReadingsList/>
            </Layout>
        </ThemeProvider>

    )
}

export default App



const StyledTypography = styled(Typography)({
    fontSize:"3.5rem",
    alignItems:"center",
})