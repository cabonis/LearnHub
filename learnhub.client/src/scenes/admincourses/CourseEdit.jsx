import { useState, useRef, useEffect  } from 'react';
import Box from '@mui/material/Box';
import CourseInfo from './CourseInfo';
import CourseEnrollment from './CourseEnrollment';
import CourseModules from './CourseModules'
import CourseAnnouncements from './CourseAnnouncements'
import { useParams, useBlocker } from 'react-router-dom';
import { mockCourseData } from "../../data/mockData";
import Header from "../../components/Header";
import SaveCancel from "../../components/SaveCancel";
import TabView from "../../components/TabView";
import ConfirmDialog from '../../components/ConfirmDialog';


export default function CourseEdit() {
  
  const { id } = useParams();
  const submitRef = useRef(); 
  const [isDirty, setDirty] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const blocker = useBlocker(isDirty);

  useEffect(() => {
    setDialogOpen(blocker.state === "blocked");
  }, [blocker]);


  const course = mockCourseData.find((course) => course.id === id);

  const props = {
    course: course,
    submitRef, submitRef,
    setDirty: setDirty,    
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

  const onCancelClick = () => {};

  return (
        <Box sx={{ display: "flex", flexDirection: "column"}}>
            
            <Header title="Course Editor" subtitle="" />
            
            <TabView tabs={[
                { label: "Information", component: (<CourseInfo {...props} />) },
                { label: "Enrollment", component: (<CourseEnrollment />) },
                { label: "Announcements", component: (<CourseAnnouncements />) },
                { label: "Modules", component: (<CourseModules />) }
              ]}
            />

          <ConfirmDialog open={isDialogOpen} onClose={handleClose} />

          {/* {blocker.state === "blocked" ? (
                  <div>
                    <p>Are you sure you want to leave?</p>
                    <button onClick={() => blocker.proceed()}>
                      Proceed
                    </button>
                    <button onClick={() => blocker.reset()}>
                      Cancel
                    </button>
                  </div>
                ) : null} */}

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