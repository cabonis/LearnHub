import { Box, Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

const LearnHubLogo = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
        >
            <SchoolIcon fontSize="large" sx={{ mr: "8px" }} />
            <Typography variant="h3" color="neutral.light">
                LearnHub
            </Typography>
        </Box>

    );
}

export default LearnHubLogo;