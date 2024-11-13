import { useState, useRef } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormInputText from "../../components/FormInputText";
import LoginContainer from "../../components/LoginContainer";

const Required = "Required";
const Match = "Passwords must match"
const validationSchema = yup.object({
    currentPassword: yup.string().required(Required),
    newPassword: yup.string().required(Required)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password is too weak"),
    confirmNewPassword: yup.string().required(Required)
        .oneOf([yup.ref('newPassword'), null], Match)
});

const ChangePassword = ({ open, completed }) => {

    const formikRef = useRef();
    const [error, setError] = useState("");

    const handleFormSubmit = (values) => {
        setError("");
        axios.post(`/api/auth`, {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        })
            .then(() => {
                completed();
            })
            .catch(() => {
                formikRef.current.setErrors({
                    "currentPassword": "Check Current Password"
                });
                setError("Change Password Failed");
            });
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>
                <LoginContainer>
                    <Box p="10px">
                        <Typography component="h1" variant="h2" m="30px 0" color="neutral.light">
                            Change Password
                        </Typography>

                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={{ currentPassword: "", newPassword: "", confirmNewPassword: "" }}
                            validationSchema={validationSchema}
                            innerRef={formikRef}
                        >
                            {(formik) => {

                                return (
                                    <form onSubmit={formik.handleSubmit}>
                                        <Box
                                            display="grid"
                                            gap="25px"
                                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        >

                                            <FormInputText
                                                name="currentPassword"
                                                label="Current Password"
                                                formik={formik}
                                                sx={{ gridColumn: "span 4" }}
                                                props={{
                                                    type: "password"
                                                }}
                                            />

                                            <FormInputText
                                                name="newPassword"
                                                label="New Password"
                                                formik={formik}
                                                sx={{ gridColumn: "span 4" }}
                                                props={{
                                                    type: "password"
                                                }}
                                            />

                                            <FormInputText
                                                name="confirmNewPassword"
                                                label="Confirm New Password"
                                                formik={formik}
                                                sx={{ gridColumn: "span 4", mb: "20px" }}
                                                props={{
                                                    type: "password"
                                                }}
                                            />

                                            <Button
                                                disabled={formik.dirty ? !formik.isValid : true}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => { }}
                                                sx={{ gridColumn: "span 2" }}
                                            >
                                                Change
                                            </Button>

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="neutral"
                                                onClick={completed}
                                                sx={{ gridColumn: "span 2" }}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </form>
                                )
                            }}
                        </Formik>
                    </Box>

                    {error &&
                        <Box display="flex" justifyContent="center">
                            <Typography color="error" sx={{ textAlign: 'center', margin: "10px 5px" }}>
                                {error}
                            </Typography>
                        </Box>
                    }

                </LoginContainer>
            </div>
        </Modal>
    );
}

export default ChangePassword;