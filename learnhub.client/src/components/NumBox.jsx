import { Box, Typography } from "@mui/material";

const NumBox = ({ title, value, icon }) => {

    return (
        <Box flex="0" m="0 10px">

            <Box
                display="flex"
                flexDirection="column"
            >
                <Typography variant="h5" sx={{ color: "neutral.main" }}>
                    {title}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box mr="10px">
                        {icon}
                    </Box>
                    <Typography

                        variant="h1"
                        textAlign="left"
                        sx={{ color: "neutral.light" }}
                    >
                        {value}
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default NumBox;