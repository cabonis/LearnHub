import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/TopBar";
import NavBar from "./scenes/global/NavBar";
import Dashboard from "./scenes/dashboard";
import Courses from "./scenes/courses";
import Calendar from "./scenes/calendar";
import Announcements from "./scenes/announcements";
import AdminUsers from "./scenes/adminusers";
import AdminCourses from "./scenes/admincourses";
import CourseEdit from './scenes/admincourses/CourseEdit';

//import Home from './pages/Home.jsx';
//import Login from './pages/Login.jsx';
//import Register from './pages/Register.jsx';


function App() {

    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <NavBar />
                    <main className="content">
                        <Topbar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/announcements" element={<Announcements />} /> 
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/admin/users" element={<AdminUsers />} />
                            <Route path="/admin/courses" element={<AdminCourses />} />
                            <Route path="/admin/course/:id" element={<CourseEdit />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );

}
export default App;




//<Routes>
//    <Route path="/login" element={<Login />} />
//    <Route path="/register" element={<Register />} />
//    <Route path="/" element={<Home />} />
//</Routes>