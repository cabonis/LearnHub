import { useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from "../../.././../components/Header";
import TabViewRouted from "../../.././../components/TabViewRouted";

const ModuleAdd = () => {

    const navigate = useNavigate();
    const { course } = useOutletContext();

    return (
        <Box m="10px" sx={{ display: "flex", flexDirection: "column" }}>

            <Header title="Module Editor" subtitle="Add a new module" />

            <TabViewRouted tabs={[
                { label: "Information", path: "add" },
            ]}
            />

            <Outlet context={{
                course: course
            }}
            />

        </Box>
    );
}

export default ModuleAdd;