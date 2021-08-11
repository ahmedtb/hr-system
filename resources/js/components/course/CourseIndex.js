import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import CoursesTable from '../partials/CoursesTable';
import ScheduleDiagram from './components/ScheduleDiagram'
import moment from 'moment'
import Pagination from '../utility/Pagination';
import { NumberFilter, TrainingProgramFilter, ScopeFilter, DateFilter } from '../components/Filters'

function CoursesViewerAndFilter(props) {
    const [courses, setcourses] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [start_date, setstart_date] = React.useState(null)
    const [params, setparams] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.courseIndex, params = null) {
        axios.get(link, { params: { ...params, page_size: 5 } }).then((response) => {
            setcourses(response.data.data)
            console.log(response.data)
            setparams(params)
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
                <div className="card-header">قائمة الدورات</div>
                <div className="card-body ">
                    <div className="row align-items-start">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            ترشيح الدورات وفقا لـ
                        </button>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">ترشيح الدورات وفقا لــ</h5>
                                    </div>
                                    <div className="modal-body row">

                                         <ScopeFilter
                                            params={params}
                                            fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                                            property={'planned'}
                                            label={'الدورات المخطط لها'}
                                        />
                                        <ScopeFilter
                                            params={params}
                                            fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                                            property={'done'}
                                            label={'الدورات المنتهية'}
                                        />
                                        <ScopeFilter
                                            params={params}
                                            fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                                            property={'canceled'}
                                            label={'الدورات الملغية'}
                                        />
                                        <ScopeFilter
                                            params={params}
                                            fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                                            property={'resumed'}
                                            label={'الدورات المستانفة'}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">اغلاق</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DateFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                            property={'start_date'}
                            label={'تاريخ البدء'}
                        />
                        <TrainingProgramFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                            property={'training_program_id'}
                            label={'برنامج الدورة'}
                        />

                    </div>

                    <CoursesTable courses={courses} />

                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />
                </div>
            </div>
        </>
    )
}

export default function CourseIndex(props) {
    const [twentyDaysRangeCourses, setrangecourses] = React.useState([])
    const [diagramPagination, setdiagramPagination] = React.useState([])

    async function getTwentyDaysRangeCourses(link = ApiEndpoints.courseIndex, params = null) {
        try {
            const response = await axios.get(link,
                {
                    params: {
                        ...params,
                        start_before: moment().add('10 days').format('YYYY-MM-DD'),
                        end_after: moment().subtract('10 days').format('YYYY-MM-DD'),
                        page_size: 5
                    }
                })
            // console.log(response.data)
            setrangecourses(response.data.data)
            setdiagramPagination(response.data.links)
        } catch (error) { logError(error) }
    }

    React.useEffect(() => {
        getTwentyDaysRangeCourses()
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">مخطط الدورات خلال الايام الحالية</div>
                <div className="card-body">
                    <Pagination
                        fetchPage={getTwentyDaysRangeCourses}
                        links={diagramPagination}
                    />
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

