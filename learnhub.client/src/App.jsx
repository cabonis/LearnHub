import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/TopBar";
import NavBar from "./scenes/global/NavBar";
import Dashboard from "./scenes/dashboard";
import Courses from "./scenes/courses";
import Calendar from "./scenes/calendar";
import Announcements from "./scenes/announcements";
import UserGrid from "./scenes/admin/UserGrid";
import CourseGrid from "./scenes/admin/CourseGrid";
import CourseEdit from './scenes/admin/course/CourseEdit';
import CourseInfo from './scenes/admin/course/CourseInfo';
import CourseEnrollment from './scenes/admin/course/CourseEnrollment';
import CourseAnnouncements from './scenes/admin/course/CourseAnnouncements';
import CourseModules from './scenes/admin/course/CourseModules';


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
                    <div className="content">
                        <Topbar />
                        <main className="view">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="courses" element={<Courses />} />
                                <Route path="announcements" element={<Announcements />} /> 
                                <Route path="calendar" element={<Calendar />} />
                                <Route path="admin/users" element={<UserGrid />} />
                                <Route path="admin/courses" element={<CourseGrid />} />
                                <Route path="admin/course/:id?" element={<CourseEdit />}>
                                    <Route index element={<CourseInfo />} />
                                    <Route path="enrollment" element={<CourseEnrollment />} />
                                    <Route path="announcements" element={<CourseAnnouncements />} />
                                    <Route path="modules" element={<CourseModules />} />
                                </Route>
                            </Routes>
                        </main>
                    </div>
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