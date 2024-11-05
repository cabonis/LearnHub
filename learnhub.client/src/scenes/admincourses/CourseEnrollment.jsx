import { Box } from "@mui/material";
import SearchableTransferList from "../../components/SearchableTransferList";
import { mockDataUsers } from "../../data/mockData";
import { mockCourseData } from "../../data/mockData";


const CourseEnrollment = ({course}) => {

   const enrolledUsers = mockCourseData[0].users;
   const availableUsers = mockDataUsers.filter((value) => !enrolledUsers.some((item) => {
    return item.id === value.id;
   }));


	return (
		<Box m="20px" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>		
			<SearchableTransferList 
                leftTitle="Available"
                leftData={availableUsers}
                rightTitle="Enrolled"
                rightData={enrolledUsers}
                getId={(value) => value.id}
                getValue={(value) => `${value.firstName} ${value.lastName}`}/>            
		</Box>
	)
}

export default CourseEnrollment;