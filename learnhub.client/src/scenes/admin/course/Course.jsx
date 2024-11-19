import { Outlet, useParams, useOutletContext } from 'react-router-dom';
import { useFetchAdminCourseInfo } from '../../../hooks/CourseHooks';

const Course = () => {

    const { id } = useParams();
    const { data } = useFetchAdminCourseInfo(id);
    const outletContext = useOutletContext();

    return (data &&
        <Outlet context={{ ...outletContext, course: data }} />
    )
}

export default Course;