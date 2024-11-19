import { Box, Typography } from "@mui/material";


const NotFound = () => {
    return (
        <Box
            display="flex"
            height="100%"
            alignItems="center"
        >
            <Box flex="1">
                <Typography textAlign="center" variant="h2">
                    Page Not Found
                </Typography>
            </Box>
        </Box>
    )
}

export default NotFound;