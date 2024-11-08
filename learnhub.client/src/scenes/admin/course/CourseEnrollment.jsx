import { useState, useEffect, useMemo } from 'react';
import { Box } from "@mui/material";
import SearchableTransferList from "../../../components/SearchableTransferList";
import { mockDataUsers } from "../../../data/mockData";
import { mockCourseData } from "../../../data/mockData";
import { useOutletContext } from "react-router-dom";


const CourseEnrollment = () => {

   const { course, submitRef, setDirty } = useOutletContext();
   const [originalEnrolled, setOriginalEnrolled] = useState(course.users);
   const [enrolled, setEnrolled] = useState(course.users);

   useEffect(() => {
      setDirty(!areEquivilant(enrolled, originalEnrolled));
   }, [enrolled, originalEnrolled]);

   const available = mockDataUsers.filter((value) => !enrolled.some((item) => {
      return item.id === value.id;
   }));

   const areEquivilant = (left, right) => {

      if (left.length !== right.length)
         return false;

      return left.every(l => right.some((r) => r.id === l.id)) &&
         right.every(r => left.some((l) => l.id === r.id));
   }

   const enrollmentChanged = (newAvailable, newEnrolled) => {
      setEnrolled(newEnrolled)
   }

   const handleFormSubmit = (e) => {
      e.preventDefault();
      // Save data
      setOriginalEnrolled(enrolled);
   };

   return (
      <Box m="20px" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
         <form ref={submitRef} onSubmit={handleFormSubmit}>
            <SearchableTransferList
               leftTitle="Available"
               leftData={available}
               rightTitle="Enrolled"
               rightData={enrolled}
               dataChanged={enrollmentChanged}
               getId={(value) => value.id}
               getValue={(value) => `${value.firstName} ${value.lastName}`} />
         </form>
      </Box>
   )
}

export default CourseEnrollment;