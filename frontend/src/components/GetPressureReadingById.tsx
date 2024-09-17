import {PressureReading} from "../models/PressureReading.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import PressureCard from "./PressureCard.tsx";
import dayjs from "dayjs";
import {Button} from "@mui/material";

type PressureByIdProps ={
readings: PressureReading[];
    onDelete:(pressureId: string) => void;
    onUpdate: (pressureId: string, updatedReading: PressureReading) => void;
}
export default function GetPressureReadingById({readings, onUpdate, onDelete}: Readonly<PressureByIdProps>){
    const [searchText, setSearchText] = useState("");
    const [isReverseOrder, setIsReverseOrder] = useState(false);

    function toggleOrder (){
        setIsReverseOrder(!isReverseOrder)
    }

    const handleSubmit =(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        compareReadings()
    }

 function compareReadings(): PressureReading[] {
        return readings.filter((reading: PressureReading) => {
            const readingDate = dayjs(reading.dateTime).format("DD.MM.YYYY");
            const searchDate = dayjs(searchText).format("DD.MM.YYYY");
           return readingDate === searchDate;
        });
    }


        const renderReadings = ()=>{
            let sortedReadings = compareReadings();
            if (sortedReadings.length === 0 && !searchText ){
                sortedReadings = readings;
            }
            sortedReadings = sortedReadings.slice().sort((a, b) => {
                if (isReverseOrder) {
                    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
                } else {
                    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
                }
            });

            if (sortedReadings.length > 0){
                return sortedReadings.map((reading) =>(
                    <PressureCard key={reading.id}
                                  pressureReading={reading}
                                  onDelete={onDelete}
                                  onUpdate={onUpdate}
                    />
                ));
            }else if(searchText && compareReadings().length === 0){
                return <p>reading with date not found</p>
            } else{
                return <p>No readings available</p>
            }

    }
    return(
        <div className="search-field">
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={searchText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    placeholder="search"
                />
                <button type="submit">submit</button>
            </form>
            <div className="reading-by-id">
                <div>Sort:</div>
                <Button
                    variant="contained"
                    onClick={toggleOrder}
                >
                    {isReverseOrder ? 'Oldest First' : 'Newest First'}
                </Button>

                <div>readings:</div>
                {renderReadings()}
            </div>
        </div>
    )
}
