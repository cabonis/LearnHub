import { Box } from "@mui/material";
import Header from "../../components/Header";

const Courses = () => {
	return (
		<Box m="20px">		
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header title="Courses" subtitle="Here are a list of your courses." />
			</Box>
		</Box>
	)
}

export default Courses;