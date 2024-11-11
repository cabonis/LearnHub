import { useState, useEffect, useMemo } from 'react';
import { Box } from "@mui/material";
import SearchableTransferList from "../../../components/SearchableTransferList";
import { mockDataUsers } from "../../../data/mockData";
import { mockCourseData } from "../../../data/mockData";
import { useOutletContext } from "react-router-dom";
import { useFetchCourseEnrollment, useUpdateCourseEnrollment } from "../../../hooks/EnrollmentHooks";
import { useFetchUsers } from "../../../hooks/UserHooks";

const CourseEnrollment = () => {

   const { course, submitRef, setDirty } = useOutletContext();
   const { data: serverEnrollment } = useFetchCourseEnrollment(course.id);
   const { data: serverUsers } = useFetchUsers();
   const updateEnrollment = useUpdateCourseEnrollment();

   const [originalEnrolled, setOriginalEnrolled] = useState();
   const [enrolled, setEnrolled] = useState();
   const [available, setAvailable] = useState();

   useEffect(() => {
      if (serverEnrollment && serverUsers) {
         setEnrolled(serverEnrollment)
         setOriginalEnrolled(serverEnrollment);
         setAvailable(serverUsers.filter((u) => !serverEnrollment.some((e) => {
            return e.id === u.id;
         })));

      }
   }, [serverEnrollment, serverUsers]);

   useEffect(() => {
      setDirty(!areEquivilant(enrolled, originalEnrolled));
   }, [enrolled, originalEnrolled]);

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

   const handleFormSubmit = (e) => {
      e.preventDefault();
      updateEnrollment.mutate({
         courseId: course.id,
         users: enrolled
      }, {
         onSuccess: () => {
            setOriginalEnrolled(enrolled);
         }
      });
   };

   return ((available && serverEnrollment) &&
      <Box m="20px" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
         <form ref={submitRef} onSubmit={handleFormSubmit}>
            <SearchableTransferList
               leftTitle="Available"
               leftData={available}
               rightTitle="Enrolled"
               rightData={serverEnrollment}
               dataChanged={enrollmentChanged}
               getId={(value) => value.id}
               getValue={(value) => `${value.firstName} ${value.lastName}`} />
         </form>
      </Box>
   )
}

export default CourseEnrollment;