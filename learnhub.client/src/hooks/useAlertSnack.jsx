
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const useAlertSnack = () => {

    const [state, setState] = useState({
        open: false,
        message: "",
    });

    const { open, message } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const showAlert = (message) => {
        setState({ message: message, open: true });
    }

    const AlertSnack = () => {
        return (
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    variant="filled"
                    severity="error"
                    onClose={handleClose}
                    sx={{
                        width: "300px"
                    }}
                >
                    {message}
                </Alert>

            </Snackbar>
        )
    }

    return [AlertSnack, showAlert];
};

export default useAlertSnack;