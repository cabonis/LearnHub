
import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VoiceChatOutlinedIcon from '@mui/icons-material/VoiceChatOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ModuleDetailCard from './ModuleDetailCard';
import ModuleItemCard from './ModuleItemCard';
import Working from "../../../components/Working";
import Scene from '../../global/Scene';
import useVideoPlayer from '../../../hooks/useVideoPlayer';
import { useFetchModule } from '../../../hooks/ModuleHooks';
import { useFetchContent } from "../../../hooks/ContentHooks";
import { animationDuration } from '../../../styles';


const ModuleDetail = () => {

    const { moduleid } = useParams();
    const { course } = useOutletContext();
    const { data } = useFetchModule(moduleid);
    const download = useFetchContent();
    const [module, setModule] = useState();
    const [panel, setPanel] = useState("Lectures");
    const [Video, show] = useVideoPlayer();

    useEffect(() => {
        if (data) {
            console.log(data);
            setModule({
                ...data,
                color: course.color
            });
        }
    }, [data]);

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setPanel(isExpanded ? panel : false);
    };

    const lectureClicked = (lecture) => {
        show(lecture.videoLink);
    }

    const contentClicked = (content) => {
        download(content.id);
    }

    const accordianStyle = {
        margin: "15px !important"
    }

    const accordianHeaderStyle = {
        backgroundColor: "primary.main",
        borderBottom: 2,
        borderColor: "neutral.main",
        '&:hover': {
            borderColor: "secondary.main"
        }
    }

    const AccordianSection = ({ title, data, icon, handleClick }) => {
        return (
            <Accordion sx={accordianStyle} expanded={panel === title} onChange={handlePanelChange(title)}>
                <AccordionSummary sx={accordianHeaderStyle} expandIcon={<ExpandMoreIcon color="secondary" />} >
                    <Typography color="neutral.light" variant='h3'>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: "primary.main" }}>
                    <Box display="flex" flexWrap="wrap" alignItems="center" minHeight="50px">
                        {(data && data.length > 0) ? data.map((item) => (
                            <ModuleItemCard key={item.title} text={item.title} color={course.color} icon={icon} handleClick={() => handleClick(item)} />
                        )) : <Typography color="neutral.light" flex="1" textAlign="center">{`No ${title}!`}</Typography>}
                    </Box>
                </AccordionDetails>
            </Accordion>
        );
    }

    if (!module) return (<Working />)
    return (
        <Scene
            title={module.title}
            subtitle={course.title}
            breadcrumbs={[{
                title: "My Courses",
                link: "/courses"
            }, {
                title: course.title,
                link: `/course/${course.id}`
            }, {
                title: module.title
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
                        <ModuleDetailCard module={module} color={module.color} />
                    </Box>
                </Slide>

                {/* Bottom Section */}
                <Slide in={true} direction="up" timeout={animationDuration}>
                    <Box
                        margin="0 20px"
                        display="flex"
                        flexDirection="column"
                        overflow="auto"
                    >
                        <AccordianSection title="Lectures" data={module.lectures} icon={<VoiceChatOutlinedIcon />} handleClick={lectureClicked} />
                        <AccordianSection title="Content" data={module.content} icon={<FileCopyOutlinedIcon />} handleClick={contentClicked} />
                        <AccordianSection title="Assignments" data={module.homework} icon={<BorderColorOutlinedIcon />} handleClick={() => { }} />

                    </Box>
                </Slide>

            </Box>
            <Video />
        </Scene>
    );
}

export default ModuleDetail;