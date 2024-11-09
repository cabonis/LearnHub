import { Outlet, useParams, useOutletContext } from 'react-router-dom';
import { mockCourseData } from "../../../data/mockData";

const Course = () => {

    const outletContext = useOutletContext();
    const { id } = useParams();
    const numId = parseInt(id);
    const course = mockCourseData.find((c) => c.id === numId);

    return (
        <Outlet context={{ ...outletContext, course: course }} />
    )
}

export default Course;