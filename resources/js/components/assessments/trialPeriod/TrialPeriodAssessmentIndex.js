import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import Pagination from '../../utility/Pagination'

export default function TrialPeriodAssessmentIndex() {

    const [assessments, setassessments] = React.useState([])

    const [links, setlinks] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getTrialPeriods, params = null) {
        axios.get(link, {
            params: params
        }).then((response) => {
            setassessments(response.data.data)
            console.log(response.data)
            if (response.data.links) {
                setlinks(response.data.links)
            } else
                setlinks(null)

        }).catch((error) => logError(error))
    }
    React.useEffect(() => {
        fetchPage()
    }, [])


    const [dataShow, setdataShow] = React.useState({
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
        trial_begin_date: 'بداية الفترة التجريبية',
        trial_begin_date: 'نهاية الفترة التجريبية',

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

    React.useEffect(() => {
        //    console.log(dataShow)
    }, [dataShow])

    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">تقيمات فترة التجريب</div>
                <div className="card-body">

                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'final_degree' })}>افضل الدرجات</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'excitement' })}>الافضل في الحماسة</button>

                    <div>
                        <strong>عرض البيانات في الجدول</strong><br />
                        {
                            Object.entries(dataShow).map((data, index) => (
                                <div key={index} className="form-check-inline">
                                    <input className="form-check-input" type="checkbox" value={data[0]} onClick={(e) => toggleDataShow(e)} />
                                    <label className="form-check-label" >
                                        {labels[data[0]]}
                                    </label>
                                </div>
                            ))
                        }

                    </div>

                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />
                    <table className="table table-bordered table-condensed" style={{ marginBottom: 0 }}>
                        <thead>
                            <tr>
                                <th >ID</th>
                                <th >الموظف</th>
                                <th >معد التقرير</th>

                                {
                                    Object.entries(dataShow).map((data, index) => (
                                        (data[1]) ? <td key={index}>{labels[data[0]]}</td> : null
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {assessments.map((assessment, index) => (
                                <tr key={index}>
                                    <td>
                                        {assessment.id}
                                    </td>
                                    <td>
                                        <Link to={routes.showEmployee.replace(':id',assessment.employee.id)}>{assessment.employee.name}</Link>
                                    </td>
                                    <td>
                                        <Link to={routes.showEmployee.replace(':id',assessment.reporter.id)}>{assessment.reporter.name}</Link>
                                    </td>
                                    {
                                        Object.entries(dataShow).map((data, index) => (
                                            (data[1]) ? <td key={index}>{assessment[data[0]]}</td> : null
                                        ))
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}