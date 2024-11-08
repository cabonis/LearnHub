import { useRef  } from 'react';
import { useParams, useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import { mockCourseData } from "../../../data/mockData";
import Box from '@mui/material/Box';
import Header from "../../../components/Header";
import SaveCancel from "../../../components/SaveCancel";
import TabViewRouted from "../../../components/TabViewRouted";

const Course = () => {
  
  const { id } = useParams();
  const submitRef = useRef(); 
  const navigate = useNavigate();
  const { isDirty, setDirty } = useOutletContext();

  const numId = parseInt(id);
  const course = mockCourseData.find((c) => c.id === numId);
  
  const onSaveClick = () => {
    submitRef.current.requestSubmit();
  };

  const onCancelClick = () => {
    navigate("/admin/courses");
  };

  return (
        <Box m="10px" sx={{ display: "flex", flexDirection: "column"}}>
            
            <Header title="Course Editor" subtitle={course ? "Edit your course" : "Add new course"} />

            <TabViewRouted tabChanged={() => setDirty(false)} tabs={[
                { label: "Information", path: "" },
                ... course ? [{ label: "Enrollment", path: "enrollment" }] : [],
                ... course ? [{ label: "Announcements", path: "announcements" }] : [],
                ... course ? [{ label: "Modules", path: "modules" }] : []
              ]}
            />

            <Outlet context={{
                course: course,
                submitRef, submitRef,
                setDirty: setDirty,    
              }} 
            />

            <SaveCancel 
              isSaveShown={isDirty} 
              isCancelShown={true}
              saveClicked={onSaveClick}
              cancelClicked={onCancelClick}
              sx={{ position: 'absolute', right: 15, bottom: 15}}
            />

        </Box>
  );
}

export default Course;