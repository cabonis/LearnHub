import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import LearnHubLogo from "../../components/LearnHubLogo";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { useAuthenticatedUser } from "../../hooks/useAuthorization";

const NavMenuItem = ({ title, to, icon, selected, setSelected }) => {

    return (
        <Tooltip title={title}>
            <div>
                <MenuItem
                    active={selected === title}
                    onClick={() => setSelected(title)}
                    icon={icon}
                    component={(<Link to={to} />)}
                >
                    <Typography>{title}</Typography>
                </MenuItem>
            </div>
        </Tooltip>
    );
};

const NavBar = () => {

    const theme = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const user = useAuthenticatedUser();

    const menuItemStyles = {
        icon: {
            color: "theme.palette.neutral.light",
        },
        SubMenuExpandIcon: {
            color: theme.palette.neutral.light,
            '&:hover': {
                color: theme.palette.primary.dark,
            },
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0
                    ? theme.palette.primary.main
                    : 'transparent',
        }),
        button: {
            color: theme.palette.neutral.light,
            '&:hover': {
                backgroundColor: theme.palette.neutral.light,
                color: theme.palette.primary.main,
            },
        }
    };

    const headerStyle = {
        icon: {
            color: theme.palette.neutral.light,
        },
        button: {
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
        }
    };
    console.log(`Rendering with IsCollapsed = ${isCollapsed}`);
    return (
        <Sidebar collapsed={isCollapsed} backgroundColor={theme.palette.primary.light}>

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
                                color={theme.palette.neutral.light}
                                fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}
                            >
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                            <Typography variant="h5" color={theme.palette.secondary.main}>
                                {user.role}
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
                    color={theme.palette.neutral.main}
                    sx={{ m: "25px 0 5px 20px" }}
                >
                    {!isCollapsed && ("Academics")}
                </Typography>

                <NavMenuItem
                    title="My Courses"
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

                {(user.isAdmin || user.isInstructor) && (
                    <>
                        <Typography
                            variant="h6"
                            color={theme.palette.neutral.main}
                            sx={{ m: "25px 0 5px 20px" }}
                        >
                            {!isCollapsed && ("Admin")}
                        </Typography>

                        {user.isAdmin && (
                            <NavMenuItem
                                title="Users"
                                to="/admin/user"
                                icon={<PersonOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}

                        <NavMenuItem
                            title="Course Catalog"
                            to="/admin/course"
                            icon={<LibraryBooksOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </>
                )}

            </Menu>
        </Sidebar>
    )
}

export default NavBar;