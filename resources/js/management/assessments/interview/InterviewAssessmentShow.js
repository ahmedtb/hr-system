import React from 'react'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import Pagination from '../../components/Pagination'
import moment from 'moment'
import CustomModal from '../../components/CustomModal'


export default function InterviewAssessmentShow() {
    const { id } = useParams();

    const [assessment, setassessment] = React.useState([])

    async function fetchAssessment() {
        axios.get(ApiEndpoints.getInterview.replace(':id', id)).then((response) => {
            setassessment(response.data)
            console.log(response.data)
        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        fetchAssessment()
    }, [])

    const assessmentFields = [
        {
            property: 'look',
            label: 'المظهر',
        },
        {
            property: 'self_introduction',
            label: 'تعريفه لنفسه',
        },
        {
            property: 'personality',
            label: 'الشخصية',
        },
        {
            property: 'english',
            label: 'اللغة الانجليزية',
        },
        {
            property: 'culture',
            label: 'الثقافة',
        },
        {
            property: 'arabic',
            label: 'اللغة العربية',
        },
        {
            property: 'initiative',
            label: 'المبادرة',
        },
        {
            property: 'sharing_skills',
            label: 'مهارات المشاركة',
        },
        {
            property: 'comprehension',
            label: 'الاستيعاب',
        },
        {
            property: 'decision_making',
            label: 'اتخاد القرار',
        },
        {
            property: 'compatibility_of_education',
            label: 'ملائمة المؤهل العلمي لمتطلبات الوظيفة',
        },
        {
            property: 'compatibility_of_experiance',
            label: 'ملائمة الخبرات العلمية لمتطلبات الوظيفة',
        },
        {
            property: 'compatibility_of_skills',
            label: 'ملائمة المهارات المكتسبة لمتطلبات الوظيفة',
        },
        {
            property: 'problem_solving_skills',
            label: 'مدى استطاعته لحل المشاكل',
        },
        {
            property: 'stress_handling',
            label: 'مدى تعامله مع الضغط والتوتر الوظيفي',
        },
        {
            property: 'moral_courage_self_confidence',
            label: 'الشجاعة الأدبية والثقة بالنفس',
        }
    ]



    async function deleteAssessment() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteInterviewAssessment.replace(':id', assessment.id))
            console.log('InterviewAssessmentsShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.interviewAssessmentIndex} />;
    }


    return (
        <div className="col-12">


            <div className="card">
                <div className="card-header">
                    <h3>تقييم مدرب لدورة {assessment?.id}</h3>
                    <CustomModal buttonClass="btn btn-info mr-2" label={'حدف التقييم من السجلات'} >
                        <div>
                            هل تود فعلا حدف التقييم من السجل بشكل دائما؟
                        </div>
                        <button className="btn btn-secondary" onClick={deleteAssessment} data-dismiss="modal">نعم</button>
                        <button className='btn btn-success' data-dismiss="modal">لا</button>

                    </CustomModal>
                </div>
                <div className="card-body">

                    <h3 className="text-center">
                        مؤسسة التناصح للدعوة والثقافة والإعلام
                    </h3>
                    <h3 className="text-center">
                        إدارة الموارد البشرية
                    </h3>
                    <h3 className="text-center">
                        استمارة تقييم دورة تدريبية
                    </h3>
                    <div className="p-3">


                        <table className="table table-bordered table-condensed">
                            <thead>
                                <tr>
                                    <td>تقييم</td>
                                    <td>ممتاز</td>
                                    <td>جيد</td>
                                    <td>متوسط</td>
                                    <td>ضعيف</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    assessmentFields.map((field, index) => (
                                        <tr key={index}>
                                            <td >{field.label}</td>
                                            <td >{assessment?.[field.property] == 4 ? 'true' : null}</td>
                                            <td >{assessment?.[field.property] == 3 ? 'true' : null}</td>
                                            <td >{assessment?.[field.property] == 2 ? 'true' : null}</td>
                                            <td >{assessment?.[field.property] == 1 ? 'true' : null}</td>
                                        </tr>
                                    ))

                                }
                            </tbody>
                        </table>

                        <hr />

                        <div className="row">
                            <div className="col-6">

                                تاريخ انشاء التقييم {moment(assessment?.created_at).format('yyyy-MM-DD')}
                            </div>
                            <div className="col-6">
                                اسم مجري المقابلة {assessment?.interviewer?.name}

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}