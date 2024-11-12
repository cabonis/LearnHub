import { useState, useRef } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormInputText from "../../components/FormInputText";
import LoginContainer from "../../components/LoginContainer";
import FormInputCheckbox from "../../components/FormInputCheckbox";

const Required = "Required";
const validationSchema = yup.object({
    userName: yup.string().required(Required),
    password: yup.string().required(Required),
});

const Login = () => {

    const formikRef = useRef();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = (values) => {
        setError("");
        axios.post(`/api/auth/login`, values)
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                formikRef.current.setErrors({
                    "userName": "Check Username",
                    "password": "Check Password"
                });
                setError("Login Failed");
            });
    };

    return (

        <LoginContainer>
            <Box p="10px">
                <Typography component="h1" variant="h2" m="30px 0" color="neutral.light">
                    Sign In
                </Typography>

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{ userName: "", password: "", isPersistent: false }}
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
                                        name="userName"
                                        label="Username"
                                        formik={formik}
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    <FormInputText
                                        name="password"
                                        label="Password"
                                        formik={formik}
                                        sx={{ gridColumn: "span 4" }}
                                        props={{
                                            type: "password"
                                        }}
                                    />

                                    <FormInputCheckbox
                                        name="isPersistent"
                                        label="Remember Me"
                                        formik={formik}
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    <Button
                                        disabled={formik.dirty ? !formik.isValid : true}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => { }}
                                        sx={{ gridColumn: "span 4" }}
                                    >
                                        Sign in
                                    </Button>
                                </Box>
                            </form>
                        )
                    }}
                </Formik>
            </Box>

            <Box display="flex" justifyContent="center">
                <Typography sx={{ textAlign: 'center', margin: "10px 5px" }}>
                    Don&apos;t have an account?
                </Typography>

                <Typography sx={{ textAlign: 'center', margin: "10px 5px" }}>
                    <Link href="/register" variant="" sx={{ alignSelf: 'center', color: 'secondary.main' }} >
                        Register
                    </Link>
                </Typography>

            </Box>

            {error &&
                <Box display="flex" justifyContent="center">
                    <Typography color="error" sx={{ textAlign: 'center', margin: "10px 5px" }}>
                        {error}
                    </Typography>
                </Box>
            }

        </LoginContainer>

    );
}

export default Login;