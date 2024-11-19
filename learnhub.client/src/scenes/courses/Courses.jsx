import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Scene from "../global/Scene";
import Working from "../../components/Working";
import CourseCard from "./CourseCard";
import Slide from '@mui/material/Slide';
import { useFetchCourses } from '../../hooks/CourseHooks';
import { animationDuration } from '../../styles';

const Courses = () => {

	const { data } = useFetchCourses();
	const [courses, setCourses] = useState();

	useEffect(() => {
		setCourses(data);

	}, [data]);

	if (!courses) return (<Working />)
	return (
		<Scene
			title="My Courses"
			subtitle="Currently Enrolled">

			<Box
				height="74vh"
				display="flex"
			>
				<Box
					overflow="auto"
				>
					<Slide in={true} timeout={animationDuration}>
						<Box
							display="flex"
							flexWrap="wrap"
							justifyContent="space-evenly"
						>
							{courses.map((c) => (
								<CourseCard course={c} key={c.id} />
							))}
						</Box>
					</Slide>
				</Box>

			</Box>
		</Scene>
	)
}

export default Courses;