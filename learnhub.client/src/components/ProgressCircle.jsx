import { Box, Typography, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
    const angle = progress * 360;

    const theme = useTheme();

    const percent = Math.round(progress * 100);

    const color1 = theme.palette.primary.light;
    const color2 = theme.palette.secondary.main;
    const color3 = "green";

    return (
        <>
            <Box
                sx={{
                    background: `radial-gradient(${color1} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${color2} ${angle}deg 360deg),
            ${color3}`,
                    borderRadius: "50%",
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
            <Box
                sx={{
                    position: "relative",
                    top: "-35px",
                    color: "neutral.light"
                }}
            >
                <Typography fontWeight="bold">
                    {`${percent}%`}
                </Typography>

            </Box>
        </>
    );
};

export default ProgressCircle;