import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import moment from 'moment';

const Time = () => {
  const [time, setTime] = useState(null);
  const dispatch = useDispatch();
  const handleChangeDate = (selectedTime) => setTime(selectedTime);
  const onAccept = (selectedTime) => {
    const date = moment(moment(selectedTime).format('YYYY-MM-DDTHH:mm'), 'YYYY-MM-DDTHH:mm', true);
    date.isValid() && dispatch.FrontPageModel.setTime(date.format('YYYY-MM-DDTHH:mm:SS'));
  };
  const handleKeyDown = (e) => e.key === 'Enter' &&  onAccept(e.target.value);
  const handleOnBlur = (e) => onAccept(e.target.value);

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