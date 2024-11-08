import { useState, useRef } from 'react';
import { useParams, useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import { mockCourseData } from "../../../data/mockData";
import Box from '@mui/material/Box';
import Header from "../../../components/Header";
import SaveCancel from "../../../components/SaveCancel";
import TabViewRouted from "../../../components/TabViewRouted";

const Module = () => {

    const { courseid, moduleid } = useParams();
    const submitRef = useRef();
    const navigate = useNavigate();
    const { isDirty, setDirty } = useOutletContext();
    const [isSaveCancel, setSaveCancel] = useState(true);

    const courseNumId = parseInt(courseid);
    const course = mockCourseData.find((c) => c.id === courseNumId);
    const moduleNumId = parseInt(moduleid);
    const module = course.modules.find((m) => m.id === moduleNumId);

    const onSaveClick = () => {
        submitRef.current.requestSubmit();
    };

    const onCancelClick = () => {
        navigate(`/admin/course/${courseid}/modules`);
    };

    const onTabChanged = () => {
        setDirty(false);
        setSaveCancel(true);
    }


    return (
        <Box m="10px" sx={{ display: "flex", flexDirection: "column" }}>

            <Header title="Module Editor" subtitle={module ? module.title : "Add new module"} />

            <TabViewRouted tabChanged={() => onTabChanged()} tabs={[
                { label: "Information", path: "" },
                ...module ? [{ label: "Content", path: "content" }] : []
            ]}
            />

            <Outlet context={{
                course: course,
                submitRef, submitRef,
                setDirty: setDirty,
                setSaveCancel: setSaveCancel
            }}
            />

            <SaveCancel
                isSaveShown={false}
                isCancelShown={true}
                saveClicked={onSaveClick}
                cancelClicked={onCancelClick}
                sx={{ position: 'absolute', right: 15, bottom: 15 }}
            />

        </Box>
    )
}

export default Module;