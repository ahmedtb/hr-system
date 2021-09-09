import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import CoursesTable from '../partials/CoursesTable';
import ScheduleDiagram from './components/ScheduleDiagram'
import moment from 'moment'
import Pagination from '../utility/Pagination';
import { TextFilter, TrainingProgramFilter, ScopeFilter, DateFilter } from '../components/Filters'
import FiltersContainer from '../components/FiltersContainer';
import CustomModal from '../components/CustomModal';
import AllowedLink from '../components/AllowedLink';
function CoursesViewerAndFilter(props) {
    const [courses, setcourses] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.courseIndex, params = null) {
        axios.get(link, { params: { ...params, page_size: 5 } }).then((response) => {
            setcourses(response.data.data)
            console.log(response.data)
            setparams(params)
            if (response.data.links) { setlinks(response.data.links) } else setlinks(null)
        }).catch((error) => logError(error))
    }
    async function clearFilters() {
        fetchPage(ApiEndpoints.courseIndex, null)
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPage(ApiEndpoints.courseIndex, params)
    }, [])

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h3 className="row justify-content-between">
                        <div>
                            قائمة الدورات
                        </div>
                        <div>
                            <AllowedLink to={routes.createCourse}>تسجيل دورة</AllowedLink>
                        </div>
                    </h3>
                </div>
                <div className="card-body ">
                    <FiltersContainer label="ترشيح الدورات" clearFilters={clearFilters}>

                        <div className="row align-items-start">
                            <CustomModal label="ترشيح الدورات وفقا لـ">
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
                            </CustomModal>


                            <DateFilter
                                params={params}
                                fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                                property={'start_date'}
                                label={'تاريخ البدء'}
                            />
                            <DateFilter
                                params={params}
                                fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                                property={'end_date'}
                                label={'تاريخ انتهاء الدورة'}
                            />
                            <TextFilter
                                params={params}
                                fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                                property={'title'}
                                label={'عنوان الدورة'}
                            />
                            <TrainingProgramFilter
                                params={params}
                                fetchPage={(newparams) => fetchPage(ApiEndpoints.courseIndex, newparams)}
                                property={'training_program_id'}
                                label={'برنامج الدورة'}
                            />

                        </div>

                    </FiltersContainer>
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

    async function getTwentyDaysRangeCourses(link = ApiEndpoints.courseIndex, params = null) {
        try {
            const response = await axios.get(link,
                {
                    params: {
                        ...params,
                        start_before: moment().add('10 days').format('YYYY-MM-DD'),
                        end_after: moment().subtract('10 days').format('YYYY-MM-DD'),
                        page_size: 10
                    }
                })
            // set the diagram only if the total courses in the range is or under ten courses
            if (response.data.total <= 10)
                setrangecourses(response.data.data)
        } catch (error) { logError(error) }
    }

    React.useEffect(() => {
        getTwentyDaysRangeCourses()
    }, [])

    return (
        <div className="col-md-12">

            {
                twentyDaysRangeCourses.length ?
                    <div className="card">
                        <h3 className="card-header">مخطط الدورات خلال الايام الحالية</h3>
                        <div className="card-body">
                            <ScheduleDiagram
                                courses={twentyDaysRangeCourses}
                                rangeStartDate={moment().subtract(10, 'd').format('YYYY-MM-DD')}
                                rangeEndDate={moment().add(10, 'd').format('YYYY-MM-DD')}
                            />

                        </div>
                    </div> : null
            }

            <CoursesViewerAndFilter />
        </div >
    );
}

