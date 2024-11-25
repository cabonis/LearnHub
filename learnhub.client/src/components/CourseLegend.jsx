import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import SquareIcon from '@mui/icons-material/Square';

const CourseLegend = ({ courses }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" mb="10px" sx={{ textAlign: "center" }}>Courses</Typography>
            <List dense>
                {courses.map((course) => (
                    <ListItem
                        key={course.title}
                        sx={{
                            margin: "0",
                            borderRadius: "2px",
                        }}
                    >
                        <SquareIcon sx={{
                            color: course.color,
                            mr: "10px"
                        }} />
                        <ListItemText primary={course.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default CourseLegend;