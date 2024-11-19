import { Box, Typography } from "@mui/material";
import ProgressCircle from "../../components/ProgressCircle";
import dayjs from "dayjs";

const CourseDetailCard = ({ course, color }) => {

    const start = dayjs(course.startDate);
    const end = dayjs(course.endDate);
    const today = dayjs();

    const percentComplete = today > end ? 1 : (start.diff(today)) / (start.diff(end));

    return (
        <Box
            minWidth="450px"
            borderRadius="10px"
            m="0 20px"
            backgroundColor="primary.light"
            display="flex"
        >
            <Box
                width="20px"
                borderRadius="10px 0 0 10px"
                backgroundColor={color}
            />

            <Box
                flex="1 0"
                padding="10px"
                backgroundColor=""
                display="flex"
                flexDirection="column"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">

                    <Box>
                        <Typography variant="h5" color="neutral.light" fontWeight="bold" mb="5px">
                            Course Dates
                        </Typography>
                        <Typography variant="h6" color="neutral.main" fontWeight="bold" mb="5px">
                            {`${dayjs(course.startDate).format("MMM D, YYYY")} - ${dayjs(course.endDate).format("MMM D, YYYY")}`}
                        </Typography>
                    </Box>

                    <ProgressCircle progress={percentComplete} size="50" />

                </Box>

                <Typography mt="15px" color="neutral.light">
                    {course.description}
                </Typography>

            </Box>



        </Box>
    )
}

export default CourseDetailCard;