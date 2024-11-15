import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title = "", subtitle = "", text = "\u2800" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={"neutral.light"}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color="secondary.main">
        {subtitle}
      </Typography>
      <Typography variant="h6" color="secondary.main" >
        {text}
      </Typography>
    </Box>
  );
};

export default Header;