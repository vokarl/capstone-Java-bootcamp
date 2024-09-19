import {useEffect, useState} from "react";
import {PressureReading} from "../../models/pressure-reading.ts";
import  axios from "axios";
import AddPressureForm from "./PressureForm.tsx";
import GetPressureReadingById from "./GetPressureReadingById.tsx";
import {Box, FormControl} from "@mui/material";




export default function PressureReadigsList(){
    const [readings, setReadings]= useState<PressureReading[]>([]);

    function fetchData(){
        axios.get<PressureReading[]>("api/blood-pressure")
            .then(response=>{
                setReadings(response.data);
            })
            .catch(error =>{
                console.error("No data found!", error);
            })
    }
useEffect(()=>{
    fetchData()
},[]);

    const handleReading = (newReading: PressureReading)=> {
        setReadings(prevReadings=> [...prevReadings, newReading]);
    }
    const handleDelete = (pressureId: string)=>{
        axios.delete(`api/blood-pressure/${pressureId}`)
            .then(()=>{
                fetchData()
            })
            .catch(error => {
                console.error("deletion not possible!", error)
            })
    }
    const handleUpdate = (id: string, updatedReading: PressureReading)=>{
        axios.put(`/api/blood-pressure/${id}`, updatedReading, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error("updating was not possible!", error);
                alert("not able to update changes");
            });
    }
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



}