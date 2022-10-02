import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

const Time = () => {
  const [time, setTime] = useState(null);
  const handleChangeDate = (selectedTime) => {
    setTime(selectedTime);
  };

  return (
    <Grid item xs={12} >
      <DateTimePicker
        label='Date and Time picker'
        value={time}
        inputFormat='YYYY-MM-DD HH:mm'
        closeOnSelect={true}
        onChange={handleChangeDate}
        renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} data-testid='date-time-picker' />}
      />
    </Grid>
  )
};

export default Time;