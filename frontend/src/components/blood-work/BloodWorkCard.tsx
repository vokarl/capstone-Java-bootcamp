import {BloodWork} from "../../models/blood-work.ts";
import {Box, Button, Card, CardContent, styled, TextField, Typography} from "@mui/material";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";

type BloodWorkCardProps ={
    bloodWork : BloodWork;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedBloodWork:{
        id: string;
        dateTime: string;
        gfr: number;
        crp: number;
    })=> void;
}
export default function BloodWorkCard({ bloodWork, onDelete, onUpdate }: Readonly<BloodWorkCardProps>) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedDateTime, setUpdatedDateTime] = useState<Dayjs | null>(null);
    const [updatedGfr, setUpdatedGfr] = useState<number | undefined>();
    const [updatedCrp, setUpdatedCrp] = useState<number | undefined>();

    const formattedDate = dayjs(bloodWork.dateTime).isValid()
        ? dayjs(bloodWork.dateTime).format("D.M.YYYY---HH:mm")
        : "Invalid Date";

    function toggleEdit(){
        setIsEditMode(!isEditMode);
    }
    const handleSave = ()=>{
        const updatedBloodWork = {
            ...bloodWork,
            dateTime: updatedDateTime ? updatedDateTime.toISOString() : bloodWork.dateTime,
            gfr: updatedGfr !== undefined ? updatedGfr : bloodWork.gfr,
            crp: updatedCrp !== undefined ? updatedCrp : bloodWork.crp,
        };
        onUpdate(bloodWork.id, updatedBloodWork);
        setIsEditMode(false);
    }

    return (
        <Card sx={{ padding: 0,
            display: "flex",
            flexDirection:"row",
            mr: 20,
        }}>
            <CardContent sx={{
                padding: 1,
                display:"flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems:"center",
                gap: 1}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleEdit}>
                    edit
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}>
                    save
                </Button>

                <Button
                variant="contained"
                color="primary"
                onClick={()=> onDelete(bloodWork.id)}>DEL.</Button>
                {isEditMode ?
                    <StyledDateBox>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Date"
                                value={updatedDateTime}
                                onChange={(newValue) => setUpdatedDateTime(newValue)}
                                format="DD/MM/YYYY HH:mm"
                                ampm={false}
                            /></LocalizationProvider>
                    </StyledDateBox>:
                    <Typography sx={styles.typography}>
                        Date/Time: {formattedDate.toString()}
                    </Typography>}

                {isEditMode ? <StyledBox>
                        <TextField
                            type="number"
                            value={updatedGfr !== undefined ? updatedGfr : ''}
                            onChange={(event) =>
                                setUpdatedGfr(event.target.value !== '' ? Number(event.target.value) : undefined)}
                            placeholder="Gfr"
                            required
                        />  </StyledBox>
                    : <Typography sx={styles.typography}>GFR: {bloodWork.gfr}</Typography>}

                {isEditMode ? <StyledBox>
                        <TextField
                            type="number"
                            value={updatedCrp !== undefined ? updatedCrp : ''}
                            onChange={(event) =>
                                setUpdatedCrp(event.target.value !== '' ? Number(event.target.value) : undefined)}
                            placeholder="Crp"
                            required
                        />  </StyledBox>
                    :
                <Typography sx={styles.typography}>CRP: {bloodWork.crp}</Typography>}
            </CardContent>
        </Card>
    );
}


const styles = {
    typography: {
        fontSize: "14px",
        width: '150px',
        textAlign: 'center'
    }
};
const StyledDateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    backgroundColor: theme.palette.background.paper,
    padding: "4px",
    marginBottom: "20px",
    borderRadius: "8px",

}));
const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    backgroundColor: theme.palette.background.paper,
    padding: "4px",
    marginBottom: "20px",
    borderRadius: "8px",

}));
