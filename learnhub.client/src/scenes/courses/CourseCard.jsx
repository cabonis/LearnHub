import { Box, Typography } from "@mui/material";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import NumBox from "../../components/NumBox";
import ProgressCircle from "../../components/ProgressCircle";
import getCourseColor from "../../hooks/courseColorsRegistry";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

const iconStyle = {
    color: "neutral.light"
}

const CourseCard = ({ course }) => {

    const navigate = useNavigate();
    const start = dayjs(course.startDate);
    const end = dayjs(course.endDate);
    const today = dayjs();

    const percentComplete = today > end ? 1 : (start.diff(today)) / (start.diff(end));

    return (
        <Box
            minWidth="450px"
            minHeight="200px"
            borderRadius="10px"
            m="20px"
            color="black"
            backgroundColor="primary.light"
            display="flex"
            sx={{
                border: 1,
                borderColor: 'primary.main',
                '&:hover': {
                    cursor: 'pointer',
                    borderColor: "secondary.main"
                }
            }}
            onClick={() => navigate(`/course/${course.id}`)}
        >
            <Box
                width="20px"
                borderRadius="10px 0 0 10px"
                backgroundColor={getCourseColor(course.title)}
            />

            <Box
                flex="1 0"
                padding="10px"
                backgroundColor=""
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box display="flex" justifyContent="space-between">

                    <Box>
                        <Typography variant="h4" color="neutral.light" fontWeight="bold" mb="5px">
                            {course.title}
                        </Typography>

                        <Typography variant="h6" color="neutral.main">
                            {`${course.instructor.firstName} ${course.instructor.lastName}`}
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mr="20px"
                        mt="5px"
                    >
                        <Typography variant="h5" color="neutral.main" mb="5px">
                            Course Completion
                        </Typography>
                        <ProgressCircle progress={percentComplete} />
                    </Box>

                </Box>

                <Box
                    display="flex"
                    justifyContent="space-around"
                >
                    <NumBox title="Modules" value={course.moduleCount} icon={<LibraryBooksOutlinedIcon sx={iconStyle} />} />
                    <NumBox title="Students" value={course.userCount} icon={<PersonOutlinedIcon sx={iconStyle} />} />
                    <NumBox title="Announcements" value={course.announcementCount} icon={<AnnouncementOutlinedIcon sx={iconStyle} />} />
                </Box>
            </Box>



        </Box>
    )
}

export default CourseCard;