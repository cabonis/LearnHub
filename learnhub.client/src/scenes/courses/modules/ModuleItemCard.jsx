import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import dayjs from "dayjs";

const ModuleItemCard = ({ text, icon, color, handleClick }) => {

    return (
        <Box
            flex=".33"
            minHeight="40px"
            minWidth="250px"
            borderRadius="10px"
            m="20px"
            color="black"
            backgroundColor="primary.light"
            display="flex"
            onClick={handleClick}
            sx={{
                border: 1,
                borderColor: 'primary.main',
                '&:hover': {
                    cursor: 'pointer',
                    borderColor: "secondary.main"
                }
            }}
        >
            <Box
                width="20px"
                borderRadius="10px 0 0 10px"
                backgroundColor={color}
            />

            <Box
                flex="1 0"
                padding="10px"
            >
                <Typography variant="h6" color="neutral.light">
                    {text}
                </Typography>
            </Box>

            <Box
                padding="10px"
                display="flex"
                alignItems="center"
                color="neutral.light"
            >
                {icon}
            </Box>

        </Box >
    )
}

export default ModuleItemCard;