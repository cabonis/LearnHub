import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const menuProps = {
    PaperProps: { sx: { 
        maxHeight: 350,
        backgroundColor: 'primary.light'
        }
    }
}

const FormInputDropdown = ({ name, label, formik, sx, options, optionsConverter, props }) => {
  
    return (
        <FormControl
            error={!!formik.touched[name] && !!formik.errors[name]}
            variant="filled"      
            color="secondary"    
            sx={{
              ...sx,
            }} 
         >
            <InputLabel id={name}>{label}</InputLabel>
            
            <Select
                {...props}
                onChange={formik.handleChange}
                value={formik.values[name]}
                name={name}
                label={name}
                MenuProps={{
                  PaperProps: { sx: { 
                        maxHeight: 350,
                        backgroundColor: 'primary.light'
                      }
                  }
                }}
            >
                {options.map((option) => {
                    const key = optionsConverter.key(option);
                    const label = optionsConverter.label(option);
                    return (
                        <MenuItem key={key} value={key}>
                            {label}
                        </MenuItem>
                    )})}

            </Select>
            
            {(formik.touched[name] && formik.errors[name]) && (
              <FormHelperText>
                {formik.touched[name] && formik.errors[name]}
              </FormHelperText>
            )}

      </FormControl>
  );
};


export default FormInputDropdown;