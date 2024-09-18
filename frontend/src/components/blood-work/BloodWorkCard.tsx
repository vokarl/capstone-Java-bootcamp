import {BloodWork} from "../../models/blood-work.ts";
import {Card, Typography} from "@mui/material";

type BloodWorkCardProps ={
    bloodWork : BloodWork;
}
export default function BloodWorkCard({ bloodWork }: Readonly<BloodWorkCardProps>) {
    console.log("Rendering BloodWorkCard with:", bloodWork);

    return (
        <Card>

            <Typography>GFR: {bloodWork.dateTime}</Typography>
            <Typography>GFR: {bloodWork.gfr}</Typography>
            <Typography>CRP: {bloodWork.crp}</Typography>
        </Card>
    );
}



