import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import Scene from "../global/Scene";
import Working from "../../components/Working";
import CourseDetailCard from './CourseDetailCard';
import ModuleCard from './modules/ModuleCard';
import AnnoucementCard from '../announcements/AnnouncementCard';
import getCourseColor from "../../hooks/courseColorsRegistry";
import Slide from '@mui/material/Slide';
import { useFetchCourseDetail } from '../../hooks/CourseHooks';
import { animationDuration } from '../../styles';


const CourseDetail = () => {

    const { id } = useParams();
    const { data } = useFetchCourseDetail(id);
    const [course, setCourse] = useState();

    useEffect(() => {
        if (data) {
            const color = getCourseColor(data.title);
            setCourse({
                ...data,
                color: color
            });
        }
    }, [data]);

    const sortModulesClicked = () => {
        setCourse({
            ...course,
            modules: course.modules.reverse()
        });
    }

    const sortAnnouncementsClicked = () => {
        setCourse({
            ...course,
            announcements: course.announcements.reverse()
        });
    }

    if (!course) return (<Working />)
    return (
        <Scene
            title={course.title}
            subtitle={` ${course.instructor.firstName} ${course.instructor.lastName}`}
        >

            <Box
                height="74vh"
                display="flex"
                flexDirection="column"
            >
                {/* Top Section */}
                <Slide in={true} direction='left' timeout={animationDuration}>
                    <Box mb="25px">
                        <CourseDetailCard course={course} color={course.color} />
                    </Box>
                </Slide>

                {/* Bottom Section */}
                <Box
                    display="flex"
                    overflow="auto"
                >
                    {/* Bottom Left (Modules) */}
                    <Box
                        //m="5px"
                        flex="2"
                        display="flex"
                        flexDirection="column"
                    >
                        <Box display="flex" alignItems="center">
                            <Typography pt="8px" mb="10px" mr="5px" variant="h3" color="neutral.light">
                                {`Modules (${course.modules.length})`}
                            </Typography>
                            <IconButton onClick={sortModulesClicked}>
                                <SwapVertOutlinedIcon fontSize='large' sx={{ color: 'secondary.main' }} />
                            </IconButton>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="start"
                            overflow="auto"
                        >
                            <Slide in={true} timeout={animationDuration}>
                                <div>
                                    {course.modules.map((m) => (
                                        <ModuleCard module={m} color={course.color} key={m.id} />
                                    ))}
                                </div>
                            </Slide>
                        </Box>
                    </Box>

                    {/* Bottom Right (Announcements) */}
                    <Box
                        //m="5px"
                        flex="1"
                        display="flex"
                        flexDirection="column"
                    >
                        <Box display="flex">
                            <Typography pt="8px" mb="10px" mr="5px" variant="h3" color="neutral.light">
                                {`Announcements (${course.announcements.length})`}
                            </Typography>
                            <IconButton onClick={sortAnnouncementsClicked}>
                                <SwapVertOutlinedIcon fontSize='large' sx={{ color: 'secondary.main' }} />
                            </IconButton>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="start"
                            overflow="auto"
                        >
                            <Slide in={true} timeout={animationDuration}>
                                <div>
                                    {course.announcements.map((a) => (
                                        <AnnoucementCard announcement={a} color={course.color} key={a.id} />
                                    ))}
                                </div>
                            </Slide>
                        </Box>
                    </Box>

                </Box>

            </Box>
        </Scene>
    )
}

export default CourseDetail;