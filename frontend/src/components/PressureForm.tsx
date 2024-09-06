import { useState } from "react";
import axios from "axios";
import { PressureReading } from "../models/PressureReading.ts";
import {Box, Button, styled, TextField} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Dayjs} from "dayjs";

interface PressureFormProps {
    onAddPressureForm: (newReading: PressureReading) => void;
}

export default function PressureForm({ onAddPressureForm  }: Readonly<PressureFormProps>) {
    const [date, setDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState<string>("");
    const [systolic, setSystolic] = useState<number | undefined>(undefined);
    const [diastolic, setDiastolic] = useState<number | undefined>(undefined);
    const [bpm, setBpm] = useState<number | undefined>(undefined);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!date || time === "" || systolic === undefined || diastolic === undefined || bpm === undefined) {
            return; 
        }
        const newReading = {
            pressureId: '',
            date,
            time: date.format("HH:mm"),
            systolic,
            diastolic,
            bpm,
        };

        axios.post<PressureReading>("api/blood-pressure", newReading)
            .then(response => {
                onAddPressureForm(response.data);
                setDate(null);
                setTime('');
                setSystolic(undefined);
                setDiastolic(undefined);
                setBpm(undefined);
            })
            .catch(error => {
                console.error("Error adding new pressure reading", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "row", gap: "6px"}}>
            <StyledDateBox>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DateTimePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                        format="DD/MM/YYYY HH:mm"
                    ampm={false}

            />
                    </LocalizationProvider>
            </StyledDateBox>
            <StyledBox>
            <TextField
                type="number"
                value={systolic !== undefined ? systolic : ''}
                onChange={(event) => setSystolic(event.target.value !== '' ? Number(event.target.value) : undefined)}
                placeholder="Systolic"
                required

            />  </StyledBox>
            <StyledBox sx={{ display: "flex", gap: "16px" }}>

            <TextField
                type="number"
                value={diastolic !== undefined ? diastolic : ''}
                onChange={(event) => setDiastolic(event.target.value !== '' ? Number(event.target.value) : undefined)}
                placeholder="Diastolic"
                required

            />
            </StyledBox>
            <StyledBox>

            <TextField
            type="number"
            value={bpm !== undefined ? bpm : ''}
            onChange={(event) => setBpm(event.target.value !== '' ? Number(event.target.value) : undefined)}
            placeholder="Bpm"
            required
        />  </StyledBox>
                <StyledButton type="submit" variant="contained" color="primary" size="small">
                    +</StyledButton>
            <StyledButton type="submit" variant="contained" color="primary" >
                -</StyledButton>

        </form>
    );
}

const StyledDateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    backgroundColor: theme.palette.background.paper,
    padding: "4px",
    marginBottom: "20px",
    borderRadius: "8px",

}));
const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    backgroundColor: theme.palette.background.paper,
    padding: "4px",
    marginBottom: "20px",
    borderRadius: "8px",

}));
const StyledButton = styled(Button)({
   color: "white",
    padding: "4px 8px",
    minHeight: "32px",
    height: "32px",
    minWidth: "32px",
    width: "32px",

})



