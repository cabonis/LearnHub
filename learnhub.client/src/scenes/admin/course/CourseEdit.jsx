import { useState } from 'react';
import Box from '@mui/material/Box';
import { useOutletContext, Outlet } from 'react-router-dom';
import Scene from '../../global/Scene';
import TabViewRouted from "../../../components/TabViewRouted";

const CourseEdit = () => {

  const { course } = useOutletContext();
  const [title, setTitle] = useState(course.title);

  const setUpdatedCourse = (course) => {
    setTitle(course.title);
  }

  return (
    <Scene
      title="Course Editor"
      subtitle={title}
    >
      <Box height="100%" display="flex" flexDirection="column" justifyContent="start" >

        <TabViewRouted tabs={[
          { label: "Information", path: "" },
          ...course ? [{ label: "Enrollment", path: "enrollment" }] : [],
          ...course ? [{ label: "Announcements", path: "announcements" }] : [],
          ...course ? [{ label: "Modules", path: "modules" }] : []
        ]}
        />

        <Outlet context={{
          course: course,
          setUpdatedCourse: setUpdatedCourse
        }}
        />

      </Box>

    </Scene>
  );
}

export default CourseEdit;