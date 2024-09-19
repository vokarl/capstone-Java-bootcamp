import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {BloodWork} from "../../models/blood-work.ts";
import axios from "axios";
import BloodWorkCard from "./BloodWorkCard.tsx";
import {Button, FormControl} from "@mui/material";
import BloodWorkForm from "./BloodWorkForm.tsx";
import dayjs from "dayjs";




export default function BloodWorkList(){
    const [bloodWorkValues, setBloodWorkValues] = useState<BloodWork[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isReverseOrder, setIsReverseOrder] = useState(false);

    function toggleOrder (){
        setIsReverseOrder(!isReverseOrder)
    }
    const handleBloodWorkForm = (newBloodWork: BloodWork) => {
        setBloodWorkValues(prevBloodWork =>[...prevBloodWork, newBloodWork]);
    }
    const handleSubmit =(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        compareEntries()
    }
    function compareEntries(): BloodWork[]{
        return bloodWorkValues.filter((bloodWorkValues:BloodWork)=>{
            const bloodValuesDate = dayjs(bloodWorkValues.dateTime).format("DD.MM.YYYY");
            const searchDate = dayjs(searchText).format("DD.MM.YYYY");
            return bloodValuesDate === searchDate;
        })
    }
    function renderBloodwork(): JSX.Element | JSX.Element[] {
        let sortedBloodwork = compareEntries();
        if (sortedBloodwork.length === 0 && ! searchText){
            sortedBloodwork = bloodWorkValues;
        }
        sortedBloodwork = sortedBloodwork.slice().sort((a:BloodWork,b:BloodWork)=>{
            if (isReverseOrder) {
                return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
            } else {
                return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
            }
        });
        if(sortedBloodwork.length > 0){
            return sortedBloodwork.map((bloodWorkValues)=>(
                <BloodWorkCard key={bloodWorkValues.id}
                               bloodWork={bloodWorkValues}
                               onDelete={handleDelete}
                               onUpdate={handleUpdate}
                />
            ));
        }else if(searchText && compareEntries().length === 0){
            return <p>entry not found</p>
        }else{
            return<p>No entries available</p>
        }
    }
    function fetchData(){
        axios.get<BloodWork[]>("api/blood-work")
            .then(response=>{
                setBloodWorkValues(response.data);
            })
            .catch(error =>{
                console.error("No data found!", error);
            })
    }
    useEffect(()=>{
        fetchData()
    },[]);

    const handleDelete = (id: string)=>{
        axios.delete(`api/blood-work/${id}`)
            .then(()=>{
                fetchData()
            })
            .catch(error =>{
                console.error("deletion not possible", error)
            })
    }
    const handleUpdate = (id: string, updatedBloodWork: BloodWork) =>{
        axios.put(`api/blood-work/${id}`, updatedBloodWork, {
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
            <FormControl>
                <BloodWorkForm onAddBloodWorkForm={handleBloodWorkForm}/>
            </FormControl>
            <form onSubmit={handleSubmit}>
                <p>search by date:</p>
                <input
                    type="date"
                    value={searchText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    placeholder="search"
                />
            </form>
            <div>Sort:</div>
            <Button
                variant="contained"
                onClick={toggleOrder}
            >
                {isReverseOrder ? 'Oldest First' : 'Newest First'}
            </Button>
            <h2>Bloodwork: </h2>
                     {renderBloodwork()}
        </>
    )
}