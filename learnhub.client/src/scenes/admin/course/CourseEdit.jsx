import Box from '@mui/material/Box';
import { useOutletContext, Outlet } from 'react-router-dom';
import Header from "../../../components/Header";
import TabViewRouted from "../../../components/TabViewRouted";

const CourseEdit = () => {

  const { course } = useOutletContext();

  return (
    <Box m="10px" sx={{ display: "flex", flexDirection: "column" }}>

      <Header title="Course Editor" subtitle={course.title} />

      <TabViewRouted tabs={[
        { label: "Information", path: "" },
        ...course ? [{ label: "Enrollment", path: "enrollment" }] : [],
        ...course ? [{ label: "Announcements", path: "announcements" }] : [],
        ...course ? [{ label: "Modules", path: "modules" }] : []
      ]}
      />

      <Outlet context={{
        course: course,
      }}
      />

    </Box>
  );
}

export default CourseEdit;