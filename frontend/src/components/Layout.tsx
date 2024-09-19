import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import {Box, Drawer, List, ListItem, ListItemText, Typography, Link, Button} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

const drawerWidth = 200;
const Page = styled('div')({
    backgroundColor: '#f9f9f9',
    width: '100%',
    flexGrow: 1,
});
const NavDrawer = styled(Drawer)({
    width: drawerWidth,
});

export default function Layout({ children }: Readonly<LayoutProps>): JSX.Element {
    return (
        <>
            <StyledTypography variant="h1" color="primary" align="center">
                track your health
            </StyledTypography>
            <Box sx={{ display: 'flex' }}>
                <NavDrawer
                    variant="permanent"
                    anchor="left"
                    sx={{ width: drawerWidth, flexShrink: 0 }}
                    PaperProps={{
                        sx: { width: drawerWidth },
                    }}
                >
                    <Box sx={{ paddingTop: 20 }}>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h5" color="primary">
                                        <Link component={RouterLink} to="/pressure-readings" color="inherit">
                                             Pressure Readings
                                        </Link>
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h5" color="primary">
                                        <Link component={RouterLink} to="/blood-work" color="inherit">
                                          Bloodwork
                                        </Link>
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </NavDrawer>
                <Page>{children}</Page>
            </Box>
        </>
    );
}

export const StyledTypography = styled(Typography)({
    fontSize: '3.5rem',
    alignItems: 'center',
});

export const StyledDateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    backgroundColor: theme.palette.background.paper,
    padding: "4px",
    marginBottom: "20px",
    borderRadius: "8px",
}));

export const styles = {
    typography: {
        fontSize: '1rem',
        fontWeight: 'bold',
    },
};

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    backgroundColor: theme.palette.background.paper,
    padding: "4px",
    marginBottom: "20px",
    borderRadius: "8px",

}));
export const StyledButton = styled(Button)({
    color: "white",
    padding: "4px 8px",
    minHeight: "32px",
    height: "32px",
    minWidth: "32px",
    width: "32px",

})