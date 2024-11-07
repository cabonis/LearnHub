import { useState, useRef, useEffect  } from 'react';
import { useParams, useBlocker, useNavigate, Outlet } from 'react-router-dom';
import { mockCourseData } from "../../data/mockData";
import Box from '@mui/material/Box';
import Header from "../../components/Header";
import SaveCancel from "../../components/SaveCancel";
import ConfirmDialog from '../../components/ConfirmDialog';
import TabViewRouted from "../../components/TabViewRouted";


export default function CourseEdit() {
  
  const { id } = useParams();
  const submitRef = useRef(); 
  const [isDirty, setDirty] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const blocker = useBlocker(isDirty);
  const navigate = useNavigate();

  useEffect(() => {
    setDialogOpen(blocker.state === "blocked");
  }, [blocker]);

  const numId = parseInt(id);
  const course = mockCourseData.find((c) => c.id === numId);

  const dirtyChanged = (isdirty) => {
    setDirty(isdirty);
  }

  const context = {
    course: course,
    submitRef, submitRef,
    setDirty: dirtyChanged,    
  }

  const handleClose = (value) => {
    if(value)
      blocker.proceed();
    else {
      blocker.reset();
      setDialogOpen(false);
    }
  }

  const onSaveClick = () => {
    submitRef.current.requestSubmit();
  }

  const onCancelClick = () => {
    navigate("/admin/courses");
  };

  return (
        <Box m="10px" sx={{ display: "flex", flexDirection: "column"}}>
            
            <Header title="Course Editor" subtitle={course ? "Edit your course" : "Add new course"} />

            <TabViewRouted tabChanged={() => setDirty(false)} tabs={[
                { label: "Information", path: "" },
                ... course ? { label: "Enrollment", path: "enrollment" } : [],
                ... course ? { label: "Announcements", path: "announcements" } : [],
                ... course ? { label: "Modules", path: "modules" } : []
              ]}
            />

            <Outlet context={context} />

            <ConfirmDialog open={isDialogOpen} onClose={handleClose} text={"Unsaved changes will be lost. Are you sure you wish to continue?"} />

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