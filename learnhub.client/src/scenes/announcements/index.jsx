import { Box } from "@mui/material";
import Header from "../../components/Header";

const Announcements = () => {
	return (
		<Box m="20px">		
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header title="Announcements" subtitle="Here are your announcements." />
			</Box>
		</Box>
	)
}

export default Announcements;