import { Routes, Route } from 'react-router-dom';
import PressureReadingsList from './components/blood-pressure/PressureReadingsList.tsx';
import BloodWorkList from "./components/blood-work/BloodWorkList.tsx";
import Layout from './components/Layout';
import { ThemeProvider, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import LineChart from "./components/LineChart.tsx";

import usePressureReadings from "./hooks/usePressureReadings.ts";

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
    const { readings, handleReading, handleDeleteReading, handleUpdateReading } = usePressureReadings();


    return (
        <ThemeProvider theme={theme}>

                <Layout>
                    <Routes>
                        <Route path="/" element={<LineChart readings={readings}/>} />
                        <Route path="/pressure-readings" element={
                            <PressureReadingsList
                                readings={readings}
                            onAddReading={handleReading}
                            onUpdateReading={handleUpdateReading}
                            onDeleteReading={handleDeleteReading}/>} />
                        <Route path="/blood-work" element={<BloodWorkList />} />
                    </Routes>
                </Layout>
        </ThemeProvider>
    );
}

export default App;
