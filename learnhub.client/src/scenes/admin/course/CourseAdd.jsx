import Box from '@mui/material/Box';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from "../../../components/Header";
import Scene from '../../global/Scene';
import TabViewRouted from "../../../components/TabViewRouted";

const CourseAdd = () => {

    const navigate = useNavigate();

    const setUpdatedCourse = (course) => {
        navigate(`/admin/course/${course.id}`);
    }

    return (
        <Scene
            title="Course Editor"
            subtitle="Add Course"
            breadcrumbs={[{
                title: "Course Catalog",
                link: "/admin/course"
            }, {
                title: "Add Course"
            }]}
        >
            <Box height="100%" display="flex" flexDirection="column" justifyContent="start" >

                <TabViewRouted tabs={[
                    { label: "Information", path: "add" }, ,
                ]}
                />

                <Outlet context={{
                    setUpdatedCourse: setUpdatedCourse
                }} />

            </Box>
        </Scene >
    );
}

export default CourseAdd;