import { useState } from 'react';
import { Box, useTheme } from "@mui/material";
import Button from '@mui/material/Button';
import { tokens } from "../../theme";
import { mockCourseData } from "../../data/mockData";
import CourseGrid from "./CourseGrid";
import CourseEdit from "./CourseEdit";
import Header from "../../components/Header";

const AdminCourses = () => {
	
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	
	const [courses, setCourses] = useState(mockCourseData);
	const [nextCourseId, updateNextCourseId] = useState(10);

	const addCourse = () => {
		setCourses([...courses, 
		{
			id: nextCourseId,
			title: "Astronomy 101",
			instructor: {
				id: 1,
				firstName: "First1",
				lastName: "Last1"
			}
		}]);
		
		let newCourseId = nextCourseId + 1;
		updateNextCourseId(newCourseId);
	};

	return (
	  <Box m="20px">
		<Box display="flex" justifyContent="space-between">
			<Header title="Course Catalog" subtitle="Manage course catalog" />
		</Box>
		<CourseGrid gridData={courses}/>
	  </Box>
	);
  };

export default AdminCourses;