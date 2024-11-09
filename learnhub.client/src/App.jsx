import { Routes, Route, Outlet, useOutletContext } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/TopBar";
import NavBar from "./scenes/global/NavBar";
import Dashboard from "./scenes/dashboard";
import Courses from "./scenes/courses";
import Calendar from "./scenes/calendar";
import Announcements from "./scenes/announcements";
import Admin from "./scenes/admin/Admin"
import UserGrid from "./scenes/admin/user/UserGrid";
import Course from "./scenes/admin/course/Course";
import CourseGrid from "./scenes/admin/course/CourseGrid";
import CourseAdd from "./scenes/admin/course/CourseAdd";
import CourseEdit from './scenes/admin/course/CourseEdit';
import CourseInfo from './scenes/admin/course/CourseInfo';
import CourseEnrollment from './scenes/admin/course/CourseEnrollment';
import CourseAnnouncements from './scenes/admin/course/CourseAnnouncements';
import CourseModules from './scenes/admin/course/CourseModules';
import ModuleAdd from './scenes/admin/course/module/ModuleAdd';
import ModuleEdit from './scenes/admin/course/module/ModuleEdit';
import ModuleInfo from './scenes/admin/course/module/ModuleInfo';
import ModuleContent from './scenes/admin/course/module/ModuleContent';


function App() {

    const [theme, colorMode] = useMode();
    const queryClient = new QueryClient();

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
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="courses" element={<Courses />} />
                                    <Route path="announcements" element={<Announcements />} />
                                    <Route path="calendar" element={<Calendar />} />

                                    <Route path="admin" element={<Admin />}>

                                        <Route path="user" element={<UserGrid />} />

                                        <Route path="course">

                                            <Route index element={<CourseGrid />} />
                                            <Route path="add" element={<CourseAdd />}>
                                                <Route index element={<CourseInfo />} />
                                            </Route>

                                            <Route path=":id" element={<Course />}>

                                                <Route path="" element={<CourseEdit />}>
                                                    <Route index element={<CourseInfo />} />
                                                    <Route path="enrollment" element={<CourseEnrollment />} />
                                                    <Route path="announcements" element={<CourseAnnouncements />} />
                                                    <Route path="modules" element={<CourseModules />} />
                                                </Route>

                                                <Route path="add" element={<ModuleAdd />} />

                                                <Route path=":moduleid" element={<ModuleEdit />} >
                                                    <Route index element={<ModuleInfo />} />
                                                    <Route path="content" element={<ModuleContent />} />
                                                </Route>

                                            </Route>

                                        </Route>

                                    </Route>
                                </Routes>
                            </main>
                        </div>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </QueryClientProvider>
    );

}
export default App;