import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const ModuleDetailCard = ({ module, color }) => {

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
                            {dayjs(module.startDate).format("MMM D, YYYY")}
                        </Typography>
                    </Box>
                </Box>

                <Typography mt="15px" color="neutral.light">
                    {module.description}
                </Typography>

            </Box>



        </Box>
    )
}

export default ModuleDetailCard;