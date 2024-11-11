import { useState, useRef } from 'react';
import { useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from "../../../components/Header";
import SaveCancel from "../../../components/SaveCancel";
import TabViewRouted from "../../../components/TabViewRouted";
import CourseInfo from './CourseInfo';

const CourseAdd = () => {

    const submitRef = useRef();
    const navigate = useNavigate();
    const { isDirty, setDirty } = useOutletContext();
    const [isSaveCancel, setSaveCancel] = useState(true);

    const onSaveClick = () => {
        submitRef.current.requestSubmit();
    };

    const onCancelClick = () => {
        navigate("/admin/course");
    };

    return (
        <Box m="10px" sx={{ display: "flex", flexDirection: "column" }}>

            <Header title="Course Editor" subtitle="Add a new course" />

            <TabViewRouted tabs={[
                { label: "Information", path: "add" }, ,
            ]}
            />

            <Outlet context={{
                submitRef, submitRef,
                setDirty: setDirty,
                setSaveCancel: setSaveCancel
            }}
            />

            <SaveCancel
                isSaveShown={isSaveCancel && isDirty}
                isCancelShown={true}
                saveClicked={onSaveClick}
                cancelClicked={onCancelClick}
                sx={{ position: 'absolute', right: 15, bottom: 15 }}
            />

        </Box>
    );
}

export default CourseAdd;