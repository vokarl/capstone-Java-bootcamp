import { styled } from "@mui/material/styles";
import {Box, Button, Typography} from "@mui/material";

export const styles = {
    typography: {
        fontSize: "14px",
        width: "150px",
        textAlign: "center",
    },
};


export const StyledDateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    backgroundColor: theme.palette.background.paper,
    padding: "4px",
    marginBottom: "20px",
    borderRadius: "8px",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    backgroundColor: theme.palette.background.paper,
    padding: "4px",
    marginBottom: "20px",
    borderRadius: "8px",
}));

export const StyledTypography = styled(Typography)({
    fontSize: "3.5rem",
    alignItems: "center",
});
export const StyledButton = styled(Button)({
    color: "white",
    padding: "4px 8px",
    minHeight: "32px",
    height: "32px",
    minWidth: "32px",
    width: "32px",

})