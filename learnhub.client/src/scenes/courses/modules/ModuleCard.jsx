import { Box, Typography } from "@mui/material";
import VoiceChatOutlinedIcon from '@mui/icons-material/VoiceChatOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from 'react-router-dom';
import NumBox from "../../../components/NumBox";
import dayjs from "dayjs";

const iconStyle = {
    color: "neutral.light"
}


const ModuleCard = ({ module, color }) => {

    const navigate = useNavigate();

    return (
        <Box
            minHeight="125px"
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
            onClick={() => navigate(`/course/${module.courseId}/${module.id}`)}
        >
            <Box
                width="20px"
                borderRadius="10px 0 0 10px"
                backgroundColor={color}
            />

            <Box
                flex="1 0"
                padding="10px"
                display="flex"
            >
                <Box
                    minWidth="150px"
                >
                    <Typography variant="h5" color="neutral.light" fontWeight="bold" mb="5px">
                        {module.title}
                    </Typography>

                    <Typography variant="h6" color="neutral.main">
                        {dayjs(module.startDate).format("MMM D, YYYY")}
                    </Typography>
                </Box>

                <Box
                    flex="1"
                    display="flex"
                    justifyContent="space-around"
                    alignItems="end"
                >
                    <NumBox title="Lectures" value={0} icon={<VoiceChatOutlinedIcon sx={iconStyle} />} />
                    <NumBox title="Content" value={module.contentCount} icon={<FileCopyOutlinedIcon sx={iconStyle} />} />
                    <NumBox title="Assignments" value={0} icon={<BorderColorOutlinedIcon sx={iconStyle} />} />
                </Box>
            </Box>

        </Box>
    )
}

export default ModuleCard;