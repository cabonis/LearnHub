import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountButton from "./AccountButton";
import { StayPrimaryLandscape } from "@mui/icons-material";
import { buttonHoverStyle } from "../../styles";

const Topbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="space-between" p={2} className="header">

            <Box
                display="flex"
                backgroundColor={"primary.light"}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Box display="flex">
                <IconButton
                    onClick={colorMode.toggleColorMode}
                    sx={buttonHoverStyle}
                >
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton
                    sx={buttonHoverStyle}>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <AccountButton
                    sx={buttonHoverStyle}
                />
            </Box>
        </Box>
    );
};

export default Topbar;