import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import moment from 'moment';

const Time = () => {
  const [time, setTime] = useState(null);
  const dispatch = useDispatch();

  const handleChangeDate = (selectedTime) => {
    setTime(selectedTime);
  };

  const onAccept = (selectedTime) => {
    dispatch.FrontPageModel.setTime(selectedTime.format('YYYY-MM-DDTHH:mm:SS'));
  };

  const handleKeyDown = (e) => {
    const date = moment(moment(e.target.value).format('YYYY-MM-DDTHH:mm'), 'YYYY-MM-DDTHH:mm', true);    
    if (e.key === 'Enter' && date.isValid()) {
      onAccept(date);
    }
  };

  const handleOnBlur = (e) => {
    const date = moment(moment(e.target.value).format('YYYY-MM-DDTHH:mm'), 'YYYY-MM-DDTHH:mm', true);
    if (date.isValid()) {
      onAccept(date);
    }
  };

  return (
    <Grid item xs={12} >
      <DateTimePicker
        label='Date and Time picker'
        value={time}
        inputFormat='YYYY-MM-DD HH:mm'
        closeOnSelect={true}
        onChange={handleChangeDate}
        onAccept={onAccept}
        renderInput={(params) => <TextField onKeyDown={handleKeyDown} onBlur={handleOnBlur} {...params} data-testid='date-time-picker' sx={{ width: '100%' }} />}
      />
    </Grid>
  )
};

export default Time;