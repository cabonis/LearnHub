import { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import Slide from '@mui/material/Slide';
import ZoomArea from "../../components/ZoomArea";
import Scene from "../global/Scene";
import PieChart from "./PieChart";
import Working from "../../components/Working";
import ModuleCard from "../courses/modules/ModuleCard"
import CourseLegend from "../../components/CourseLegend";
import getCourseColor from "../../hooks/courseColorsRegistry";
import { useFetchCourses } from '../../hooks/CourseHooks';
import { useAuthenticatedUser } from "../../hooks/useAuthorization";
import { animationDuration } from '../../styles';

const Dashboard = () => {

	const user = useAuthenticatedUser();
	const { data } = useFetchCourses();
	const [courses, setCourses] = useState();

	const reduce = (item, key) => {
		return item.reduce((a, b) => ({
			[key]: a[key] + b[key]
		}))[key]
	}

	useEffect(() => {
		if (data) {

			console.log(data);
			const courseData = data.map((item) => ({
				id: item.title,
				title: item.title,
				color: getCourseColor(item.title),
				currentModule: item.modules.reduce((max, module) => {
					return dayjs(max.startDate).valueOf() > dayjs(module.startDate).valueOf() ? max : module;
				}, item.modules[0]),
				lecturesCount: reduce(item.modules, "lecturesCount"),
				contentCount: reduce(item.modules, "contentCount"),
				announcementCount: item.announcementCount
			}));
			console.log(courseData);
			setCourses(courseData);
		}
	}, [data]);


	if (!courses) return (<Working />)
	return (
		<Scene
			title="Dashboard"
			subtitle={`Welcome back ${user.firstName}!`}
		>

			<Box
				display="grid"
				height="75vh"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="45% 0%"
				gap="20px"
			>

				{/* Row 1 */}
				<Box
					ml="10px"
					gridColumn="span 10"
					gridRow="span 1"
					display="flex"
					flexDirection="column"
				>
					<Box>
						<Typography textAlign="start" color="neutral.light" variant="h3">Latest Modules</Typography>
					</Box>
					<Box flex="1" display="flex" flexWrap="wrap" overflow="auto">
						<Slide in={true} timeout={animationDuration}>
							<Box
								display="flex"
								flexWrap="wrap"
								overflow="auto"
							>
								{courses.map((c) => {

									return (<ModuleCard module={c.currentModule} color={c.color} minHeight="80px" key={c.id} />)
								})}
							</Box>
						</Slide>
					</Box>
				</Box>

				<Box
					gridColumn="span 2"
					gridRow="span 1"
				>
					<Box display="flex" justifyContent="start">
						<CourseLegend courses={courses} />
					</Box>

				</Box>


				{/* Row 2 */}
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<ZoomArea isShown={true}>
						<Box height="100%" flex="1" p="10px">
							<Typography textAlign="center" color="neutral.light" variant="h3">Lectures</Typography>
							<PieChart data={courses} value="lecturesCount" />
						</Box>
					</ZoomArea>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<ZoomArea isShown={true}>
						<Box height="100%" flex="1" p="10px">
							<Typography textAlign="center" color="neutral.light" variant="h3">Content</Typography>

							<PieChart data={courses} value="contentCount" />

						</Box>
					</ZoomArea>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<ZoomArea isShown={true}>
						<Box height="100%" flex="1" p="10px">
							<Typography textAlign="center" color="neutral.light" variant="h3">Announcements</Typography>
							<PieChart data={courses} value="announcementCount" />
						</Box>
					</ZoomArea>
				</Box>




			</Box>
		</Scene>
	)
}

export default Dashboard;