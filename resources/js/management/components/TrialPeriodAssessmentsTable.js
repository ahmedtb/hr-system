import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

function DataPresentation(row, property) {

    if (property == 'created_at') {

        return moment(row.created_at).format('yyyy-MM-DD')
    } else if (property == 'id') {

        return <Link to={routes.showTrialPeriodAssessment.replace(':id', row[property])}>{row[property]}</Link>
    }

    return row[property]
}

export default function TrialPeriodAssessmentTable(props) {
    const trialPeriods = props.trialPeriods

    const [dataShow, setdataShow] = React.useState({
        id: { visiblity: true, label: 'رقم التقييم', presentation: (row) => DataPresentation(row, 'id') },
        employee_id: { visiblity: true, label: 'رقم الموظف', presentation: (row) => DataPresentation(row, 'employee_id') },
        reporter_id: { visiblity: true, label: 'رقم معد التقرير', presentation: (row) => DataPresentation(row, 'reporter_id') },
        trial_begin_date: { visiblity: true, label: 'بداية الفترة التجريبية', presentation: (row) => DataPresentation(row, 'trial_begin_date') },
        trial_end_date: { visiblity: true, label: 'نهاية الفترة التجريبية', presentation: (row) => DataPresentation(row, 'trial_end_date') },
        excitement: { visiblity: false, label: 'الحماس', presentation: (row) => DataPresentation(row, 'excitement') },
        final_degree: { visiblity: false, label: 'الدرجة النهائية', presentation: (row) => DataPresentation(row, 'final_degree') },
        ability_to_improve: { visiblity: false, label: 'القدرة على التعلم والتطور', presentation: (row) => DataPresentation(row, 'ability_to_improve') },
        guidance_acceptance: { visiblity: false, label: 'تقبل واستيعاب التوجيه', presentation: (row) => DataPresentation(row, 'guidance_acceptance') },
        handling_technology: { visiblity: false, label: 'التعامل مع التقنية', presentation: (row) => DataPresentation(row, 'handling_technology') },
        maintaining_working_hours: { visiblity: false, label: 'المحافظة على الوقت أثناء الدوام', presentation: (row) => DataPresentation(row, 'maintaining_working_hours') },
        relationship_with_colleagues: { visiblity: false, label: 'العلاقة مع الزملاء', presentation: (row) => DataPresentation(row, 'relationship_with_colleagues') },
        behavior: { visiblity: false, label: 'حسن التصرف', presentation: (row) => DataPresentation(row, 'behavior') },
        look: { visiblity: false, label: 'حسن المظهر', presentation: (row) => DataPresentation(row, 'look') },
        belief_and_loyalty: { visiblity: false, label: 'الإيمان بسياسة القناة والولاء لها', presentation: (row) => DataPresentation(row, 'belief_and_loyalty') },
        unit_head_recommendation: { visiblity: false, label: 'توصية مدير الإدارة', presentation: (row) => DataPresentation(row, 'unit_head_recommendation') },
        delay_in_min: { visiblity: false, label: 'التأخير بالدقائق', presentation: (row) => DataPresentation(row, 'delay_in_min') },
        early_departure_min: { visiblity: false, label: 'الخروج المبكر بالدقائق', presentation: (row) => DataPresentation(row, 'early_departure_min') },
        delay_deduction: { visiblity: false, label: 'خصم يوم عن كل تأخير ثلاثة أيام متتالية', presentation: (row) => DataPresentation(row, 'delay_deduction') },
        footprint_deduction: { visiblity: false, label: 'خصم لكل يوم لا توجد به البصمة الكاملة', presentation: (row) => DataPresentation(row, 'footprint_deduction') },
        absence_days: { visiblity: false, label: 'الغياب', presentation: (row) => DataPresentation(row, 'absence_days') },
        attendance_rate: { visiblity: false, label: 'نسبة الحضور', presentation: (row) => DataPresentation(row, 'attendance_rate') },
        management_decision: { visiblity: false, label: 'قرار اجتماع الإدارة العليا', presentation: (row) => DataPresentation(row, 'management_decision') },

    })

    function toggleDataShow(e) {
        setdataShow(pre => ({
            ...pre,
            [e.target.value]: { ...pre[e.target.value], visiblity: e.target.checked }
        }))
    }

    return (
        <>
            <div>
                <strong>عرض البيانات في الجدول</strong><br />
                {
                    Object.entries(dataShow).map((data, index) => (
                        <div key={index} className="form-check-inline">
                            <input className="form-check-input" type="checkbox" value={data[0]} onClick={(e) => toggleDataShow(e)} />
                            <label className="form-check-label" >
                                {data[1].label}
                            </label>
                        </div>
                    ))
                }

            </div>

            <table className="table table-bordered table-condensed">
                <thead>
                    <tr>
                        {
                            Object.entries(dataShow).map((data, index) => (
                                (data[1].visiblity) ? <td key={index}>{data[1].label}</td> : null
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {trialPeriods.map((assessment, index) => (
                        <tr key={index}>
                            {
                                Object.entries(dataShow).map((data, index) => (
                                    (data[1].visiblity) ? <td key={index}>{data[1].presentation(assessment)}</td> : null
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}