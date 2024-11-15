import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
	Box,
	List,
	ListItem,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import SquareIcon from '@mui/icons-material/Square';
import Header from "../../components/Header";
import Working from "../../components/Working";
import { useFetchEvents } from "../../hooks/EventsHooks";
import Scene from "../global/Scene";

const courseColors = [
	"#FF5733", // Bright Orange
	"#33A1FF", // Sky Blue
	"#FF33A8", // Pink
	"#33FF57", // Bright Green
	"#FFB733", // Gold
	"#8D33FF", // Purple
	"#33FFF6", // Cyan
	"#FF3357", // Coral Red
	"#33FF94", // Mint Green
	"#FF33E3", // Magenta
	"#B6FF33", // Lime
	"#3357FF", // Blue
	"#FF8E33", // Orange
	"#33FFB5", // Light Teal
	"#FF33B5", // Deep Pink
	"#DFFF33", // Chartreuse
	"#33FF83", // Pastel Green
	"#FF5733", // Bright Red-Orange
	"#57FF33", // Bright Lime Green
	"#FFA833"  // Amber
];

const Calendar = () => {
	const theme = useTheme();
	const [calData, setCalData] = useState();
	const { data } = useFetchEvents();

	useEffect(() => {

		const serverCourses = [];
		const serverEvents = [];

		if (data) {

			Object.entries(data).forEach(([key, value], index) => {

				const color = courseColors[index];
				serverCourses.push({ title: key, color: color });
				serverEvents.push(...value.map((e) => ({
					...e,
					color: color,
					textColor: "black"
				})));
			});

			setCalData({ courses: serverCourses, events: serverEvents });
		}

	}, [data]);

	if (!calData) return (<Working />)
	return (
		<Scene
			title="Calendar"
			subtitle="Upcoming Events"
		>
			<Box display="flex" justifyContent="space-between">

				<Box flex="1 1 100%" ml="15px"
					sx={{
						"& .fc-list-day": {
							color: theme.palette.primary.main,
							'--fc-page-bg-color': theme.palette.primary.light
						},
						"& .fc-day-today": {
							backgroundColor: `${theme.palette.neutral.main} !important`,
						}
					}}>
					<FullCalendar
						height="72vh"
						plugins={[
							dayGridPlugin,
							timeGridPlugin,
							interactionPlugin,
							listPlugin,
						]}
						headerToolbar={{
							left: "prev,next today",
							center: "title",
							right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
						}}
						initialView="dayGridMonth"
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						initialEvents={calData.events}
					/>
				</Box>

				<Box
					flex="1 1 20%"
					p="10px"
					mt="50px"
				>
					<Typography variant="h4" sx={{ textAlign: "center" }}>Courses</Typography>
					<List dense>
						{calData.courses.map((course) => (
							<ListItem
								key={course.title}
								sx={{
									margin: "0",
									borderRadius: "2px",
								}}
							>
								<SquareIcon sx={{
									color: course.color,
									mr: "10px"
								}} />
								<ListItemText primary={course.title} />
							</ListItem>
						))}
					</List>
				</Box>

			</Box>
		</Scene>
	);
};

export default Calendar;