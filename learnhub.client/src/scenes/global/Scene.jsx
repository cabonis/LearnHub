import { Box } from "@mui/material";

const Scene = ({ children }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
        >
            {children}
        </Box>
    )
}

export default Scene;