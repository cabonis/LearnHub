import { useRef } from 'react';
import { TextField, FormControl } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

const FormInputDatePicker = ({ name, control, label, sx, props }) => {
        
    return (
      <Controller
        name={name}
        control={control}
        render={(renderProps) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    {...props}
                    onChange={(date) =>{renderProps.field.onChange(date)}}
                    defaultValue={null}
                    value={renderProps.field.value}
                    label={label}
                    slots={{
                        textField: (params) => 
                            <TextField
                                {...params}
                                varient='filled' 
                                color='secondary'
                                onKeyDown={(e) => e.preventDefault()}
                                error={!!renderProps.fieldState.error}
                                helperText={renderProps.fieldState.error?.message ?? null}
                                sx={{
                                    ...sx,
                                    backgroundColor: 'primary.main'
                                }}   
                            />
                    }}
                    slotProps={{
                        popper: {
                            sx: {
                                '& .MuiPaper-root': {
                                backgroundColor: 'primary.light',
                                },
                            },
                        },
                        day: {
                            sx: {
                            '&.MuiPickersDay-root.Mui-selected': {
                                backgroundColor: 'secondary.main',
                            },
                            }
                        },
                    }}
                    sx={{
                        ...sx
                      }}   
                />   
            </LocalizationProvider>
        )}
      />
    );
  };

  export default FormInputDatePicker