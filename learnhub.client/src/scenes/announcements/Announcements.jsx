import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import Scene from "../global/Scene";
import CourseLegend from "../../components/CourseLegend";
import Working from "../../components/Working";
import ClearableTextBox from "../../components/ClearableTextBox";
import getCourseColor from "../../hooks/courseColorsRegistry";
import { useFetchAnnouncements } from "../../hooks/AnnouncementHooks";
import AnnoucementCard from "./AnnouncementCard";
import Slide from '@mui/material/Slide';
import { animationDuration } from '../../styles';

const Announcements = () => {

	const { data } = useFetchAnnouncements();
	const [announcements, setAnnouncements] = useState();
	const [announcementsDisplay, setAnnouncementsDisplay] = useState();

	const [courses, setCourses] = useState();
	const [sortBy, setSortBy] = useState(1);
	const [filter, setFilter] = useState("");

	useEffect(() => {

		const serverCourses = [];
		const serverAnnouncements = [];

		if (data) {

			Object.entries(data).forEach(([key, value]) => {

				const color = getCourseColor(key);
				serverCourses.push({ title: key, color: color });
				serverAnnouncements.push(...value.map((a) => ({
					...a,
					dayjsDT: dayjs(a.dateTime),
					color: color
				})));
			});

			setCourses(serverCourses);
			setAnnouncements(serverAnnouncements);
		}

	}, [data]);

	useEffect(() => {

		if (announcements) {

			const sorted = [...announcements].sort(getSort())
			const filtered = sorted.filter((item) => item.text.toUpperCase().includes(filter.toUpperCase()));

			setAnnouncementsDisplay(filtered);
		}


	}, [announcements, sortBy, filter]);

	const getSort = () => {
		if (sortBy === 1) return (a, b) => b.dayjsDT.valueOf() - a.dayjsDT.valueOf();
		if (sortBy === 2) return (a, b) => a.dayjsDT.valueOf() - b.dayjsDT.valueOf();
		if (sortBy === 3) return (a, b) => a.priority.localeCompare(b.priority);
		return (a, b) => b.courseId - a.courseId;;
	}

	if (!announcementsDisplay) return (<Working />)
	return (

		<Scene
			title="Announcements"
			subtitle="Consolidated Across All Courses">

			<Box
				height="74vh"
				display="flex"
				flexDirection="column"
			>

				<Box
					backgroundColor=""
					mb="15px"
				>
					<FormControl
						variant="filled"
						color="secondary"
						sx={{ minWidth: "200px", mt: "8px" }}
					>
						<InputLabel>Sort By</InputLabel>
						<Select
							value={sortBy}
							label="Sort By"
							onChange={(e) => setSortBy(e.target.value)}
						>
							<MenuItem value={1}>Date Descending</MenuItem>
							<MenuItem value={2}>Date Ascending</MenuItem>
							<MenuItem value={3}>Priority</MenuItem>
							<MenuItem value={4}>Course</MenuItem>
						</Select>

					</FormControl>

					<ClearableTextBox label="Filter" onValueChange={(value) => setFilter(value)} />

				</Box>


				<Box display="flex" overflow="auto">
					<Box
						flex="1"
						display="flex"
						flexDirection="column"
						justifyContent="start"
						overflow="auto"
						padding="0 50px"
					>
						<Slide in={true} timeout={animationDuration}>
							<div>
								{announcementsDisplay.map((a) => (
									<AnnoucementCard announcement={a} color={a.color} key={a.id} />
								))}
							</div>
						</Slide>
					</Box>
					<Box minWidth="200px" pl="20px" pt="20px">
						{courses &&
							<CourseLegend courses={courses} />
						}
					</Box>
				</Box>

			</Box>
		</Scene>
	)
}

export default Announcements;