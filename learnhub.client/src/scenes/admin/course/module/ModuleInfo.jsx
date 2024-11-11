import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import dayjs from "dayjs";
import * as yup from "yup";
import { Box } from "@mui/material";
import { useOutletContext, useNavigate } from "react-router-dom";
import FormInputText from "../../../../components/FormInputText";
import FormInputDatePicker from "../../../../components/FormInputDatePicker";
import { useAddModule, useUpdateModule } from "../../../../hooks/ModuleHooks";
import useSaveCancel from "../../../../hooks/useSaveCancel"

const Required = "Required";

const validationSchema = yup.object({
    title: yup.string().required(Required).min(6, "Title must be at least 6 characters."),
    startDate: yup.date().required(Required)
});

const newModule = {
    id: "0",
    title: "",
    description: "",
    startDate: null
};

const ModuleInfo = () => {

    const formikRef = useRef();
    const { course, module } = useOutletContext();
    const [isDirty, setIsDirty] = useState(false);
    const { SaveCancelButtons, setShown } = useSaveCancel();
    const navigate = useNavigate();
    const addModule = useAddModule();
    const updateModule = useUpdateModule();
    const isEdit = !!module;

    useEffect(() => {
        setShown(isDirty);
    }, [isDirty]);

    const getModule = () => {
        if (isEdit) {
            return {
                title: module.title,
                description: module.description,
                startDate: module.startDate ? dayjs(module.startDate) : null
            }
        }
        return newModule;
    }

    const handleFormSubmit = (values, submitProps) => {
        const moduleValues = {
            ...values,
            courseId: course.id,
            startDate: values.startDate.format("YYYY-MM-DD")
        };

        if (isEdit) {
            updateModule.mutate({
                ...moduleValues,
                id: module.id
            }, {
                onSuccess: () => {
                    submitProps.resetForm({ values });
                }
            });
        }
        else {
            addModule.mutate(moduleValues, {
                onSuccess: ({ data: newModule }) => {
                    navigate(`/admin/course/${course.id}/${newModule.id}`);
                }
            });
        }
    }

    const handleSaveClicked = () => {
        formikRef.current.submitForm();
    }
    const handleCancelClicked = () => {
        formikRef.current.resetForm(getModule());
    }

    return (
        <Box m="20px">
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={getModule()}
                validationSchema={validationSchema}
                innerRef={formikRef}
            >
                {(formik) => {

                    setTimeout(() => setIsDirty(formik.dirty), 0);

                    return (
                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            >

                                <FormInputText
                                    name="title"
                                    label="Module Title"
                                    formik={formik}
                                    sx={{ gridColumn: "span 4" }}
                                />

                                <FormInputText
                                    name="description"
                                    label="Module Description"
                                    formik={formik}
                                    sx={{ gridColumn: "span 4" }}
                                    props={{
                                        multiline: true,
                                        minRows: 4,
                                        maxRows: 4
                                    }}
                                />

                                <FormInputDatePicker
                                    name="startDate"
                                    label="Module Start Date"
                                    formik={formik}
                                    sx={{ gridColumn: "span 1", minWidth: "200px" }}
                                />

                            </Box>
                        </form>
                    )
                }
                }

            </Formik>
            <SaveCancelButtons
                handleSaveClicked={handleSaveClicked}
                handleCancelClicked={handleCancelClicked}
            />
        </Box>
    )
}

export default ModuleInfo;