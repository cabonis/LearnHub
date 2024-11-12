import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import LearnHubLogo from "../../components/LearnHubLogo";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { useAuthorizedUser } from "../../hooks/useAuthorization";

const NavMenuItem = ({ title, to, icon, selected, setSelected }) => {

    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
            component={(<Link to={to} />)}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const NavBar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const authorizedUser = useAuthorizedUser();

    const menuItemStyles = {
        icon: {
            color: colors.grey[100],
        },
        SubMenuExpandIcon: {
            color: colors.grey[100],
            '&:hover': {
                color: colors.primary[800],
            },
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0
                    ? colors.primary[400]
                    : 'transparent',
        }),
        button: {
            color: colors.grey[100],
            '&:hover': {
                backgroundColor: colors.grey[300],
                color: colors.primary[400],
            },
        }
    };

    const headerStyle = {
        icon: {
            color: colors.grey[100],
        },
        button: {
            '&:hover': {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
            },
        }
    };

    return (
        <Sidebar collapsed={isCollapsed} backgroundColor={colors.primary[400]}>

            <Menu menuItemStyles={headerStyle}>
                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                    style={{
                        margin: "10px 0 70px 0",
                    }}
                >
                    {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="0px"
                        >
                            <LearnHubLogo />
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    )}
                </MenuItem>
            </Menu>

            <Menu menuItemStyles={menuItemStyles}>

                {!isCollapsed && (
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                width="100px"
                                height="100px"
                                src={"/src/assets/default-avatar.png"}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                                variant="h4"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}
                            >
                                {`${authorizedUser.firstName} ${authorizedUser.lastName}`}
                            </Typography>
                            <Typography variant="h5" color="secondary.main">
                                {authorizedUser.role}
                            </Typography>
                        </Box>
                    </Box>
                )}

                <NavMenuItem
                    title="Dashboard"
                    to="/"
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "25px 0 5px 20px" }}
                >
                    {!isCollapsed && ("Academics")}
                </Typography>

                <NavMenuItem
                    title="Courses"
                    to="/courses"
                    icon={<LocalLibraryOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

                <NavMenuItem
                    title="Announcements"
                    to="../announcements"
                    icon={<AnnouncementOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

                <NavMenuItem
                    title="Calendar"
                    to="/calendar"
                    icon={<CalendarTodayOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "25px 0 5px 20px" }}
                >
                    {!isCollapsed && ("Admin")}
                </Typography>

                <NavMenuItem
                    title="Users"
                    to="/admin/user"
                    icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

                <NavMenuItem
                    title="Course Catalog"
                    to="/admin/course"
                    icon={<LibraryBooksOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

            </Menu>
        </Sidebar>
    )
}

export default NavBar;