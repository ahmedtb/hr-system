import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import CoursesTable from '../partials/CoursesTable';
import ScheduleDiagram from './ScheduleDiagram'
import moment from 'moment'


function Pagination(props) {
    const fetchPage = props.fetchPage
    const links = props.links

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">

                {
                    links?.map((link, index) => {
                        if (link['url'] && index == 0) {
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>السابق</button>
                        }
                        if (link['url'] && index == links.length - 1) {
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>التالي</button>
                        }
                        if (link['url'] && index && index != links.length - 1)
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>{link['label']}</button>
                    })
                }

            </ul>
        </nav>
    )
}

export default function CourseIndex(props) {
    const [courses, setcourses] = React.useState([])
    const [twentyDaysRangeCourses, setrangecourses] = React.useState([])
    const [links, setlinks] = React.useState([])

    async function fetchPage(link = ApiEndpoints.courseIndex) {
        axios.get(link).then((response) => {
            setcourses(response.data.courses.data)
            setrangecourses(response.data.twentyDaysRangeCourses)
            if (response.data.courses.links) {
                setlinks(response.data.courses.links)
            } else
                setlinks(null)

        }).catch((error) => logError(error))
    }
    React.useEffect(() => {
        fetchPage()
    }, [])
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
        </div>
    );
}

