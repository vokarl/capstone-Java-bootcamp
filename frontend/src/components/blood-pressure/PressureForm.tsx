import { useState } from "react";
import axios from "axios";
import { PressureReading } from "../../models/pressure-reading.ts";
import {TextField} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Dayjs} from "dayjs";
import {StyledBox, StyledButton, StyledDateBox} from "../Styles.ts";


interface PressureFormProps {
    onAddPressureForm: (newReading: PressureReading) => void;
}

export default function PressureForm({ onAddPressureForm  }: Readonly<PressureFormProps>) {
    const [dateTime, setDateTime] = useState<Dayjs | null>(null);
    const [systolic, setSystolic] = useState<number | undefined>(undefined);
    const [diastolic, setDiastolic] = useState<number | undefined>(undefined);
    const [bpm, setBpm] = useState<number | undefined>(undefined);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!dateTime || systolic === undefined || diastolic === undefined || bpm === undefined) {
            return; 
        }
        const dateTimeString = dateTime.toISOString();
        const newReading = {
            pressureId: '',
            dateTime: dateTimeString,
            systolic,
            diastolic,
            bpm,
        };

        axios.post<PressureReading>("api/blood-pressure", newReading)
            .then(response => {
                onAddPressureForm(response.data);
                setDateTime(null);
                setSystolic(undefined);
                setDiastolic(undefined);
                setBpm(undefined);
            })
            .catch(error => {
                console.error("Error adding new pressure reading", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "row", gap: "6px", width: "80%"}}>
            <StyledDateBox>
                <StyledButton type="submit" variant="contained" color="primary" size="small">
                    +</StyledButton>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DateTimePicker
                    label="Date"
                    value={dateTime}
                    onChange={(newValue) => setDateTime(newValue)}
                        format="DD/MM/YYYY HH:mm"
                    ampm={false}
               /></LocalizationProvider>
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


        </form>
    );
}


