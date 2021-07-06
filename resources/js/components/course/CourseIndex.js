import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import CoursesTable from '../partials/CoursesTable';

export default function CourseIndex(props) {
    const [courses, setcourses] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.courseIndex).then((response) => {
            setcourses(response.data)
        }).catch((error) => logError(error))
    }, [])
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">قائمة الدورات</div>
                <div className="card-body">
                    <CoursesTable courses={courses} />
                </div>
            </div>
        </div>
    );
}

