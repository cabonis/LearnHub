import { useState, useEffect } from 'react';
import { useParams, useOutletContext, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Scene from '../../../global/Scene';
import Header from "../../../../components/Header";
import TabViewRouted from "../../../../components/TabViewRouted";
import { useFetchModule } from "../../../../hooks/ModuleHooks";

const ModuleEdit = () => {

    const { id, moduleid } = useParams();
    const { course } = useOutletContext();
    const { data: module } = useFetchModule(moduleid);
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

        </Scene>
    )
}

export default ModuleEdit;