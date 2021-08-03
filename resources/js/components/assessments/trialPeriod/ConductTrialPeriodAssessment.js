import axios from 'axios'
import React from 'react'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import moment from 'moment'
export default function ConductTrialPeriodAssessment(props) {

    const [date, setdate] = React.useState(moment().format('YYYY-MM-DD'))
    const [employee_id, setemployee_id] = React.useState(null)
    const [unit_id, setunit_id] = React.useState(null)
    const [trial_begin_date, settrial_begin_date] = React.useState(null)
    const [trial_end_date, settrial_end_date] = React.useState(null)
    const [excitement, setexcitement] = React.useState(null)
    const [ability_to_improve, setability_to_improve] = React.useState(null)
    const [guidance_acceptance, setguidance_acceptance] = React.useState(null)
    const [handling_technology, sethandling_technology] = React.useState(null)
    const [maintaining_working_hours, setmaintaining_working_hours] = React.useState(null)
    const [relationship_with_colleagues, setrelationship_with_colleagues] = React.useState(null)
    const [behavior, setbehavior] = React.useState(null)
    const [look, setlook] = React.useState(null)
    const [belief_and_loyalty, setbelief_and_loyalty] = React.useState(null)
    const [final_degree, setfinal_degree] = React.useState(null)
    const [reporter_id, setreporter_id] = React.useState(null)
    const [unit_head_recommendation, setunit_head_recommendation] = React.useState(null)
    const [delay_in_min, setdelay_in_min] = React.useState(null)
    const [early_departure_min, setearly_departure_min] = React.useState(null)
    const [delay_deduction, setdelay_deduction] = React.useState(null)
    const [footprint_deduction, setfootprint_deduction] = React.useState(null)
    const [absence_days, setabsence_days] = React.useState(null)
    const [attendance_rate, setattendance_rate] = React.useState(null)
    const [management_decision, setmanagement_decision] = React.useState(null)

    const [employees, setemployees] = React.useState([])
    const [units, setunits] = React.useState([])

    React.useEffect(() => {
        axios.get(ApiEndpoints.getEmployees)
            .then((res) => { setemployees(res.data) })
            .catch(err => logError(err))
        axios.get(ApiEndpoints.getUnits)
            .then((res) => {
                // console.log(res.data)
                setunits(res.data)
            })
            .catch(err => logError(err))
    }, [])

    async function submit() {

        try {
            const data = new FormData()
            if (date) data.append('date', date)
            if (employee_id) data.append('employee_id', employee_id)
            if (unit_id) data.append('unit_id', unit_id)
            if (trial_begin_date) data.append('trial_begin_date', trial_begin_date)
            if (trial_end_date) data.append('trial_end_date', trial_end_date)
            if (excitement) data.append('excitement', excitement)
            if (ability_to_improve) data.append('ability_to_improve', ability_to_improve)
            if (guidance_acceptance) data.append('guidance_acceptance', guidance_acceptance)
            if (handling_technology) data.append('handling_technology', handling_technology)
            if (maintaining_working_hours) data.append('maintaining_working_hours', maintaining_working_hours)
            if (relationship_with_colleagues) data.append('relationship_with_colleagues', relationship_with_colleagues)
            if (behavior) data.append('behavior', behavior)
            if (look) data.append('look', look)
            if (belief_and_loyalty) data.append('belief_and_loyalty', belief_and_loyalty)
            if (final_degree) data.append('final_degree', final_degree)
            if (reporter_id) data.append('reporter_id', reporter_id)
            if (unit_head_recommendation) data.append('unit_head_recommendation', unit_head_recommendation)
            if (delay_in_min) data.append('delay_in_min', delay_in_min)
            if (early_departure_min) data.append('early_departure_min', early_departure_min)
            if (delay_deduction) data.append('delay_deduction', delay_deduction)
            if (footprint_deduction) data.append('footprint_deduction', footprint_deduction)
            if (absence_days) data.append('absence_days', absence_days)
            if (attendance_rate) data.append('attendance_rate', attendance_rate)
            if (management_decision) data.append('management_decision', management_decision)

            const res = await axios.post(ApiEndpoints.createTrialPeriodAssessment, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">اجراء تقييم مقابلة</div>

            <div className="card-body">
                <div className="row justify-content-center">

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">التاريخ</label>
                        <input className="col-8 form-control" type="date" value={date} onChange={(e) => setdate(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الموظف</label>
                        <select className="col-8 form-control" onChange={(e) => setemployee_id(e.target.value)} >
                            <option >قائمة الموظفيين</option>
                            {
                                employees?.map((employee, index) => (
                                    <option key={index} value={employee.id}>{employee.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الادارة (الوحدة)</label>
                        <select className="col-8 form-control" onChange={(e) => setunit_id(e.target.value)} >
                            <option >قائمة الوحدات</option>
                            {
                                units?.map((unit, index) => (
                                    <option key={index} value={unit.id}>{unit.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">بداية الفترة التجريبية</label>
                        <input className="col-8 form-control" type="date" onChange={(e) => settrial_begin_date(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">نهاية الفترة التجريبية</label>
                        <input className="col-8 form-control" type="date" onChange={(e) => settrial_end_date(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الحماس في العمل</label>
                        <select className="col-8 form-control" onChange={(e) => setexcitement(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">القدرة على التعلم والتطور</label>
                        <select className="col-8 form-control" onChange={(e) => setability_to_improve(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">تقبل واستيعاب التوجيه</label>
                        <select className="col-8 form-control" onChange={(e) => setguidance_acceptance(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">التعامل مع التقنية</label>
                        <select className="col-8 form-control" onChange={(e) => sethandling_technology(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">المحافظة على الوقت أثناء الدوام</label>
                        <select className="col-8 form-control" onChange={(e) => setmaintaining_working_hours(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">العلاقة مع الزملاء</label>
                        <select className="col-8 form-control" onChange={(e) => setrelationship_with_colleagues(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">حسن التصرف</label>
                        <select className="col-8 form-control" onChange={(e) => setbehavior(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">حسن المظهر</label>
                        <select className="col-8 form-control" onChange={(e) => setlook(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الإيمان بسياسة القناة والولاء لها</label>
                        <select className="col-8 form-control" onChange={(e) => setbelief_and_loyalty(e.target.value)} >
                            <option >من 15</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                    </div>

                    {/* <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الدرجة النهائية</label>
                        <input className="col-8 form-control" type="number" onChange={(e) => setfinal_degree(e.target.value)} />
                    </div> */}

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">معدّ التقرير:</label>
                        <select className="col-8 form-control" onChange={(e) => setreporter_id(e.target.value)} >
                            <option >قائمة الموظفيين</option>
                            {
                                employees?.map((employee, index) => (
                                    <option key={index} value={employee.id}>{employee.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">توصية مدير الإدارة</label>
                        <input className="col-8 form-control" type="text" onChange={(e) => setunit_head_recommendation(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">التأخير بالدقائق</label>
                        <input className="col-8 form-control" type="number" onChange={(e) => setdelay_in_min(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الخروج المبكر بالدقاذق</label>
                        <input className="col-8 form-control" type="number" onChange={(e) => setearly_departure_min(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">خصم يوم عن كل تأخير ثلاثة أيام متتالية</label>
                        <input className="col-8 form-control" type="number" onChange={(e) => setdelay_deduction(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">خصم لكل يوم لا توجد به البصمة الكاملة</label>
                        <input className="col-8 form-control" type="number" onChange={(e) => setfootprint_deduction(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الغياب</label>
                        <input className="col-8 form-control" type="number" onChange={(e) => setabsence_days(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">نسبة الحضور</label>
                        <input className="col-8 form-control" type="number" onChange={(e) => setattendance_rate(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">قرار اجتماع الإدارة العليا</label>
                        <input className="col-8 form-control" type="text" onChange={(e) => setmanagement_decision(e.target.value)} />
                    </div>

                    <div className="col-12 d-flex justify-content-center">
                        <button onClick={submit} type="button" className="btn btn-success">
                            تخزين
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}