import { TextField } from "@mui/material";

const FormInputText = ({ name, label, formik, sx, props }) => {
    return (
      <TextField
                {...props}
                fullWidth
                variant="filled"
                type="text"
                color="secondary"
                label={label}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[name]}
                name={name}
                error={!!formik.touched[name] && !!formik.errors[name]}
                helperText={formik.touched[name] && formik.errors[name]}
                sx={sx}
      />
    );
  };

  export default FormInputText