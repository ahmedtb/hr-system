import React from 'react'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import CustomModal from '../../components/CustomModal'

export default function TrainingPeriodAssessmentShow() {
    const { id } = useParams();

    const [assessment, setassessment] = React.useState([])

    async function fetchAssessment() {
        axios.get(ApiEndpoints.getTrainingPeriod.replace(':id', id)).then((response) => {
            setassessment(response.data)
            console.log(response.data)
        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        fetchAssessment()
    }, [])

    async function deleteAssessment() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteTrainingPeriodAssessment.replace(':id', assessment.id))
            console.log('TrainingPeriodAssessmentsShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.TrainingPeriodAssessmentIndex} />;
    }
    
    return (
        <div className="col-12">


            <div className="card">
                <div className="card-header">
                    <h4>تقييم فترة التدريب {assessment?.id}</h4>
                    <CustomModal buttonClass="btn btn-info mr-2" label={'حدف التقييم من السجلات'} >
                        <div>
                            هل تود فعلا حدف التقييم من السجل بشكل دائما؟
                        </div>
                        <button className="btn btn-secondary" onClick={deleteAssessment} data-dismiss="modal">نعم</button>
                        <button className='btn btn-success' data-dismiss="modal">لا</button>

                    </CustomModal>
                </div>
                <div className="card-body">

                    <h4 className="text-center">
                        مؤسسة التناصح
                    </h4>
                    <h4 className="text-center">
                        استمارة تقييم موظف في الفترة التدريبية
                    </h4>
                    <div className="p-3">
                        <div className="row">
                            <div className="col-6 ">
                                التاريخ:{assessment?.date}
                            </div>
                            <div className="col-6">
                                اسم الموظف {assessment?.employee?.name}
                            </div>
                            <div className="col-6">
                                الإدارة: {assessment?.unit?.name}
                            </div>
                        </div>

                        <div className="row">
                            <strong>التقييم:</strong>
                        </div>
                        <div className="row">
                            الحماس في العمل: {assessment?.excitement}
                        </div>
                        <div className="row">
                            القدرة على التعلم والتطور: {assessment?.ability_to_improve}
                        </div>
                        <div className="row">
                            تقبل واستيعاب التوجيه: {assessment?.guidance_acceptance}
                        </div>

                        <div className="row">
                            التعامل مع التقنية: {assessment?.handling_technology}
                        </div>
                        <div className="row">
                            المحافظة على الوقت أثناء الدوام: {assessment?.maintaining_working_hours}
                        </div>
                        <div className="row">
                            العلاقة مع الزملاء: {assessment?.relationship_with_colleagues}
                        </div>
                        <div className="row">
                            حسن التصرف: {assessment?.behavior}
                        </div>
                        <div className="row">
                            حسن المظهر: {assessment?.look}
                        </div>
                        <div className="row">
                            الإيمان بسياسة القناة والولاء لها: {assessment?.belief_and_loyalty}
                        </div>
                        <div className="row">
                            الدرجة النهائية: {assessment?.final_degree}
                        </div>
                        <div className="row">
                            اسم معدّ التقرير: {assessment?.reporter?.name}
                        </div>
                        <div className="row">
                            توصية مدير الإدارة: {assessment?.unit_head_recommendation}
                        </div>

                        <hr />


                        <div className="row">
                            تقرير منظومة البصمة يوضح الحضور والانصراف من {assessment?.id} إلى {assessment?.id}
                        </div>

                        <div className="row">
                            التأخير بالدقائق {assessment?.id}
                        </div>

                        <div className="row">
                            الخروج المبكر بالدقائق: {assessment?.early_departure_min}
                        </div>
                        <div className="row">
                            خصم يوم عن كل تأخير ثلاثة أيام متتالية: {assessment?.delay_deduction}
                        </div>
                        <div className="row">
                            خصم لكل يوم لا توجد به البصمة الكاملة: {assessment?.footprint_deduction}
                        </div>
                        <div className="row">
                            الغياب: {assessment?.absence_days}
                        </div>
                        <div className="row">
                            نسبة الحضور:  {assessment?.attendance_rate}
                        </div>
                        <div className="row">

                            قرار اجتماع الإدارة العليا: {assessment?.management_decision}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}