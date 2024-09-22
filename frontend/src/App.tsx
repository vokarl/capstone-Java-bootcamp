import { Routes, Route } from 'react-router-dom';
import PressureReadingsList from './components/blood-pressure/PressureReadingsList.tsx';
import BloodWorkList from "./components/blood-work/BloodWorkList.tsx";
import Layout from './components/Layout';
import { ThemeProvider, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import LineChart from "./components/LineChart.tsx";




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
                        <Route path="/" element={<LineChart />} />
                        <Route path="/blood-work" element={<BloodWorkList />} />
                        <Route path="/pressure-readings" element={<PressureReadingsList />} />

                    </Routes>
                </Layout>
        </ThemeProvider>
    );
}

export default App;
