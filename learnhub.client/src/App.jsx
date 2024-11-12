import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ColorModeContext, useMode } from "./theme";
import useFeedbackQuery from "./hooks/useFeedbackQuery";

import Topbar from "./scenes/global/TopBar";
import NavBar from "./scenes/global/NavBar";
import Scenes from './scenes/Scenes';

function App() {

    const [theme, colorMode] = useMode();
    const { QueryFeedback, queryClient } = useFeedbackQuery();

    return (
        <QueryClientProvider client={queryClient}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
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
                </ThemeProvider>
            </ColorModeContext.Provider>
        </QueryClientProvider>
    );

}
export default App;