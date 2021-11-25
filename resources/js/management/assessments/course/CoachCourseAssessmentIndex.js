import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import { Link } from 'react-router-dom'
import CoachCourseAssessmentsTable from './components/CoachCourseAssessmentsTable'
import Pagination from '../../components/Pagination'
import { DateFilter, OrderByDescFilter, TextFilter } from '../../components/Filters'
import FiltersContainer from '../../components/FiltersContainer';
import CustomModal from '../../components/CustomModal';

export default function CoachCourseAssessmentIndex() {

    const [coachCourses, setcoachCourses] = React.useState(null)

    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getCoachCourses, params = null) {
        // axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.get(link, { params: params }).then((response) => {
            setcoachCourses(response.data.data)
            setparams(params)
            console.log('getCoachCourses', response.data)
            if (response.data.links) { setlinks(response.data.links) } else { setlinks(null) }

        }).catch((error) => logError(error))
    }
    async function clearFilters() {
        fetchPage(ApiEndpoints.getCoachCourses, null)
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPage(ApiEndpoints.getCoachCourses, params)
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">

                <div className="card-header">
                    <div className="row justify-content-between">
                        <h4>
                            تقييمات المدربين للدورات
                        </h4>
                        <div>
                            <Link to={routes.conductCoachCourseAssessment}>اجراء تقييم مدرب لدورة</Link>
                        </div>
                    </div>
                </div>


                <div className="card-body">


                    <div className="row align-items-start">

                        <FiltersContainer label="ترشيح التقييمات" clearFilters={clearFilters}>
                            <CustomModal label="ترشيح التقييمات وفقا لـ">
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'trainees_discipline'}
                                    label={'انضباط المتدربيين'}
                                />
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'trainees_interaction'}
                                    label={'تفاعل المتدربين أثناء المحاضرة'}
                                />
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'congruence_with_content'}
                                    label={'انسجام المتدربين مع مادة الدورة'}
                                />
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'trainees_cooperation'}
                                    label={'مدى تعاون المتدربين'}
                                />
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'syllabus_understanding'}
                                    label={'استيعاب منهج الدورة'}
                                />
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'hall_preparation'}
                                    label={'تجهيزات القاعة'}
                                />
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'reception_supervision'}
                                    label={'الاستقبال والإشراف'}
                                />
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'hospitality_and_course_breaks'}
                                    label={'الضيافة وفترات الراحة بالدورة'}
                                />
                                <OrderByDescFilter
                                    params={params}
                                    fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                    property={'training_department_cooperation'}
                                    label={'تعاون وتجاوب وحدة التدريب'}
                                />
                            </CustomModal>
                            <TextFilter
                                params={params}
                                fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                property={'note'}
                                label={'ملاحظة على الدورة'}
                            />
                            <DateFilter
                                params={params}
                                fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoachCourses, newparams)}
                                property={'created_at'}
                                label={'تاريخ انشاء التقييم'}
                            />
                        </FiltersContainer>
                        
                    </div>

                    <div className="">
                        <CoachCourseAssessmentsTable coachCourses={coachCourses} />
                        <Pagination fetcPage={fetchPage} links={links} />

                    </div>
                </div>

            </div>
        </div>


    )
}