import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';

const FormInputCheckbox = ({ name, label, formik, sx, props }) => {
    return (
        <FormControlLabel
            control={<Checkbox
                checked={formik.values[name]}
                color="primary"
                onChange={formik.handleChange}
                sx={{
                    [`&, &.${checkboxClasses.checked}`]: {
                        color: 'secondary.main',
                    }
                }} />}
            name={name}
            label={label}
            sx={sx}
            {...props}
        />
    );
}

export default FormInputCheckbox;