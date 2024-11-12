import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LearnHubLogo from "./LearnHubLogo";

const LoginContainer = ({ children }) => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <Card
                variant="outlined"
                sx={{
                    width: "400px",
                    height: "500px",
                    backgroundColor: "primary.light",
                    boxShadow: 20,
                    padding: 3
                }}            >
                <Stack>
                    <LearnHubLogo />

                    {children}

                </Stack>
            </Card>
        </Box >
    );
}

export default LoginContainer;