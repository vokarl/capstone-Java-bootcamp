import {PressureReading} from "../models/PressureReading.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import PressureCard from "./PressureCard.tsx";
import dayjs from "dayjs";

type PressureByIdProps ={
readings: PressureReading[];
    onDelete:(pressureId: string) => void;
    onUpdate: (pressureId: string, updatedReading: PressureReading) => void;
}




export default function GetPressureReadingById({readings, onUpdate, onDelete}: Readonly<PressureByIdProps>){
    const [searchText, setSearchText] = useState("");

    const handleSubmit =(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        filteredReadings()
    }

 function filteredReadings(): PressureReading[] {
        return readings.filter((reading: PressureReading) => {
            const readingDate = dayjs(reading.date).format("DD.MM.YYYY");
            const searchDate = dayjs(searchText).format("DD.MM.YYYY");
           return readingDate === searchDate;
        });
    }
        const renderReading = ()=>{
            if (filteredReadings().length > 0){
                return filteredReadings().map((reading) =>(
                    <PressureCard key={reading.id}
                                  pressureReading={reading}
                                  onDelete={onDelete}
                                  onUpdate={onUpdate}
                    />
                ));
            }else if(searchText && filteredReadings().length === 0){
                return <p>reading with date not found</p>
            } else{
                return readings
                    .sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(reading =>(
                    <PressureCard key={reading.id}
                                  pressureReading={reading}
                                  onDelete={onDelete}
                                  onUpdate={onUpdate}
                    />
                ))
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
                <div>readings: </div>
                {renderReading()}
        </div>
        </div>
    )
}
