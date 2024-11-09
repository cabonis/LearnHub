import { Box } from "@mui/material";
import { mockDataUsers } from "../../../data/mockData";
import { Formik } from "formik";
import dayjs from "dayjs";
import * as yup from "yup";
import { useOutletContext } from "react-router-dom";
import FormInputText from "../../../components/FormInputText";
import FormInputDropdown from "../../../components/FormInputDropdown";
import FormInputDatePicker from "../../../components/FormInputDatePicker";
import { useAddCourse, useUpdateCourse } from '../../../hooks/CourseHooks';


const Required = "Required";

const validationSchema = yup.object({
    title: yup.string().required(Required).min(6, "Title must be at least 6 characters."),
    instructorid: yup.string().required(Required),
    startdate: yup.date().required(Required),
    enddate: yup.date().required(Required)
    // .when("startdate", {
    //     is: (start) => start != null,
    //     then: (end) =>
    //         end.min(yup.ref("coursestart"), "Course end must be after course start"),
    // })
});

const CourseInfo = () => {

    const { course, submitRef, setDirty } = useOutletContext();
    const addCourse = useAddCourse();
    const updateCourse = useUpdateCourse();

    const defaultCourse = {
        id: "0",
        title: "",
        description: "",
        instructorid: "",
        startdate: null,
        enddate: null,
    };

    const getCourse = () => {
        if (course) {
            return {
                id: course.id,
                title: course.title,
                description: course.description,
                instructorid: course.instructor.id,
                startdate: course.startdate ? dayjs(course.startdate) : null,
                enddate: course.enddate ? dayjs(course.enddate) : null
            }
        }

        return defaultCourse;
    }

    const handleFormSubmit = (values, submitProps) => {
        const mutation = course ? updateCourse : addCourse;
        mutation.mutate({
            ...values,
            startdate: values.startdate.format("YYYY-MM-DD"),
            enddate: values.enddate.format("YYYY-MM-DD")
        });
        submitProps.resetForm({ values });
    };

    return (
        <Box m="20px">
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={getCourse()}
                validationSchema={validationSchema}
            >
                {(formik) => {

                    setTimeout(() => setDirty(formik.dirty), 0);

                    return (
                        <form ref={submitRef} onSubmit={formik.handleSubmit}>
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
                                />

                                <FormInputText
                                    name="description"
                                    label="Course Description"
                                    formik={formik}
                                    sx={{ gridColumn: "span 4" }}
                                    props={{
                                        multiline: true,
                                        minRows: 4,
                                        maxRows: 4
                                    }}
                                />

                                <FormInputDatePicker
                                    name="startdate"
                                    label="Course Start Date"
                                    formik={formik}
                                    sx={{ gridColumn: "span 1", minWidth: "200px" }}
                                />

                                <FormInputDatePicker
                                    name="enddate"
                                    label="Course End Date"
                                    formik={formik}
                                    sx={{ gridColumn: "span 1" }}
                                />

                                <FormInputDropdown
                                    name="instructorid"
                                    label="Instructor"
                                    formik={formik}
                                    options={mockDataUsers}
                                    sx={{ gridColumn: "span 1" }}
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
        </Box>
    )
}

export default CourseInfo;