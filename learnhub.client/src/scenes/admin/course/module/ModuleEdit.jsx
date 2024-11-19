import { useState, useEffect } from 'react';
import { useParams, useOutletContext, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Scene from '../../../global/Scene';
import TabViewRouted from "../../../../components/TabViewRouted";
import { useFetchAdminModule } from "../../../../hooks/ModuleHooks";

const ModuleEdit = () => {

    const { id, moduleid } = useParams();
    const { course } = useOutletContext();
    const { data: module } = useFetchAdminModule(moduleid);
    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(module?.title);
    }, [module]);

    const setUpdatedModule = (updated) => {
        setTitle(updated.title);
    }

    return (module &&
        <Scene
            title="Module Editor"
            subtitle={`${course.title}:`}
            text={title}
        >
            <Box height="100%" display="flex" flexDirection="column" justifyContent="start" >

                <TabViewRouted tabs={[
                    { label: "Information", path: "" },
                    ...module ? [{ label: "Content", path: "content" }] : []
                ]}
                />

                <Outlet context={{
                    course: course,
                    module: module,
                    setUpdatedModule: setUpdatedModule
                }}
                />

            </Box>

        </Scene>
    )
}

export default ModuleEdit;