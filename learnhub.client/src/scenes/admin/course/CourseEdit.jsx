import { useState } from 'react';
import Box from '@mui/material/Box';
import { useOutletContext, Outlet } from 'react-router-dom';
import Scene from '../../global/Scene';
import Header from "../../../components/Header";
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

    </Scene>
  );
}

export default CourseEdit;