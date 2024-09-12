import { Routes, Route } from 'react-router-dom';
import PressureReadingsList from './components/PressureReadingsList';
import BloodWork from "./components/BloodWork.tsx";
import Layout from './components/Layout';
import { ThemeProvider, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';




const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: deepOrange,
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>

                <Layout>
                    <Routes>
                        <Route path="/blood-work" element={<BloodWork />} />
                        <Route path="/pressure-readings" element={<PressureReadingsList />} />
                    </Routes>
                </Layout>
        </ThemeProvider>
    );
}

export default App;
