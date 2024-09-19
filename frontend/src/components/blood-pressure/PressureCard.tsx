import {PressureReading} from "../../models/pressure-reading.ts";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import dayjs, {Dayjs} from 'dayjs';
import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {StyledBox, StyledDateBox, styles} from "../Layout.tsx";

type PressureCardProps ={
    pressureReading: PressureReading;
    onDelete:(pressureId: string) => void;
    onUpdate:(pressureId: string, updatedReading: {
        dateTime:  string;
        systolic: number;
        diastolic: number;
        id: string;
        bpm: number
    }) => void;
}

export default function PressureCard({pressureReading, onDelete, onUpdate}: Readonly<PressureCardProps>) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedDateTime, setUpdatedDateTime] = useState<Dayjs | null>(null);
    const [updatedSystolic, setUpdatedSystolic] = useState<number | undefined>(undefined);
    const [updatedDiastolic, setUpdatedDiastolic] = useState<number | undefined>(undefined);
    const [updatedBpm, setUpdatedBpm] = useState<number | undefined>(undefined);

    const formattedDate = dayjs(pressureReading.dateTime).isValid()
        ? dayjs(pressureReading.dateTime).format("D.M.YYYY---HH:mm")
        : "Invalid Date";

    function toggleEdit(){
        setIsEditMode(!isEditMode);
    }
    const handleSave = () => {
        const updatedReading = {
            ...pressureReading,
            dateTime: updatedDateTime ? updatedDateTime.toISOString() : pressureReading.dateTime,
            systolic: updatedSystolic !== undefined ? updatedSystolic : pressureReading.systolic,
            diastolic: updatedDiastolic !== undefined ? updatedDiastolic : pressureReading.diastolic,
            bpm: updatedBpm !== undefined ? updatedBpm : pressureReading.bpm,
        };
        onUpdate(pressureReading.id, updatedReading);
        setIsEditMode(false);
    };

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
                    onClick={toggleEdit}>
                    edit
                </Button>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}>
                  save
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onDelete(pressureReading.id)}
                >
                    del.
                </Button>
                {isEditMode ?
                    <StyledDateBox>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Date"
                                value={updatedDateTime}
                                onChange={(newValue) => setUpdatedDateTime(newValue)}
                                format="DD/MM/YYYY HH:mm"
                                ampm={false}
                            /></LocalizationProvider>
                    </StyledDateBox>:
                    <Typography sx={styles.typography}>
                    Date/Time: {formattedDate.toString()}
                </Typography>}

                {isEditMode ? <StyledBox>
                        <TextField
                            type="number"
                            value={updatedSystolic !== undefined ? updatedSystolic : ''}
                            onChange={(event) =>
                                setUpdatedSystolic(event.target.value !== '' ? Number(event.target.value) : undefined)}
                            placeholder="Systolic"
                            required
                        />  </StyledBox>
                    :<Typography sx={styles.typography}>
                    Systolic: {pressureReading.systolic}
                </Typography>}
                {isEditMode?
                    <StyledBox sx={{ display: "flex", gap: "16px" }}>
                        <TextField
                            type="number"
                            value={updatedDiastolic !== undefined ? updatedDiastolic : ''}
                            onChange={(event) => setUpdatedDiastolic(event.target.value !== '' ? Number(event.target.value) : undefined)}
                            placeholder="Diastolic"
                            required
                        />
                    </StyledBox>
                    :<Typography sx={styles.typography}>
                    Diastolic: {pressureReading.diastolic}
                </Typography>
                }
                {isEditMode?
                    <StyledBox>

                        <TextField
                            type="number"
                            value={updatedBpm !== undefined ? updatedBpm : ''}
                            onChange={(event) => setUpdatedBpm(event.target.value !== '' ? Number(event.target.value) : undefined)}
                            placeholder="Bpm"
                            required
                        />  </StyledBox>:

                <Typography sx={styles.typography}>
                    BPM: {pressureReading.bpm}
                </Typography>
                }

            </CardContent>
        </Card>

    )
}








