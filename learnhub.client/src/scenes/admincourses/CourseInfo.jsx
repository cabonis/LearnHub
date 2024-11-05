import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { mockDataUsers } from "../../data/mockData";
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


const CourseInfo = () => {
    
    const { handleSubmit, control } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema),
            defaultValues: {
            title: "",
            description: "",
            instructor: "",
            coursestart: null,
            courseend: null
            },
      });

    const onSubmit = () => {}

    const dropDownConverter = {
        key: (user) => {
            return `${user.lastName}`;
        },
        label: (user) => {
            return `${user.firstName} ${user.lastName}`;
        }
    }

	return (
            <Box>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    
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
                        optionsConverter={dropDownConverter}
                        sx={{ mb:4, minWidth: 200 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2, display: "block" }}
                        >
                        Submit
                    </Button>

                </form>

            </Box>
	)
}

export default CourseInfo;