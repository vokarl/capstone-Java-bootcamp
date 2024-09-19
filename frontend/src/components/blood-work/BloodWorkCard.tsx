import {BloodWork} from "../../models/blood-work.ts";
import { Button, Card, CardContent,  Typography} from "@mui/material";

type BloodWorkCardProps ={
    bloodWork : BloodWork;
    onDelete: (id: string) => void;
}
export default function BloodWorkCard({ bloodWork, onDelete }: Readonly<BloodWorkCardProps>) {
    console.log("Rendering BloodWorkCard with:", bloodWork);

    return (
        <Card sx={{ padding: 0,
            display: "flex",
            flexDirection:"row",
            mr: 20,
        }}>
            <CardContent sx={{
                padding: 1,
                display:"flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems:"center",
                gap: 1}}>
                <Button
                variant="contained"
                color="primary"
                onClick={()=> onDelete(bloodWork.id)}>DEL.</Button>
                <Typography sx={styles.typography}> {bloodWork.dateTime}</Typography>
                <Typography sx={styles.typography}>GFR: {bloodWork.gfr}</Typography>
                <Typography sx={styles.typography}>CRP: {bloodWork.crp}</Typography>
            </CardContent>
        </Card>
    );
}


const styles = {
    typography: {
        fontSize: "14px",
        width: '150px',
        textAlign: 'center'
    }
};
