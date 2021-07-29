import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../../../utility/routesEndpoints'

export default function TraineeCourseAssessmentsTable(props) {
    const traineeCourses = props.traineeCourses

    const [dataShow, setdataShow] = React.useState({
        employee_id: false,
        reporter_id: false,
        trial_begin_date: false,
        trial_end_date: false,
        excitement: false,
        final_degree: false,
        ability_to_improve: false,
        guidance_acceptance: false,
        handling_technology: false,
        maintaining_working_hours: false,
        relationship_with_colleagues: false,
        behavior: false,
        look: false,
        belief_and_loyalty: false,
        unit_head_recommendation: false,
        delay_in_min: false,
        early_departure_min: false,
        delay_deduction: false,
        footprint_deduction: false,
        absence_days: false,
        attendance_rate: false,
        management_decision: false,
    })

    const labels = {
        employee_id: 'رقم الموظف',
        reporter_id: 'رقم معد التقرير',
        trial_begin_date: 'بداية الفترة التجريبية',
        trial_end_date: 'نهاية الفترة التجريبية',

        excitement: 'الحماس',
        final_degree: 'الدرجة النهائية',
        ability_to_improve: 'القدرة على التعلم والتطور',
        guidance_acceptance: 'تقبل واستيعاب التوجيه',
        handling_technology: 'التعامل مع التقنية',
        maintaining_working_hours: 'المحافظة على الوقت أثناء الدوام',
        relationship_with_colleagues: 'العلاقة مع الزملاء',
        behavior: 'حسن التصرف',
        look: 'حسن المظهر',
        belief_and_loyalty: 'الإيمان بسياسة القناة والولاء لها',
        unit_head_recommendation: 'توصية مدير الإدارة',
        delay_in_min: 'التأخير بالدقائق',
        early_departure_min: 'الخروج المبكر بالدقائق',
        delay_deduction: 'خصم يوم عن كل تأخير ثلاثة أيام متتالية',
        footprint_deduction: 'خصم لكل يوم لا توجد به البصمة الكاملة',
        absence_days: 'الغياب',
        attendance_rate: 'نسبة الحضور',
        management_decision: 'قرار اجتماع الإدارة العليا',

    }
    function toggleDataShow(e) {
        setdataShow(pre => ({
            ...pre,
            [e.target.value]: e.target.checked
        }))
    }
    return (

        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>training course title</th>
                    <th>coach_communication </th>
                    <th>coach_cooperation</th>
                    <th>created_at</th>
                </tr>
            </thead>
            <tbody>
                {traineeCourses?.map((traineeCourse, index) => (
                    <tr key={index}>
                        <td>{traineeCourse.id}</td>
                        <td>
                            <Link to={routes.showCourse.replace(':id', traineeCourse.training_course.id)}>{traineeCourse.training_course.title}</Link>
                        </td>
                        <td>{traineeCourse.coach_communication.rating}</td>
                        <td>{traineeCourse.coach_cooperation.rating}</td>
                        <td>{moment(traineeCourse.created_at).format('yyyy-MM-DD')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}