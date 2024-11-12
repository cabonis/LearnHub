import { useState } from 'react';
import Box from '@mui/material/Box';
import { useOutletContext, Outlet } from 'react-router-dom';
import Header from "../../../components/Header";
import TabViewRouted from "../../../components/TabViewRouted";

const CourseEdit = () => {

  const { course } = useOutletContext();
  const [title, setTitle] = useState(course.title);

  const setUpdatedCourse = (course) => {
    setTitle(course.title);
  }

  return (
    <Box m="10px" sx={{ display: "flex", flexDirection: "column" }}>

      <Header title="Course Editor" subtitle={title} />

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
  );
}

export default CourseEdit;