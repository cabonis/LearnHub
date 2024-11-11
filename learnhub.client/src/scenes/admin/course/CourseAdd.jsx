import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from "../../../components/Header";
import TabViewRouted from "../../../components/TabViewRouted";

const CourseAdd = () => {

    return (
        <Box m="10px" sx={{ display: "flex", flexDirection: "column" }}>

            <Header title="Course Editor" subtitle="Add a new course" />

            <TabViewRouted tabs={[
                { label: "Information", path: "add" }, ,
            ]}
            />

            <Outlet context={{}} />

        </Box>
    );
}

export default CourseAdd;