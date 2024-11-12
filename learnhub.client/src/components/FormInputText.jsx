import { TextField } from "@mui/material";


const FormInputText = ({ name, label, formik, sx, props }) => {

  return (
    <TextField
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
      slotProps={{
        formHelperText: {
          sx: {
            position: "absolute",
            top: "52px"
          }
        },
      }}
      sx={sx}
      {...props}
    />
  );
};

export default FormInputText