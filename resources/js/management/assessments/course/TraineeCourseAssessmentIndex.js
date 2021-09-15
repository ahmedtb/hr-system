import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import TraineeCourseAssessmentsTable from './components/TraineeCourseAssessmentsTable'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { EmployeeFilter, OrderByDescFilter, TextFilter } from '../../components/Filters'
import FiltersContainer from '../../components/FiltersContainer';
import CustomModal from '../../components/CustomModal';

function Filters(props) {
    const fetchPage = props.fetchPage
    const params = props.params

    async function clearFilters() {
        fetchPage(ApiEndpoints.getTraineeCourses, null)
    }

    return (

        <div className="row align-items-start">

            <FiltersContainer label="ترشيح التقييمات" clearFilters={clearFilters}>
                <CustomModal label="ترشيح التقييمات وفقا لـ">
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'coach_understanding'}
                        label={'فهم المدرب'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'coach_communication'}
                        label={'قدرة المدرب على توصيل المعلومات'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'طريقة تنظيم العرض'}
                        label={'presentation'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'coach_cooperation'}
                        label={'مدى تعاون وتفاعل المدرب مع المتدربين'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'program_quality'}
                        label={'جودة برنامج التدريب'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'technical_preparation'}
                        label={'التجهيزات الفنية للدورة	'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'training_hall_preparation'}
                        label={'القاعة التدريبية وتجهيزاتها'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'reception'}
                        label={'لاستقبال و الإجراءات التنظيمية'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'hospitality_and_course_breaks'}
                        label={'الضيافة وفترات الراحة بالدورة'}
                    />
                    <OrderByDescFilter
                        params={params}
                        fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                        property={'training_unit_response'}
                        label={'تعاون وتجاوب وحدة التدريب'}
                    />
                </CustomModal>
                <EmployeeFilter
                    params={params}
                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                    property={'employee_id'}
                    label={'المتدرب'}
                />

                <TextFilter
                    params={params}
                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getTraineeCourses, newparams)}
                    property={'course_title'}
                    label={'عنوان البرنامج التدريبي	'}
                />
            </FiltersContainer>

        </div>

    )
}

export default function TraineeCourseAssessmentIndex() {

    const [traineeCourses, settraineeCourses] = React.useState(null)

    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getTraineeCourses, params = null) {
        axios.get(link, { params: params }).then((response) => {
            settraineeCourses(response.data.data)
            setparams(params)
            console.log(response.data)
            if (response.data.links) { setlinks(response.data.links) } else { setlinks(null) }

        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPage(ApiEndpoints.getTraineeCourses, params)
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">

                <div className="card-header">
                    <div className="row justify-content-between">
                        <h3>
                            تقييمات المتدربيين للدورات
                        </h3>
                        <div>
                            <Link to={routes.conductTraineeCourseAssessment}>اجراء تقييم متدرب لدورة</Link>
                        </div>
                    </div>
                </div>



                <div className="card-body">
                    <Filters fetchPage={fetchPage} params={params} />
                    <div className="row justify-content-center">

                        <div className="col-12">
                            <TraineeCourseAssessmentsTable traineeCourses={traineeCourses} />
                        </div>
                        <Pagination fetchPage={fetchPage} links={links} />
                    </div>
                </div>

            </div>
        </div>

    )
}