
import './App.css'
import PressureReadigsList from "./components/PressureReadingsList.tsx";
import { styled, Typography} from "@mui/material";

import Layout from "./components/Layout.tsx";

function App() {


    return (
        <Layout>

            <StyledTypography variant="h1" color="primary" align="center">track your health</StyledTypography>
            <PressureReadigsList/>
        </Layout>
    )
}

export default App



const StyledTypography = styled(Typography)({
    fontSize:"3.5rem",
    alignItems:"center",
})