import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CourseInfo from './CourseInfo';
import CourseEnrollment from './CourseEnrollment';
import { useParams } from 'react-router-dom';
import { mockCourseData } from "../../data/mockData";
import Header from "../../components/Header";
import Stack from '@mui/material/Stack';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CourseEdit() {
  
  const [tab, setTab] = useState(0);
  const { id } = useParams();

  const course = mockCourseData.find((course) => course.id === id);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    
    
    <Box m="20px" display="flex">
        <Stack sx={{ width: '100%' }}>
            <Box display="flex" justifyContent="space-between">
                <Header title="Course Editor" subtitle="" />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs 
                        value={tab} 
                        onChange={handleChange} 
                        aria-label="basic tabs example"
                        textColor="secondary"
                        indicatorColor="secondary">
                        <Tab label="Information" {...tabProps(0)} />
                        <Tab label="Enrollment" {...tabProps(1)} />
                        <Tab label="Modules" {...tabProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tab} index={0}>
                    <CourseInfo course={course} />
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={1}>
                    <CourseEnrollment course={course} />
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={2}>
                    Edit modules here.
                </CustomTabPanel>
            </Box>
        </Stack>
    </Box>
  );
}