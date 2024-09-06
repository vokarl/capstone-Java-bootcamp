import {PressureReading} from "../models/PressureReading.ts";
import {Card, CardContent, Typography} from "@mui/material";

type PressureCardProps ={
    pressureReading: PressureReading;
    fetchData: () => void;
}

export default function PressureCard({pressureReading}: Readonly<PressureCardProps>) {


    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    Date: {pressureReading.date}
                </Typography>
                <Typography variant="body1">
                    Time: {pressureReading.time}
                </Typography>
                <Typography variant="body1">
                    Systolic: {pressureReading.systolic}
                </Typography>
                <Typography variant="body1">
                    Diastolic: {pressureReading.diastolic}
                </Typography>
                <Typography variant="body1">
                    BPM: {pressureReading.bpm}
                </Typography>
            </CardContent>
        </Card>

    )
}







