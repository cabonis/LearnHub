import { useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from "../../.././../components/Header";
import TabViewRouted from "../../.././../components/TabViewRouted";

const ModuleAdd = () => {

    const navigate = useNavigate();
    const { course } = useOutletContext();

    const setUpdatedModule = (module) => {
        navigate(`/admin/course/${course.id}/${module.id}`);
    }

    return (
        <Box m="10px" sx={{ display: "flex", flexDirection: "column" }}>

            <Header title="Module Editor" subtitle="Add a new module" />

            <TabViewRouted tabs={[
                { label: "Information", path: "add" },
            ]}
            />

            <Outlet context={{
                course: course,
                setUpdatedModule: setUpdatedModule
            }}
            />

        </Box>
    );
}

export default ModuleAdd;