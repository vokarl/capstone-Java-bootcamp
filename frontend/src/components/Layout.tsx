import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import {Box, Drawer, List, ListItem, ListItemText, Typography} from "@mui/material";

interface LayoutProps {
    children: ReactNode;
}

const drawerWidth = 200
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
        <Box sx={{display:"flex"}}>
            <NavDrawer variant="permanent" anchor="left"   sx={{ width: drawerWidth, flexShrink:0}}
                       PaperProps={{
                           sx: { width: drawerWidth},
                       }}>
                <Box sx={{paddingTop: 20}}>
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h5" color="primary">blood pressure</Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h5" color="primary">other</Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Box>
            </NavDrawer>
            <Page>
                {children}
            </Page>
        </Box>
    );
}


