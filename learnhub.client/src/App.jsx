import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ColorModeContext, useMode } from "./theme";
import useFeedbackQuery from "./hooks/useFeedbackQuery";

import Login from "./scenes/global/Login";
import Register from "./scenes/global/Register";
import Topbar from "./scenes/global/TopBar";
import NavBar from "./scenes/global/NavBar";
import Scenes from './scenes/Scenes';
import ChangePassword from './scenes/global/ChangePassword';
import { AuthorizeView } from './hooks/useAuthorization';

function App() {

    const [theme, colorMode] = useMode();
    const { QueryFeedback, queryClient } = useFeedbackQuery();

    const Application = () => {
        return (
            <AuthorizeView>
                <div className="app">
                    <NavBar />
                    <div className="content">
                        <Topbar />
                        <main className="view">
                            <Scenes />
                        </main>
                    </div>
                    <QueryFeedback />
                </div>
            </AuthorizeView>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/*" element={<Application />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Routes>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </QueryClientProvider>
    );


}
export default App;