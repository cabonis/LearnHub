import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import dayjs from "dayjs";

const AnnoucementCard = ({ announcement }) => {

    const { dateTime, text, priority, color } = announcement;

    return (
        <Box
            minWidth="600px"
            minHeight="75px"
            borderRadius="10px"
            m="20px"
            color="black"
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
            >
                <Typography variant="h6" color="neutral.main" fontWeight="bold" mb="5px">
                    {dayjs(dateTime).format("MMM D, YYYY h:mm A")}
                </Typography>

                <Typography variant="h6" color="neutral.light">
                    {text}
                </Typography>
            </Box>

            <Box
                padding="5px"
            >
                {priority === "High" ?
                    <NotificationImportantOutlinedIcon
                        sx={{ color: 'red' }}
                        fontSize="large"
                    />
                    :
                    <InfoOutlinedIcon
                        sx={{ color: 'secondary.main' }}
                        fontSize="large"
                    />
                }
            </Box>

        </Box>
    )
}

export default AnnoucementCard;