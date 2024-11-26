import { Routes, Route, Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ColorModeContext, useMode } from "./theme";
import useFeedbackQuery from "./hooks/useFeedbackQuery";
import { AdminView, InstructorView } from "./hooks/useAuthorization";

import Login from "./scenes/global/Login";
import Register from "./scenes/global/Register";
import Topbar from "./scenes/global/TopBar";
import NavBar from "./scenes/global/NavBar";
import Dashboard from "./scenes/dashboard/Dashboard";
import Courses from "./scenes/courses/Courses";
import CourseView from './scenes/courses/CourseView';
import CourseDetail from './scenes/courses/CourseDetail';
import ModuleDetail from './scenes/courses/modules/ModuleDetail';
import Calendar from "./scenes/calendar/Calendar";
import Announcements from "./scenes/announcements/Announcements";
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
import ModuleLectures from './scenes/admin/course/module/ModuleLectures';
import ModuleContent from './scenes/admin/course/module/ModuleContent';
import NotFound from './scenes/global/NotFound';

import { AuthenticatedView } from './hooks/useAuthorization';

const Application = () => {

    const { QueryFeedback, queryClient } = useFeedbackQuery();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthenticatedView>
                <div className="app">
                    <NavBar />
                    <div className="content">
                        <Topbar />
                        <main className="view">
                            <Outlet />
                        </main>
                    </div>
                    <QueryFeedback />
                </div>
            </AuthenticatedView>
        </QueryClientProvider>
    );
}

function App() {

    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route element={<Application />}>
                        <Route index element={<Dashboard />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="course/:id" element={<CourseView />}>
                            <Route path="" element={<CourseDetail />} />
                            <Route path=":moduleid" element={<ModuleDetail />} />
                        </Route>
                        <Route path="announcements" element={<Announcements />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="admin">
                            <Route path="user" element={<AdminView><UserGrid /></AdminView>} />
                            <Route path="course">
                                <Route index element={<InstructorView><CourseGrid /></InstructorView>} />
                                <Route path="add" element={<AdminView><CourseAdd /></AdminView>}>
                                    <Route index element={<CourseInfo />} />
                                </Route>
                                <Route path=":id" element={<InstructorView><Course /></InstructorView>}>
                                    <Route path="" element={<CourseEdit />}>
                                        <Route index element={<CourseInfo />} />
                                        <Route path="enrollment" element={<CourseEnrollment />} />
                                        <Route path="announcements" element={<CourseAnnouncements />} />
                                        <Route path="modules" element={<CourseModules />} />
                                    </Route>
                                    <Route path="add" element={<ModuleAdd />}>
                                        <Route path="" element={<ModuleInfo />} />
                                    </Route>
                                    <Route path=":moduleid" element={<ModuleEdit />} >
                                        <Route index element={<ModuleInfo />} />
                                        <Route path="lectures" element={<ModuleLectures />} />
                                        <Route path="content" element={<ModuleContent />} />
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
export default App;