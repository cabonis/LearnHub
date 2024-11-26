import { useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from "../../.././../components/Header";
import Scene from '../../../global/Scene';
import TabViewRouted from "../../.././../components/TabViewRouted";

const ModuleAdd = () => {

    const navigate = useNavigate();
    const { course } = useOutletContext();

    const setUpdatedModule = (module) => {
        navigate(`/admin/course/${course.id}/${module.id}`);
    }

    return (
        <Scene
            title="Module Editor"
            subtitle={`${course.title}:`}
            breadcrumbs={[{
                title: "Course Catalog",
                link: "/admin/course"
            }, {
                title: course.title,
                link: `/admin/course/${course.id}/modules`
            }, {
                title: "Add Module"
            }]}
        >
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
        </Scene>
    );
}

export default ModuleAdd;