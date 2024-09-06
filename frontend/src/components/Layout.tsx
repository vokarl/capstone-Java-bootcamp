import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import {Drawer, Typography} from "@mui/material";

interface LayoutProps {
    children: ReactNode;
}

const drawerWidth = 240
const Page = styled('div')({
    backgroundColor: '#f9f9f9',
    width: '100%',
});
const NavDrawer = styled(Drawer)({
    width: drawerWidth,
});


export default function Layout({ children }: Readonly<LayoutProps>): JSX.Element {
    return (
        <div>
            <NavDrawer variant="permanent" anchor="left"   sx={{ width: drawerWidth + 15 }}
                       PaperProps={{
                           sx: { width: drawerWidth + 15 },
                       }}>
                <div>
                    <Typography variant="h5">blood pressure</Typography>
                </div>
            </NavDrawer>
            <Page>
                {children}
            </Page>
        </div>
    );
}


/*
const StyledContainer = styled(Container)({
    backgroundColor: "blue",
    minHeight:"100vh",
    display:"flex",
    justifyContent:"flex-end",
    flexDirection:"column",
    padding:"16px",
    width: "85vw",
    body:"100%",
})*/
