import React from 'react'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import moment from 'moment'
import CustomModal from '../../components/CustomModal'
export default function TraineeCourseAssessmentShow() {
    const { id } = useParams();

    const [assessment, setassessment] = React.useState([])

    async function fetchAssessment() {
        axios.get(ApiEndpoints.getTraineeCourse.replace(':id', id)).then((response) => {
            setassessment(response.data)
            console.log(response.data)
        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        fetchAssessment()
    }, [])

    const assessmentFields = [
        {
            property: 'coach_understanding',
            label: 'إلمام المدرب بمواضيع البرنامج التدريبي',
        },
        {
            property: 'coach_communication',
            label: 'قدرة المدرب على توصيل المعلومات',
        },
        {
            property: 'presentation',
            label: 'طريقة تنظيم العرض (من حيث الوضوح والكفاية )',
        },
        {
            property: 'coach_cooperation',
            label: 'مدى تعاون وتفاعل المدرب مع المتدربين',
        },
        {
            property: 'program_quality',
            label: 'جودة برنامج التدريب',
        },
        {
            property: 'technical_preparation',
            label: 'التجهيزات الفنية للدورة',
        },
        {
            property: 'training_hall_preparation',
            label: 'القاعة التدريبية  وتجهيزاتها (الإضاءة؛ التهوية؛ وسائل الإيضاح ... إلخ )',
        },
        {
            property: 'reception',
            label: 'لاستقبال و الإجراءات التنظيمية',
        },
        {
            property: 'hospitality_and_course_breaks',
            label: 'الضيافة وفترات الراحة بالدورة',
        },
        {
            property: 'training_unit_response',
            label: 'تعاون وتجاوب وحدة التدريب',
        }
    ]

    async function deleteAssessment() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteTraineeCourseAssessment.replace(':id', assessment.id))
            console.log('TraineeCourseAssessmentShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.TraineeCourseAssessmentIndex} />;
    }

    return (
        <div className="col-12">


            <div className="card">
                <div className="card-header">
                   <h4> تقييم مدرب لدورة {assessment?.id}</h4>
                    <CustomModal buttonClass="btn btn-info mr-2" label={'حدف التقييم من السجلات'} >
                        <div>
                            هل تود فعلا حدف التقييم من السجل بشكل دائما؟
                        </div>
                        <button className="btn btn-secondary" onClick={deleteAssessment} data-dismiss="modal">نعم</button>
                        <button className='btn btn-success' data-dismiss="modal">لا</button>

                    </CustomModal>
                    {/* <EditTraineeCourseAssessment assessment={assessment} /> */}
                </div>
                <div className="card-body">

                    <h4 className="text-center">
                        مؤسسة التناصح للدعوة والثقافة والإعلام
                    </h4>
                    <h4 className="text-center">
                        إدارة الموارد البشرية
                    </h4>
                    <h4 className="text-center">
                        استمارة تقييم دورة تدريبية
                    </h4>
                    <div className="p-3">
                        <div className="row">
                            <div className="col-6 ">
                                اسم الدورة:{assessment?.training_course?.title}
                            </div>
                        </div>

                        <div className="row p-5 fs-5">
                            <h5 > عزيزي المدرب الرجاء تقييم هذه الدورة التدريبية بوضع علامة (    ) في المكان الذي يعبر عن رأيك؛ وإضافة تعليقك على أي عنصر من عناصر التقييم كما يلي (5 = ممتاز؛ 4 = جيد جدا؛ 3 = جيد؛ 2 = مقبول؛ 1 = ضعيف)</h5>
                        </div>
                        <table className="table table-light table-bordered table-condensed">
                            <thead className="thead-light">
                                <tr>
                                    <td>م</td>
                                    <td>البيان</td>
                                    <td>5</td>
                                    <td>4</td>
                                    <td>3</td>
                                    <td>2</td>
                                    <td>1</td>
                                    <td>التعليقات</td>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    assessmentFields.map((field, index) => (
                                        <tr key={index}>
                                            <td >{index + 1}</td>
                                            <td >{field.label}</td>
                                            <td >{assessment?.[field.property]?.rating == 5 ? 'true' : null}</td>
                                            <td >{assessment?.[field.property]?.rating == 4 ? 'true' : null}</td>
                                            <td >{assessment?.[field.property]?.rating == 3 ? 'true' : null}</td>
                                            <td >{assessment?.[field.property]?.rating == 2 ? 'true' : null}</td>
                                            <td >{assessment?.[field.property]?.rating == 1 ? 'true' : null}</td>
                                            <td >{assessment?.[field.property]?.comment}</td>
                                        </tr>
                                    ))

                                }
                            </tbody>
                        </table>

                        <hr />


                        <div className="row">
                            تاريخ انشاء التقييم {moment(assessment?.created_at).format('yyyy-MM-DD')}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}