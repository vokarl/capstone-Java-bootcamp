import {PressureReading} from "../models/PressureReading.ts";

type PressureCardProps ={
    pressureReading: PressureReading;
    fetchData: () => void;
}

export default function PressureCard({pressureReading}: Readonly<PressureCardProps>) {


    return (
        <div>
            <div>
                <p>Date: {pressureReading.date}</p>

                <p>Time: {pressureReading.time}</p>

            </div>
            <div>
                <p>Systolic: {pressureReading.systolic}</p>

                <p>Diastolic: {pressureReading.diastolic}</p>


                <p>BPM: {pressureReading.bpm}</p>


            </div>
        </div>

    )
}







