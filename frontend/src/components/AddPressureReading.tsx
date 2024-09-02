import { useState } from "react";
import axios from "axios";
import { PressureReading } from "../models/PressureReading.ts";

interface AddPressureFormProps {
    onAddPressureForm: (newReading: PressureReading) => void;
}

export default function AddPressureForm({ onAddPressureForm }: AddPressureFormProps) {
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [systolic, setSystolic] = useState<number | undefined>(undefined);
    const [diastolic, setDiastolic] = useState<number | undefined>(undefined);
    const [bpm, setBpm] = useState<number | undefined>(undefined);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const newReading = {
            pressureId: '',
            date,
            time,
            systolic,
            diastolic,
            bpm,
        };

        axios.post<PressureReading>("api/blood-pressure", newReading)
            .then(response => {
                onAddPressureForm(response.data);
                setDate('');
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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                placeholder="Date"
                required
            />
            <input
                type="text"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                placeholder="Time"
                required
            />
            <input
                type="number"
                value={systolic !== undefined ? systolic : ''}
                onChange={(event) => setSystolic(event.target.value !== '' ? Number(event.target.value) : undefined)}
                placeholder="Systolic"
                required
            />
            <input
                type="number"
                value={diastolic !== undefined ? diastolic : ''}
                onChange={(event) => setDiastolic(event.target.value !== '' ? Number(event.target.value) : undefined)}
                placeholder="Diastolic"
                required
            /><input
            type="number"
            value={bpm !== undefined ? bpm : ''}
            onChange={(event) => setBpm(event.target.value !== '' ? Number(event.target.value) : undefined)}
            placeholder="Bpm"
            required
        />
            <button type="submit">Add Pressure Reading</button>
        </form>
    );
}
