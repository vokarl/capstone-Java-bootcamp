import {PressureReading} from "../models/PressureReading.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import PressureCard from "./PressureCard.tsx";

type PressureByIdProps ={
readings: PressureReading[];
}

export default function GetPressureReadingById(props: Readonly<PressureByIdProps>){
    const [searchText, setSearchText] = useState("");
    const [submittedText, setSubmittedText] = useState("");

    const handleSubmit =(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setSubmittedText(searchText);
    }
    const filteredReadings : PressureReading[] = submittedText ?
        props.readings.filter((reading:PressureReading)=>
            reading.date.includes(submittedText)): [];

    const noReadingsMessage = submittedText && filteredReadings.length === 0 ? (
        <p className="no-pressures-found">No pressures found </p>
    ): null;


    return(
        <div className="search-field">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    placeholder="search"
                />
                <button type="submit">submit</button>
            </form>
            {submittedText  && filteredReadings.length > 0 ? (
                <div className="reading-by-id">
                    <div>reading: </div>
                    {filteredReadings.map(reading =>(
                        <PressureCard key={reading.pressureId} pressureReading={reading} fetchData={()=>{}}/>
                    ))}
                </div>
            ) : noReadingsMessage}

        </div>
    );
}