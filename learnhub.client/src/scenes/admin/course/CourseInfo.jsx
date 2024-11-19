import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import dayjs from "dayjs";
import * as yup from "yup";
import { Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import FormInputText from "../../../components/FormInputText";
import FormInputDropdown from "../../../components/FormInputDropdown";
import FormInputDatePicker from "../../../components/FormInputDatePicker";
import { useAddAdminCourse, useUpdateAdminCourse } from '../../../hooks/CourseHooks';
import { useFetchUsersByRole } from '../../../hooks/UserHooks';
import useSaveCancel from "../../../hooks/useSaveCancel"
import { useAuthenticatedUser } from "../../../hooks/useAuthorization";

const Required = "Required";

const validationSchema = yup.object({
    title: yup.string().required(Required).min(6, "Title must be at least 6 characters."),
    instructorId: yup.string().required(Required),
    startDate: yup.date().required(Required),
    endDate: yup.date().required(Required)
    // .when("startdate", {
    //     is: (start) => start != null,
    //     then: (end) =>
    //         end.min(yup.ref("coursestart"), "Course end must be after course start"),
    // })
});

const CourseInfo = () => {

    const formikRef = useRef();
    const { course, setUpdatedCourse } = useOutletContext();
    const [isDirty, setIsDirty] = useState(false);
    const { SaveCancelButtons, setShown } = useSaveCancel();
    const { data: instructors } = useFetchUsersByRole("Instructor");
    const addCourse = useAddAdminCourse();
    const updateCourse = useUpdateAdminCourse();
    const user = useAuthenticatedUser();
    const isEdit = !!course;

    const isDiabled = !user.isAdmin;

    useEffect(() => {
        setShown(isDirty);
    }, [isDirty]);

    const newCourse = {
        id: "0",
        title: "",
        description: "",
        instructorId: "",
        startDate: null,
        endDate: null,
    };

    const getCourse = () => {
        if (isEdit) {
            return {
                title: course.title,
                description: course.description,
                instructorId: course.instructorId,
                startDate: course.startDate ? dayjs(course.startDate) : null,
                endDate: course.endDate ? dayjs(course.endDate) : null
            }
        }
        return newCourse;
    }

    const handleFormSubmit = (values, submitProps) => {
        const formValues = {
            ...values,
            startDate: values.startDate.format("YYYY-MM-DD"),
            endDate: values.endDate.format("YYYY-MM-DD")
        };

        if (isEdit) {
            updateCourse.mutate({
                ...formValues,
                id: course.id
            }, {
                onSuccess: () => {
                    submitProps.resetForm({ values });
                    setUpdatedCourse(formValues);
                }
            });
        }
        else {
            addCourse.mutate(formValues, {
                onSuccess: ({ data: newCourse }) => {
                    setUpdatedCourse(newCourse);
                }
            });
        }
    }

    const handleSaveClicked = () => {
        formikRef.current.submitForm();
    }
    const handleCancelClicked = () => {
        formikRef.current.resetForm(getCourse());
    }

    return (instructors &&
        <Box height="100%" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'start' }}>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={getCourse()}
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
                                    label="Course Title"
                                    formik={formik}
                                    sx={{ gridColumn: "span 4" }}
                                    props={{
                                        disabled: isDiabled
                                    }}
                                />

                                <FormInputText
                                    name="description"
                                    label="Course Description"
                                    formik={formik}
                                    sx={{ gridColumn: "span 4" }}
                                    props={{
                                        multiline: true,
                                        minRows: 4,
                                        maxRows: 4,
                                        disabled: isDiabled
                                    }}
                                />

                                <FormInputDatePicker
                                    name="startDate"
                                    label="Course Start Date"
                                    formik={formik}
                                    sx={{ gridColumn: "span 1", minWidth: "200px" }}
                                    props={{
                                        disabled: isDiabled
                                    }}
                                />

                                <FormInputDatePicker
                                    name="endDate"
                                    label="Course End Date"
                                    formik={formik}
                                    sx={{ gridColumn: "span 1" }}
                                    props={{
                                        disabled: isDiabled
                                    }}
                                />

                                <FormInputDropdown
                                    name="instructorId"
                                    label="Instructor"
                                    formik={formik}
                                    options={instructors}
                                    sx={{ gridColumn: "span 1" }}
                                    props={{
                                        disabled: isDiabled
                                    }}
                                    optionsConverter={{
                                        key: (user) => {
                                            return `${user.id.toString()}`;
                                        },
                                        label: (user) => {
                                            return `${user.firstName} ${user.lastName}`;
                                        }
                                    }}
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

export default CourseInfo;