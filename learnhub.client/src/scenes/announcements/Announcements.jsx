import { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Scene from "../global/Scene";
import dayjs from "dayjs";
import CourseLegend from "../../components/CourseLegend";
import getCourseColor from "../../hooks/courseColorsRegistry";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import { useFetchAnnouncements } from "../../hooks/AnnouncementHooks";
import Working from "../../components/Working";
import Divider from '@mui/material/Divider';

const sortByDateDesc = (a, b) => {
	return dayjs(a.dateTime) - dayjs(b.dateTme);
}

const sortByDateAsc = (a, b) => {
	return sortByDateDesc(b, a);
}

const sortByCourse = (a, b) => {
	return a.courseId - b.courseId;
}

const Announcements = () => {

	const { data } = useFetchAnnouncements();
	const [announcemens, setAnnouncements] = useState();
	const [courses, setCourses] = useState();

	useEffect(() => {

		const serverCourses = [];
		const serverAnnouncements = [];

		if (data) {

			Object.entries(data).forEach(([key, value]) => {

				const color = getCourseColor(key);
				serverCourses.push({ title: key, color: color });
				serverAnnouncements.push(...value.map((a) => ({
					...a,
					color: color
				})));
			});


			setCourses(serverCourses);
			setAnnouncements(serverAnnouncements.sort(sortByDateAsc));
		}

	}, [data]);


	if (!announcemens) return (<Working />)
	return (

		<Scene
			title="Announcements"
			subtitle="Consolidated Across All Courses">

			<Box
				height="75vh"
				backgroundColor="lightblue"
				display="flex"
				padding="10px"
			>

				<Box
					flex="1"
					backgroundColor=""
					display="flex"
					flexWrap="wrap"
					alignItems="flex-start"
					justifyContent="center"
					overflow="auto"
				>

					{announcemens.map((a) => (
						<AnnouceCard announcement={a} key={a.id} />
					))}
				</Box>

				<Box minWidth="200px" pl="20px" pt="20px">
					{courses &&
						<CourseLegend courses={courses} />
					}
				</Box>

			</Box>
		</Scene>
	)
}

const AnnouceCard = ({ announcement }) => {

	const { dateTime, text, priority, color } = announcement;

	return (
		<Box
			flex=".5"
			minWidth="700px"
			minHeight="75px"
			borderRadius="10px"
			m="20px"
			color="black"
			backgroundColor="primary.light"
			display="flex"
		>
			<Box
				width="20px"
				borderRadius="10px 0 0 10px"
				backgroundColor={color}
			/>

			<Box
				flex="1"
				padding="10px"
			>
				<Typography variant="h6" color="neutral.main" fontWeight="bold" mb="5px">
					{dayjs(dateTime).format("MMM D, YYYY h:mm A")}
				</Typography>

				<Typography variant="h6" color="neutral.light">
					{text}
				</Typography>

			</Box>

			<Box
				padding="5px"
			>
				{priority === "High" ?
					<NotificationImportantOutlinedIcon
						sx={{ color: 'red' }}
						fontSize="large"
					/>
					:
					<InfoOutlinedIcon
						sx={{ color: 'secondary.main' }}
						fontSize="large"
					/>
				}
			</Box>


		</Box>
	)
}

export default Announcements;