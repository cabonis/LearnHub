import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import Scene from "../global/Scene";
import Working from "../../components/Working";
import CourseDetailCard from './CourseDetailCard';
import ModuleCard from './modules/ModuleCard';
import AnnoucementCard from '../announcements/AnnouncementCard';
import Slide from '@mui/material/Slide';
import { animationDuration } from '../../styles';


const CourseDetail = () => {

    const { course } = useOutletContext();
    const [modules, setModules] = useState(course.modules);
    const [announcements, setAnnouncements] = useState(course.announcements);

    const sortModulesClicked = () => {
        setModules([...modules].reverse());
    }

    const sortAnnouncementsClicked = () => {
        setAnnouncements([...announcements].reverse());
    }

    if (!course) return (<Working />)
    return (
        <Scene
            title={course.title}
            subtitle={` ${course.instructor.firstName} ${course.instructor.lastName}`}
            breadcrumbs={[{
                title: "My Courses",
                link: "/courses"
            }, {
                title: course.title
            }]}
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
                                {`Modules (${modules.length})`}
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
                                    {modules.map((m) => (
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
                                {`Announcements (${announcements.length})`}
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
                                    {announcements.map((a) => (
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