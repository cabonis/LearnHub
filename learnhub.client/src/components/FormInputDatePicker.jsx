import { useRef } from 'react';
import { TextField, FormControl } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useField, useFormikContext } from "formik";
import dayjs from "dayjs";

const FormInputDatePicker = ({ name, label, formik, sx, props }) => {
        
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                {...props}
                label={label}
                name={name}
                color="secondary"
                value={formik.values[name]}
                onChange={(value) => formik.setFieldValue(name, value, true)}
                slotProps={{
                    textField: {
                        color: "secondary",
                        variant: "filled",
                        onBlur: () => formik.setFieldTouched(name),
                        error: !!formik.touched[name] && !!formik.errors[name],
                        helperText: formik.touched[name] && formik.errors[name]
                    },
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
    );
  };

  export default FormInputDatePicker