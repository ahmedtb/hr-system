import React from 'react'
import axios from 'axios'
import { Link, useParams, useLocation } from 'react-router-dom'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import Pagination from '../../utility/Pagination'

export default function TrialPeriodAssessmentIndex() {

    const [assessments, setassessments] = React.useState([])
    const [links, setlinks] = React.useState([])
    // const urlParams = new URLSearchParams(useLocation().search);

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

    const [from, setfrom] = React.useState(null)
    const [to, setto] = React.useState(null)

    const [trial_begin, settrial_begin] = React.useState(null)
    const [trial_end, settrial_end] = React.useState(null)

    const [employees, setemployees] = React.useState(null)
    const [employee_id, setemployee_id] = React.useState(null)

    async function getEmployees() {
        axios.get(ApiEndpoints.getEmployees).then((response) => {
            setemployees(response.data)
        }).catch((err) => logError(err))
    }

    React.useEffect(() => {
        getEmployees()
        var params = Object.fromEntries(new URLSearchParams(location.search));
        // console.log(params)
        fetchPage(ApiEndpoints.getTrialPeriods, params)

    }, [])

    return (
        <div className="col-md-10">
            <div className="card">

                <div className="card-header">
                    احصائيات
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <Link to={routes.conductTrialPeriodAssessment}>اجراء تقييم الموظف في الفترة التجريبية</Link>
                    </div>
                </div>

            </div>

            <div className="card">
                <div className="card-header">تقيمات فترة التجريب</div>
                <div className="card-body">

                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'final_degree' })}>افضل الدرجة الكلية</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'excitement' })}>الافضل في الحماسة</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'ability_to_improve' })}>الافضل في القدرة على التعلم والتطور</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'guidance_acceptance' })}>الافضل في تقبل واستيعاب التوجيه</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'handling_technology' })}>الافضل في التعامل مع التقنية</button>

                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'maintaining_working_hours' })}>الافضل في المحافظة على الوقت أثناء الدوام</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'relationship_with_colleagues' })}>الافضل في العلاقة مع الزملاء</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'behavior' })}>الافضل في حسن التصرف</button>

                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'look' })}>الافضل في حسن المظهر</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'belief_and_loyalty' })}>الافضل في الإيمان بسياسة القناة والولاء لها</button>

                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByAsc: 'delay_in_min' })}>الافضل من حيث التأخير بالدقائق</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByAsc: 'early_departure_min' })}>الافضل من حيث الخروج المبكر بالدقائق</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByAsc: 'absence_days' })}>الافضل من حيث الغياب</button>
                    <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'attendance_rate' })}>الافضل من حيث نسبة الحضور</button>

                    <div>
                        <strong>تاريخ اعداد التقرير بين:</strong><br />
                        <label className="form-check-label" >بدء</label><br />
                        <input className="form-check-input" type="date" onChange={(e) => setfrom(e.target.value)} /><br />
                        <label className="form-check-label" >نهاية</label><br />
                        <input className="form-check-input" type="date" onChange={(e) => setto(e.target.value)} /><br />
                        <button onClick={() => {
                            let params = Object.assign({},
                                from === null ? null : { from },
                                to === null ? null : { to },
                            )
                            // console.log(params)
                            fetchPage(ApiEndpoints.getTrialPeriods, params)
                        }}>filter</button>

                    </div>

                    <div>
                        <strong>تاريخ بدء ونهاية الفترة:</strong><br />
                        <label className="form-check-label" >بداية</label><br />
                        <input className="form-check-input" type="date" onChange={(e) => settrial_begin(e.target.value)} /><br />
                        <label className="form-check-label" >نهاية</label><br />
                        <input className="form-check-input" type="date" onChange={(e) => settrial_end(e.target.value)} /><br />


                        <button onClick={() => {
                            let params = Object.assign({},
                                trial_begin === null ? null : { trial_begin },
                                trial_end === null ? null : { trial_end },
                            )
                            // console.log(params)
                            fetchPage(ApiEndpoints.getTrialPeriods, params)
                        }}>filter</button>

                    </div>

                    <div>
                        <strong>تقييمات الموظف:</strong><br />
                        <label className="form-check-label" >الموظف</label><br />
                        <li className="list-group-item">
                            <label htmlFor="employee">اختر الموظف</label>
                            <select onChange={(e) => setemployee_id(e.target.value)} name="employee_id">
                                <option value=''>select employee name</option>
                                {
                                    employees?.map((employee, index) => (
                                        <option key={index} value={employee.id}>{employee.name}</option>
                                    ))
                                }
                            </select>
                        </li>
                        {/* <input className="form-check-input" type="date" onChange={(e) => setemployee(e.target.value)} /><br /> */}
                        <button onClick={() => {
                            let params = Object.assign({},
                                employee_id === null ? null : { employee_id },
                            )
                            fetchPage(ApiEndpoints.getTrialPeriods, params)
                        }}>filter</button>

                    </div>

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
                                        <Link to={routes.showEmployee.replace(':id', assessment.employee.id)}>{assessment.employee.name}</Link>
                                    </td>
                                    <td>
                                        <Link to={routes.showEmployee.replace(':id', assessment.reporter.id)}>{assessment.reporter.name}</Link>
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