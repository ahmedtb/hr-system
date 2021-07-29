import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import CoursesTable from '../partials/CoursesTable';
import ScheduleDiagram from './components/ScheduleDiagram'
import moment from 'moment'
import Pagination from '../utility/Pagination';

function CoursesViewerAndFilter(props) {
    const [courses, setcourses] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [start_date, setstart_date] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.courseIndex, params = null) {
        axios.get(link, { params: params }).then((response) => {
            setcourses(response.data.data)
            if (response.data.links) { setlinks(response.data.links) } else setlinks(null)
        }).catch((error) => logError(error))
    }
    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPage(ApiEndpoints.courseIndex, params)
    }, [])

    return (
        <>
            <div className="card">
                <div className="card-header">فلترة</div>
                <div className="card-body">
                    <button onClick={() => fetchPage(ApiEndpoints.courseIndex, { resumed: 'true' })}>الدورات المستانفة</button>
                    <button onClick={() => fetchPage(ApiEndpoints.courseIndex, { planned: 'true' })}>الدورات المخطط لها</button>
                    <button onClick={() => fetchPage(ApiEndpoints.courseIndex, { done: 'true' })}>الدورات المنتهية</button><br />
                    <button onClick={() => fetchPage(ApiEndpoints.courseIndex, { canceled: 'true' })}>الدورات الملغية</button><br />

                    <strong>تاريخ بدء:</strong><br />
                    <label className="form-check-label" >بداية</label><br />
                    <input className="form-check-input" type="date" onChange={(e) => setstart_date(e.target.value)} /><br />

                    <button onClick={() => {
                        let params = Object.assign({},
                            start_date === null ? null : { start_date },
                        )
                        fetchPage(ApiEndpoints.courseIndex, params)
                    }}>filter</button>
                </div>
            </div>

            <div className="card">
                <div className="card-header">قائمة الدورات</div>
                <div className="card-body">
                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />
                    <CoursesTable courses={courses} />
                </div>
            </div>
        </>
    )
}

export default function CourseIndex(props) {
    const [twentyDaysRangeCourses, setrangecourses] = React.useState([])


    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">احصائيات الدورات</div>
                <div className="card-body">
                    <ScheduleDiagram
                        courses={twentyDaysRangeCourses}
                        rangeStartDate={moment().subtract(10, 'd').format('YYYY-MM-DD')}
                        rangeEndDate={moment().add(10, 'd').format('YYYY-MM-DD')}
                    />
                </div>
            </div>

            <CoursesViewerAndFilter />
        </div >
    );
}

