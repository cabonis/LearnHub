import { Box, Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';
import Header from "../../components/Header";

function LinkRouter(props) {
    return <Link {...props} component={RouterLink} />;
}

const Scene = ({ title, subtitle, breadcrumbs = [], children }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
        >
            <Box mb="30px">
                <Header title={title} subtitle={subtitle} ></Header>

                {breadcrumbs.length > 0 ?
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                    >
                        {breadcrumbs.map((item) => (

                            item.link ?
                                <LinkRouter color="neutral.light" underline="hover" to={item.link}>{item.title}</LinkRouter>
                                :
                                <Typography color="neutral.main">{item.title}</Typography>
                        ))}
                    </Breadcrumbs>
                    :
                    <Typography>{`\u2800`}</Typography>
                }
            </Box>

            <Box flex="1">
                {children}
            </Box>
        </Box>
    )
}

export default Scene;