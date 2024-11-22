import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useFetchCourseDetail } from '../../hooks/CourseHooks';
import getCourseColor from "../../hooks/courseColorsRegistry";
import Working from "../../components/Working";

const CourseView = () => {

    const { id } = useParams();
    const [course, setCourse] = useState();
    const { data } = useFetchCourseDetail(id);

    useEffect(() => {
        if (data) {
            const color = getCourseColor(data.title);
            setCourse({
                ...data,
                color: color
            });
        }
    }, [data]);

    if (!course) return (<Working />)
    return (data &&
        <Outlet context={{ course: course }} />
    )
}

export default CourseView;