import { Box } from "@mui/material";
import Header from "../../../../components/Header";

const ModuleAdd = () => {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Add Module" subtitle="Here is your calendar." />
            </Box>
        </Box>
    )
}

export default ModuleAdd;