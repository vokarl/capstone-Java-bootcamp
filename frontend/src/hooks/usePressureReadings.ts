// src/hooks/usePressureReadings.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { PressureReading } from "../models/pressure-reading.ts";

const usePressureReadings = () => {
    const [readings, setReadings] = useState<PressureReading[]>([]);

    const fetchData = () => {
        axios.get<PressureReading[]>("api/blood-pressure")
            .then(response => {
                setReadings(response.data);
            })
            .catch(error => {
                console.error("No data found!", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReading = (newReading: PressureReading) => {
        setReadings(prevReadings => [...prevReadings, newReading]);
    };

    const handleDeleteReading = (pressureId: string) => {
        axios.delete(`api/blood-pressure/${pressureId}`)
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error("Deletion not possible!", error);
            });
    };

    const handleUpdateReading = (id: string, updatedReading: PressureReading) => {
        axios.put(`/api/blood-pressure/${id}`, updatedReading, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error("Updating was not possible!", error);
                alert("Not able to update changes");
            });
    };

    return { readings, handleReading, handleDeleteReading, handleUpdateReading };
};

export default usePressureReadings;
