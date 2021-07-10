import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import CoursesTable from '../partials/CoursesTable';
import ScheduleDiagram from './ScheduleDiagram'
import moment from 'moment'

export default function CourseIndex(props) {
    const [courses, setcourses] = React.useState([])
    const [twentyDaysRangeCourses, setrangecourses] = React.useState([])


    React.useEffect(() => {
        axios.get(ApiEndpoints.courseIndex).then((response) => {
            setcourses(response.data.courses)
            setrangecourses(response.data.twentyDaysRangeCourses)
            console.log(response.data.twentyDaysRangeCourses)
        }).catch((error) => logError(error))
    }, [])
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">احصائيات الدورات</div>
                <div className="card-body">
                    <ScheduleDiagram
                        courses={twentyDaysRangeCourses}
                        rangeStartDate={moment().subtract(10,'d').format('YYYY-MM-DD')}
                        rangeEndDate={moment().add(10,'d').format('YYYY-MM-DD')}
                    />
                </div>
            </div>

            <div className="card">
                <div className="card-header">قائمة الدورات</div>
                <div className="card-body">
                    <CoursesTable courses={courses} />
                </div>
            </div>
        </div>
    );
}

