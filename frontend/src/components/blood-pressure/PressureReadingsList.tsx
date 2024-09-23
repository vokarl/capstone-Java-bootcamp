import {PressureReading} from "../../models/pressure-reading.ts";
import AddPressureForm from "./PressureForm.tsx";
import GetPressureReadingById from "./GetPressureReadingById.tsx";
import {Box, FormControl} from "@mui/material";

interface PressureReadingsListProps {
    readings: PressureReading[];
    onAddReading: (newReading: PressureReading) => void;
    onUpdateReading: (id: string, updatedReading: PressureReading) => void;
    onDeleteReading: (id: string) => void;
}

export default function PressureReadingsList({
                                                 readings,
                                                 onAddReading,
                                                 onUpdateReading,
                                                 onDeleteReading
                                             }: Readonly<PressureReadingsListProps>) {
    return(
        <>
            <h2>Blood Pressure Values</h2>
            <Box sx={{ mb: 6 }}>
                <FormControl fullWidth >
                    <AddPressureForm onAddPressureForm={onAddReading}/>
                </FormControl>
            </Box>
            <Box>
                <GetPressureReadingById readings={readings}
                                        onUpdate={onUpdateReading}
                                        onDelete={onDeleteReading}/>
            </Box>
        </>
    )



}


/*
import {useEffect, useState} from "react";
import {PressureReading} from "../../models/pressure-reading.ts";
import  axios from "axios";
import AddPressureForm from "./PressureForm.tsx";
import GetPressureReadingById from "./GetPressureReadingById.tsx";
import {Box, FormControl} from "@mui/material";

interface PressureReadingsListProps {
    readings: PressureReading[];
    onAddReading: (newReading: PressureReading) => void;
    onUpdateReading: (id: string, updatedReading: PressureReading) => void;
    onDeleteReading: (id: string) => void;
}

export default function PressureReadingsList({
                                                 readings,
                                                 onAddReading,
                                                 onUpdateReading,
                                                 onDeleteReading
                                             }: PressureReadingsListProps) {


    return(
        <>
        <h2>Blood Pressure Values</h2>
            <Box sx={{ mb: 6 }}>
     <FormControl fullWidth >
         <AddPressureForm onAddPressureForm={handleReading}/>
     </FormControl>
            </Box>
            <Box>
            <GetPressureReadingById readings={readings}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}/>
            </Box>
        </>
    )



}*/
