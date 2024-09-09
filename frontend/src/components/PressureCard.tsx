import {PressureReading} from "../models/PressureReading.ts";
import {Card, CardContent, Typography} from "@mui/material";
import dayjs from 'dayjs';

type PressureCardProps ={
    pressureReading: PressureReading;
    fetchData: () => void;
}

const styles = {
    typography: {
        fontSize: "18px",
        width: '150px',
        textAlign: 'center'
    }
};


export default function PressureCard({pressureReading}: Readonly<PressureCardProps>) {
    const formattedDate = dayjs(pressureReading.date).format("D.M.YYYY---HH:mm");

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

                <Typography sx={styles.typography}>
                    ||||change
                </Typography>
                <Typography sx={styles.typography}>
                    delete
                </Typography>
                <Typography sx={styles.typography}>
                    Date/Time: {formattedDate}
                </Typography>

                <Typography sx={styles.typography}>
                    Systolic: {pressureReading.systolic}
                </Typography>
                <Typography sx={styles.typography}>
                    Diastolic: {pressureReading.diastolic}
                </Typography>
                <Typography sx={styles.typography}>
                    BPM: {pressureReading.bpm}
                </Typography>


            </CardContent>
        </Card>

    )
}







