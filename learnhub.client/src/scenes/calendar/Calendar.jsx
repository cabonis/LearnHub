import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, useTheme } from "@mui/material";
import Working from "../../components/Working";
import { useFetchEvents } from "../../hooks/EventsHooks";
import getCourseColor from "../../hooks/courseColorsRegistry";
import Scene from "../global/Scene";
import CourseLegend from "../../components/CourseLegend";

const Calendar = () => {
	const theme = useTheme();
	const [calData, setCalData] = useState();
	const { data } = useFetchEvents();

	useEffect(() => {

		const serverCourses = [];
		const serverEvents = [];

		if (data) {

			Object.entries(data).forEach(([key, value]) => {

				const color = getCourseColor(key);
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
					<CourseLegend courses={calData.courses} />
				</Box>

			</Box>
		</Scene>
	);
};

export default Calendar;