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

const Required = "Required";
const Match = "Passwords must match"
const validationSchema = yup.object({
    userName: yup.string().required(Required),
    firstName: yup.string().required(Required),
    lastName: yup.string().required(Required),
    password: yup.string().required(Required)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password is too weak"),
    confirmPassword: yup.string().required(Required)
        .oneOf([yup.ref('password'), null], Match)
});

const Register = () => {

    const formikRef = useRef();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = (values) => {
        setError("");
        axios.post(`/api/auth/register`, values)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                if (error.status === 500) {
                    formikRef.current.setErrors({
                        "userName": "Username is taken"
                    });
                }
                setError("Registration Failed");
            });
    };

    return (

        <LoginContainer>
            <Box p="10px">
                <Typography component="h1" variant="h2" m="25px 0" color="neutral.light">
                    Register
                </Typography>

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        userName: "",
                        firstName: "",
                        lastName: "",
                        password: "",
                        isPersistent: false
                    }}
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
                                        name="firstName"
                                        label="First Name"
                                        formik={formik}
                                        sx={{ gridColumn: "span 2" }}
                                    />

                                    <FormInputText
                                        name="lastName"
                                        label="Last Name"
                                        formik={formik}
                                        sx={{ gridColumn: "span 2" }}
                                    />

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
                                        sx={{ gridColumn: "span 2" }}
                                        props={{
                                            type: "password"
                                        }}
                                    />

                                    <FormInputText
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        formik={formik}
                                        sx={{ gridColumn: "span 2" }}
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
                                        sx={{ gridColumn: "span 4" }}
                                    >
                                        Register
                                    </Button>
                                </Box>
                            </form>
                        )
                    }}
                </Formik>
            </Box>

            <Box display="flex" justifyContent="center">
                <Typography sx={{ textAlign: 'center', margin: "10px 5px" }}>
                    Already have an account?
                </Typography>

                <Typography sx={{ textAlign: 'center', margin: "10px 5px" }}>
                    <Link href="/login" variant="" sx={{ alignSelf: 'center', color: 'secondary.main' }} >
                        Login
                    </Link>
                </Typography>

            </Box>

            {error &&
                <Box display="flex" justifyContent="center">
                    <Typography color="error" sx={{ textAlign: 'center', margin: "5px 5px" }}>
                        {error}
                    </Typography>
                </Box>
            }

        </LoginContainer>

    );
}

export default Register;