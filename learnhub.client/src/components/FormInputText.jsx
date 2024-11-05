import { TextField, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputText = ({ name, control, label, sx, props }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={(renderProps) => (
            <TextField
              {...props}  
              onChange={renderProps.field.onChange}
              value={renderProps.field.value}
              error={!!renderProps.fieldState.error}
              helperText={renderProps.fieldState.error?.message ?? null}
              fullWidth
              color="secondary"
              label={label}
              sx={{
                ...sx,
                backgroundColor: 'primary.main'
              }}            
            />
        )}
      />
    );
  };

  export default FormInputText