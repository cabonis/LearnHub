import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
import Button from "@mui/material/Button";
import { mockDataUsers } from "../../data/mockData";
import dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInputText from "../../components/FormInputText";
import FormInputDropdown from "../../components/FormInputDropdown";
import FormInputDatePicker from "../../components/FormInputDatePicker";

const validationSchema = yup.object({
    title: yup.string().required("Title is required").min(6, "Title must be at least 6 characters."),
    instructor: yup.string().required("Instructor is required"),
    coursestart: yup.date().required("Start date is required"),    
    courseend: yup.date().required("End date is required")
        .when("coursestart", {
            is: (start) => start != null,
            then: (end) =>
                end.min(yup.ref("coursestart"), "Course end must be after course start"),
        })
  });



const CourseInfo = ({course, submitRef, setDirty}) => {
    
    const courseInfo = course ?? {
        id: 1,
        title: "Physics 101",
        description: "Some course description",
        startdate: "2024-11-5",
        enddate: "2024-12-25",
        instructor: {
            id: 5,
            firstName: "John",
            lastName: "Smith"
        }
    };

    const { handleSubmit, control, reset, formState } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema),
            defaultValues: {
            title: courseInfo.title,
            description: courseInfo.description,
            instructor: courseInfo.instructor.id,
            coursestart: dayjs(courseInfo.startdate),
            courseend: dayjs(courseInfo.enddate)
            },
      });

      const { isDirty } = useFormState({ control });


      useEffect(() => {
        setDirty && setDirty(isDirty);
      }, [isDirty]);


    const onSubmit = () => {
        if(formState.isValid) {
            reset(null, { keepValues: true});
            setDirty(false);
        }
    }

	return (    
                
            <form ref={submitRef} onSubmit={handleSubmit(onSubmit)}>
                
                <FormInputText
                    name="title"
                    control={control}
                    label="Course Title"
                    sx={{ mb: 4 }}
                />

                <FormInputText
                    name="description"
                    control={control}
                    label="Course Description"
                    sx={{ mb: 4 }}
                    props={{
                        multiline: true,
                        minRows: 4,
                        maxRows: 4
                    }}
                />                   

                <Box display="flex">   
                    <FormInputDatePicker 
                        name="coursestart"
                        control={control}
                        label="Course Start Date"
                        sx={{ mb:4, mr: 2, minWidth: 200 }}
                    />
                    <FormInputDatePicker 
                        name="courseend"
                        control={control}
                        label="Course End Date"
                        sx={{ mb:4, minWidth: 200 }}
                    />   
                </Box>

                <FormInputDropdown
                    name="instructor"
                    control={control}
                    label="Instructor"
                    options={mockDataUsers}
                    sx={{ mb:4, minWidth: 200 }}
                    optionsConverter={{
                        key: (user) => {
                            return `${user.id}`;
                        },
                        label: (user) => {
                            return `${user.firstName} ${user.lastName}`;
                        }
                    }}
                    
                />

            </form>
	)
}

export default CourseInfo;