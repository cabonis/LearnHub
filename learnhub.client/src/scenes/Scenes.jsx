import { Routes, Route } from 'react-router-dom';
import Dashboard from "../scenes/dashboard";
import Courses from "../scenes/courses/Courses";
import CourseDetail from './courses/CourseDetail';
import ModuleDetail from './courses/modules/ModuleDetail';
import Calendar from "../scenes/calendar/Calendar";
import Announcements from "../scenes/announcements/Announcements";
import UserGrid from "../scenes/admin/user/UserGrid";
import Course from "../scenes/admin/course/Course";
import CourseGrid from "../scenes/admin/course/CourseGrid";
import CourseAdd from "../scenes/admin/course/CourseAdd";
import CourseEdit from '../scenes/admin/course/CourseEdit';
import CourseInfo from '../scenes/admin/course/CourseInfo';
import CourseEnrollment from '../scenes/admin/course/CourseEnrollment';
import CourseAnnouncements from '../scenes/admin/course/CourseAnnouncements';
import CourseModules from '../scenes/admin/course/CourseModules';
import ModuleAdd from '../scenes/admin/course/module/ModuleAdd';
import ModuleEdit from '../scenes/admin/course/module/ModuleEdit';
import ModuleInfo from '../scenes/admin/course/module/ModuleInfo';
import ModuleContent from '../scenes/admin/course/module/ModuleContent';
import { AdminView, InstructorView } from "../hooks/useAuthorization";

const Scenes = () => {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />

            <Route path="course">
                <Route path=":id" >
                    <Route path="" element={<CourseDetail />} />
                    <Route path=":moduleid" element={<ModuleDetail />} />
                </Route>
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
                            <Route path="content" element={<ModuleContent />} />
                        </Route>

                    </Route>

                </Route>

            </Route>
        </Routes>
    )
}

export default Scenes;