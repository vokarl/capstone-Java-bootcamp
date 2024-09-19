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

    const handleBloodWorkForm = (newBloodWork: BloodWork) => {
        setBloodValues(prevBloodWork =>[...prevBloodWork, newBloodWork]);
    }
    const handleDelete = (id: string)=>{
        axios.delete(`api/blood-work/${id}`)
            .then(()=>{
                fetchData()
            })
            .catch(error =>{
                console.error("deletion not possible", error)
            })
    }
    return(
        <>
            <FormControl >
                <BloodWorkForm onAddBloodWorkForm={handleBloodWorkForm}/>
            </FormControl>
            <h2>Bloodwork: </h2>
            {bloodValues.map((bloodWork)=>
            <BloodWorkCard key={bloodWork.id} bloodWork={bloodWork} onDelete={handleDelete}/>
            )}
        </>
    )
}