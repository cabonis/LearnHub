import { Box } from "@mui/material";
import Scene from "../global/Scene";
import Header from "../../components/Header";

const Announcements = () => {
	return (
		// <Box flex="1" backgroundColor="blue">
		// 	<Box display="flex" flexDirection="column" justifyContent="center" backgroundColor="yellow">

		// 		<Box flex="0 0" backgroundColor="lightblue">
		// 			<Header title="Announcements" subtitle="Here are your announcements." />
		// 		</Box>

		// 		<Box flex="1" alignSelf="stretch" backgroundColor="pink">Some Content Some ContentSome ContentSome ContentSome ContentSome Content</Box>


		// 	</Box>
		// </Box>
		<Scene
			title="Announcements"
			subtitle="Here are your announcements">

			<Box
				height="100%"
				backgroundColor="blue">
				Test 2
			</Box>

		</Scene>
	)
}

export default Announcements;