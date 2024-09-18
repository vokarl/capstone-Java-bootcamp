import {useEffect, useState} from "react";
import {BloodWork} from "../../models/blood-work.ts";
import axios from "axios";
import BloodWorkCard from "./BloodWorkCard.tsx";
import {FormControl} from "@mui/material";
import BloodWorkForm from "./BloodWorkForm.tsx";


export default function BloodWorkList(){
    const [bloodValues, setBloodValues] = useState<BloodWork[]>([]);

    function fetchData(){
        axios.get<BloodWork[]>("api/blood-work")
            .then(response=>{
                setBloodValues(response.data);
            })
            .catch(error =>{
                console.error("No data found!", error);
            })
    }
    useEffect(()=>{
        fetchData()
    },[]);

    const handleBloodWork = (newBloodWork: BloodWork) => {
        setBloodValues(prevBloodWork =>[...prevBloodWork, newBloodWork]);
    }

    return(
        <>
            <FormControl >
                <BloodWorkForm onAddBloodWorkForm={handleBloodWork}/>
            </FormControl>
            <h2>Bloodwork: </h2>
            {bloodValues.map((bloodWork)=>
            <BloodWorkCard key={bloodWork.id} bloodWork={bloodWork} />
            )}
        </>
    )
}