import React from 'react'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import CustomModal from '../../components/CustomModal'

export default function CoachCourseAssessmentsShow() {
    const { id } = useParams();

    const [assessment, setassessment] = React.useState([])

    async function fetchAssessment() {
        axios.get(ApiEndpoints.getCoachCourse.replace(':id', id)).then((response) => {
            setassessment(response.data)
            console.log(response.data)
        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        fetchAssessment()
    }, [])


    async function deleteAssessment() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteCoachCourseAssessment.replace(':id', assessment.id))
            console.log('CoachCourseAssessmentsShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.CoachCourseAssessmentIndex} />;
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
                        وحدة التدريب
                    </h3>
                    <h3 className="text-center">
                        استمارة تقييم دورة تدريبية
                    </h3>
                    <div className="p-3">
                        <div className="row">
                            <div className="col-6 ">
                                اسم الدورة:{assessment?.training_course?.title}
                            </div>
                        </div>

                        <div className="row p-5 fs-5">
                            <h5 > عزيزي المدرب الرجاء تقييم هذه الدورة التدريبية بوضع علامة (    ) في المكان الذي يعبر عن رأيك؛ وإضافة تعليقك على أي عنصر من عناصر التقييم كما يلي (5 = ممتاز؛ 4 = جيد جدا؛ 3 = جيد؛ 2 = مقبول؛ 1 = ضعيف)</h5>
                        </div>
                        <table className="table table-bordered table-condensed">
                            <thead>
                                <tr>
                                    <td>م</td>
                                    <td>البيان</td>
                                    <td>4</td>
                                    <td>3</td>
                                    <td>2</td>
                                    <td>1</td>
                                    <td>0</td>
                                    <td>التعليقات</td>

                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td >1</td>
                                    <td >انضباط المتدربين في الحضور والانصراف</td>
                                    <td >{assessment?.trainees_discipline?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_discipline?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_discipline?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_discipline?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_discipline?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_discipline?.comment}</td>
                                </tr>
                                <tr >
                                    <td >2</td>
                                    <td >تفاعل المتدربين أثناء المحاضرة</td>
                                    <td >{assessment?.trainees_interaction?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_interaction?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_interaction?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_interaction?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_interaction?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_interaction?.comment}</td>
                                </tr>
                                <tr >
                                    <td >3</td>
                                    <td >انسجام المتدربين مع مادة الدورة</td>
                                    <td >{assessment?.congruence_with_content?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.congruence_with_content?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.congruence_with_content?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.congruence_with_content?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.congruence_with_content?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.congruence_with_content?.comment}</td>
                                </tr>
                                <tr >
                                    <td >4</td>
                                    <td >مدى تعاون المتدربين</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 0 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.comment}</td>
                                </tr>
                                <tr >
                                    <td >5</td>
                                    <td >استيعاب منهج الدورة</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.rating == 0 ? 'true' : null}</td>
                                    <td >{assessment?.trainees_cooperation?.comment}</td>
                                </tr>

                                <tr >
                                    <td >6</td>
                                    <td >تجهيزات القاعة (الإضاءة؛ التهوية؛ وسائل الإيضاح .. إلخ)</td>
                                    <td >{assessment?.hall_preparation?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.hall_preparation?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.hall_preparation?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.hall_preparation?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.hall_preparation?.rating == 0 ? 'true' : null}</td>
                                    <td >{assessment?.hall_preparation?.comment}</td>
                                </tr>
                                <tr >
                                    <td >7</td>
                                    <td >الاستقبال والإشراف</td>
                                    <td >{assessment?.reception_supervision?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.reception_supervision?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.reception_supervision?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.reception_supervision?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.reception_supervision?.rating == 0 ? 'true' : null}</td>
                                    <td >{assessment?.reception_supervision?.comment}</td>
                                </tr>
                                <tr >
                                    <td >8</td>
                                    <td >الضيافة وفترات الراحة بالدورة</td>
                                    <td >{assessment?.hospitality_and_course_breaks?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.hospitality_and_course_breaks?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.hospitality_and_course_breaks?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.hospitality_and_course_breaks?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.hospitality_and_course_breaks?.rating == 0 ? 'true' : null}</td>
                                    <td >{assessment?.hospitality_and_course_breaks?.comment}</td>
                                </tr>
                                <tr >
                                    <td >9</td>
                                    <td >تعاون وتجاوب إدارة التدريب</td>
                                    <td >{assessment?.training_department_cooperation?.rating == 4 ? 'true' : null}</td>
                                    <td >{assessment?.training_department_cooperation?.rating == 3 ? 'true' : null}</td>
                                    <td >{assessment?.training_department_cooperation?.rating == 2 ? 'true' : null}</td>
                                    <td >{assessment?.training_department_cooperation?.rating == 1 ? 'true' : null}</td>
                                    <td >{assessment?.training_department_cooperation?.rating == 0 ? 'true' : null}</td>
                                    <td >{assessment?.training_department_cooperation?.comment}</td>
                                </tr>
                            </tbody>
                        </table>

                        <hr />


                        <div className="row">
                            اقتراحات وملاحظات {assessment?.note}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}