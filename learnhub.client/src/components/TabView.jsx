import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabPanel = ({ children, value, index, ...other }) => {
      
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

const TabView = ({ tabs }) => {
    
    const [selectedTab, setSelectdTab] = useState(0);
  
    const handleChange = (event, newTab) => {
        setSelectdTab(newTab);
    };
  
    return (
      <Box sx={{ flex: '1 1 auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            {tabs.map(({ label }, i) => (
              <Tab label={label} key={i} />
            ))}
          </Tabs>
        </Box>
        {tabs.map(({ component }, i) => (
          <TabPanel value={selectedTab} index={i} key={i}>
            {component}
          </TabPanel>
        ))}
      </Box>
    );
  }

  export default TabView;