import { Box } from "@mui/material";
import Header from "../../components/Header";

const Scene = ({ title, subtitle, text, children }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
        >
            <Header title={title} subtitle={subtitle} text={text}></Header>
            <Box flex="1">
                {children}
            </Box>
        </Box>
    )
}

export default Scene;