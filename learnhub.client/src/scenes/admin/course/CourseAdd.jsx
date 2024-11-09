import { Box } from "@mui/material";
import { useOutletContext } from 'react-router-dom';
import Header from "../../../components/Header";

const CourseAdd = () => {

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Add Course" subtitle="Welcome to your dashboard" />
            </Box>
        </Box>
    )
}

export default CourseAdd;