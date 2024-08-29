import {useEffect, useState} from "react";
import {PressureReading} from "../models/PressureReading.ts";
import  axios from "axios";
import PressureCard from "./PressureCard.tsx";


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

    return(
        <>
        <h2>Blood Pressure Values</h2>
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