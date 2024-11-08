import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from "react-router-dom";

const TabViewRouted = ({ tabs, tabChanged }) => {

  const location = useLocation();

  const getCurrentTab = () => {
    const path = location.pathname;
    const subpath = path.substring(path.lastIndexOf('/') + 1);
    const loadedTabIndex = tabs.findIndex(tab => tab.path.endsWith(subpath));
    return Math.max(0, loadedTabIndex);
  }

  const [selectedTab, setSelectdTab] = useState(getCurrentTab());

  useEffect(() => {
    const currentTab = getCurrentTab();
    setSelectdTab(currentTab);
    tabChanged && tabChanged();
  }, [location]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={selectedTab}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {tabs.map(({ label, path }, i) => (
            <Tab
              label={label}
              key={i}
              component={Link}
              to={path} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}

export default TabViewRouted;