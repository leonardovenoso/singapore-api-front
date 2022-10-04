import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import moment from 'moment';

const Time = () => {
  const [time, setTime] = useState(null);
  const dispatch = useDispatch();
  const handleChangeDate = () => {};
  const onAccept = (selectedTime) => {
    const date = moment(moment(selectedTime).format('YYYY-MM-DDTHH:mm'), 'YYYY-MM-DDTHH:mm', true);
    date.isValid() && dispatch.FrontPageModel.setTime(date.format('YYYY-MM-DDTHH:mm:SS'));
    setTime(selectedTime);
  };
  const handleKeyDown = (e) => e.key === 'Enter' &&  onAccept(e.target.value);

  return (
    <Grid item xs={12} >
      <DateTimePicker
        label='Date and Time picker'
        value={time}
        inputFormat='YYYY-MM-DD HH:mm'
        closeOnSelect={true}
        onChange={handleChangeDate}
        onAccept={onAccept}
        maxDateTime={moment()}
        renderInput={(params) => <TextField onKeyDown={handleKeyDown} {...params} data-testid='date-time-picker' sx={{ width: '100%' }} />}
      />
    </Grid>
  )
};

export default Time;