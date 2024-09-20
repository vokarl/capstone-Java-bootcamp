import {BloodWork} from "../../models/blood-work.ts";
import {Dayjs} from "dayjs";
import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import {TextField} from "@mui/material";
import {StyledBox, StyledButton, StyledDateBox} from "../Styles.ts";
type BloodWorkFormProps ={
    onAddBloodWorkForm: (newBloodWork: BloodWork) => void;
}

export default function BloodWorkForm({onAddBloodWorkForm}:Readonly<BloodWorkFormProps>){
  const [dateTime, setDateTime] = useState<Dayjs|null>(null);
  const [gfr, setGfr] = useState<number | undefined>();
  const [crp, setCrp] = useState<number | undefined>();

  const handleSubmit = (event: React.FormEvent)=>{
      event.preventDefault();

      if(!dateTime || gfr === undefined || crp === undefined){
          return;
      }
      const dateTimeString = dateTime.toISOString();
      const newBloodWork ={
          id: '',
          dateTime: dateTimeString,
          gfr,
          crp,
      };

      axios.post<BloodWork> ("api/blood-work", newBloodWork)
          .then(response=>{
              onAddBloodWorkForm(response.data);
              setDateTime(null);
              setGfr(undefined);
              setCrp(undefined);
          })
          .catch(error =>{
              console.error("Error adding new pressure reading", error);
          })
  };


  return (<form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "row", gap: "6px"}}>
      <StyledDateBox>
          <StyledButton type="submit" variant="contained" color="primary" size="small">
              +</StyledButton>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                  label="Date"
                  value={dateTime}
                  onChange={(newValue) => setDateTime(newValue)}
                  format="DD/MM/YYYY HH:mm"
                  ampm={false}
              /></LocalizationProvider>
      </StyledDateBox>

      <StyledBox>
          <TextField
              type="number"
              value={gfr !== undefined ? gfr : ''}
              onChange={(event) =>
                  setGfr(event.target.value !== '' ? Number(event.target.value) : undefined)}
              placeholder="Gfr"
              required

          />  </StyledBox>
      <StyledBox sx={{ display: "flex", gap: "16px" }}>

          <TextField
              type="number"
              value={crp !== undefined ? crp : ''}
              onChange={(event) =>
                  setCrp(event.target.value !== '' ? Number(event.target.value) : undefined)}
              placeholder="Crp"
              required
          />
      </StyledBox>
     </form>
    );
}





