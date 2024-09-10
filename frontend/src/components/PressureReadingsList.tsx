import {useEffect, useState} from "react";
import {PressureReading} from "../models/PressureReading.ts";
import  axios from "axios";
import PressureCard from "./PressureCard.tsx";
import AddPressureForm from "./PressureForm.tsx";
import GetPressureReadingById from "./GetPressureReadingById.tsx";
import {Box, FormControl, List} from "@mui/material";




export default function PressureReadigsList(){
    const [pressureReadings, setPressureReadings]= useState<PressureReading[]>([]);

    function fetchData(){
        axios.get<PressureReading[]>("api/blood-pressure")
            .then(response=>{
                setPressureReadings(response.data);
            })
            .catch(error =>{
                console.error("No data found!", error);
            })
    }
useEffect(()=>{
    fetchData()
},[]);

    const handlePressureReading = (newReading: PressureReading)=> {
        setPressureReadings(prevReadings=> [...prevReadings, newReading]);
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
    return(
        <>
        <h2>Blood Pressure Values</h2>
            <Box sx={{ mb: 6 }}>
     <FormControl fullWidth >
         <AddPressureForm onAddPressureForm={handlePressureReading}/>
     </FormControl>
            </Box>
            <Box>
            <GetPressureReadingById readings={pressureReadings}/>
                    <Box>
                {pressureReadings.slice().reverse().map(pressureReading=>(

                    <List key={pressureReading.id}>
                        <PressureCard pressureReading={pressureReading}
                                      fetchData={fetchData}
                                      onDelete={handleDelete}
                        />
                    </List>
                ))}
                    </Box>
            </Box>
        </>
    )



}