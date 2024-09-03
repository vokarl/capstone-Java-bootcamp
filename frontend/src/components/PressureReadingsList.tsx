import {useEffect, useState} from "react";
import {PressureReading} from "../models/PressureReading.ts";
import  axios from "axios";
import PressureCard from "./PressureCard.tsx";
import AddPressureForm from "./AddPressureReading.tsx";




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

    return(
        <>
        <h2>Blood Pressure Values</h2>
            <AddPressureForm onAddPressureForm={handlePressureReading}/>
            <div>
                {pressureReadings.map(pressureReading=>(
                    <li key={pressureReading.pressureId}>
                        <PressureCard pressureReading={pressureReading} fetchData={fetchData}/>
                    </li>
                ))}
            </div>
        </>
    )



}