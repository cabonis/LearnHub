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

const FormInputDropdown = ({ name, control, label, sx, options, optionsConverter, props }) => {
  
    return (
    <Controller
      name={name}
      control={control}
      render={(renderProps) => (
        <FormControl
          error={!!renderProps.fieldState.error}
          color="secondary"
          varient="filled"          
          sx={{
            ...sx,
            backgroundColor: 'primary.main'
          }} 
        >
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            {...props}
            onChange={renderProps.field.onChange}
            value={renderProps.field.value}
            label={name}
            MenuProps={menuProps}
          >
            {options.map((option) => {
                const key = optionsConverter.key(option);
                const label = optionsConverter.label(option);
                return (
                    <MenuItem key={key} value={`${key}`}>
                        {label}
                    </MenuItem>
                )})}
          </Select>
          {renderProps.fieldState.error && (
            <FormHelperText>
              {renderProps.fieldState.error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};


export default FormInputDropdown;