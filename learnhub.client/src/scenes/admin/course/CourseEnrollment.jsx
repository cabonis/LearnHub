import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import SearchableTransferList from "../../../components/SearchableTransferList";
import { useFetchCourseEnrollment, useUpdateCourseEnrollment } from "../../../hooks/EnrollmentHooks";
import { useFetchUsers } from "../../../hooks/UserHooks";
import useSaveCancel from "../../../hooks/useSaveCancel"

const CourseEnrollment = () => {

   const { course } = useOutletContext();
   const { data: serverEnrollment } = useFetchCourseEnrollment(course.id);
   const { data: serverUsers } = useFetchUsers();
   const { SaveCancelButtons, setShown } = useSaveCancel();

   const [originalEnrolled, setOriginalEnrolled] = useState();
   const [enrolled, setEnrolled] = useState();
   const [originalAvailable, setOriginalAvailable] = useState();
   const updateEnrollment = useUpdateCourseEnrollment();

   useEffect(() => {
      if (serverEnrollment && serverUsers) {
         setEnrolled(serverEnrollment)
         setOriginalEnrolled(serverEnrollment);
         setOriginalAvailable(serverUsers.filter((u) => !serverEnrollment.some((e) => {
            return e.id === u.id;
         })));
      }
   }, [serverEnrollment, serverUsers]);

   useEffect(() => {
      setShown(!areEquivilant(enrolled, originalEnrolled));
   }, [enrolled]);

   const areEquivilant = (left, right) => {
      if (!left || !right)
         return true;
      if (left.length !== right.length)
         return false;
      return left.every(l => right.some((r) => r.id === l.id)) &&
         right.every(r => left.some((l) => l.id === r.id));
   }

   const enrollmentChanged = (_, newEnrolled) => {
      setEnrolled(newEnrolled)
   }

   const handleSaveClicked = () => {
      updateEnrollment.mutate({
         courseId: course.id,
         users: enrolled
      }, {
         onSuccess: () => {
            setOriginalEnrolled(enrolled);
         }
      });
   };

   const handleCancelClicked = () => {
      setOriginalEnrolled([...originalEnrolled]);
      setOriginalAvailable([...originalAvailable]);
   }

   return ((originalAvailable && originalEnrolled) &&
      <Box height="100%" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'start' }}>

         <SearchableTransferList
            leftTitle="Available"
            leftData={originalAvailable}
            rightTitle="Enrolled"
            rightData={originalEnrolled}
            dataChanged={enrollmentChanged}
            getId={(value) => value.id}
            getValue={(value) => `${value.firstName} ${value.lastName}`}
         />
         <SaveCancelButtons
            handleSaveClicked={handleSaveClicked}
            handleCancelClicked={handleCancelClicked}
         />
      </Box>
   )
}

export default CourseEnrollment;