import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

export default function CourseCreate() {
    const [programs, setprograms] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.programIndex).then((response) => {
            setprograms(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    const [title, settitle] = React.useState(null)
    const [program_id, setprogram_id] = React.useState(null)
    const [start_date, setstart_date] = React.useState(null)
    const [end_date, setend_date] = React.useState(null)
    const [week_schedule, setweek_schedule] = React.useState([])

    async function submit() {

        try {
            // const data = new FormData()
            // if (title) data.append('title', title)
            // if (program_id) data.append('training_program_id', program_id)
            // data.append('status', 'normal')
            // if (start_date) data.append('start_date', start_date)
            // if (end_date) data.append('end_date', end_date)
            // if (week_schedule) data.append('week_schedule', week_schedule)

            const data = {
                title: title, training_program_id: program_id, status: 'normal',
                start_date: start_date, end_date: end_date,
                week_schedule: week_schedule
            }


            const res = await axios.post(ApiEndpoints.createCourse, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    function changeSchedual() {
        const weekdays = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        setweek_schedule([])
        for (let i = 1; i <= 7; i++) {
            const checkbox = document.getElementById('checkbox' + i)
            if (checkbox.checked) {
                const time1 = document.getElementById('time' + i + '1')
                const time2 = document.getElementById('time' + i + '2')
                setweek_schedule(pre => ({
                    [weekdays[i - 1]]: {
                        begin: time1.value,
                        end: time2.value
                    },
                    ...pre
                }))
            }
        }
    }

    React.useEffect(() => {
        console.log(week_schedule)
    }, [week_schedule])

    return (
        <div className="card">
            <div className="card-header">تسجيل دورة</div>

            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">
                        <label >العنوان</label>
                        <input onChange={(e) => settitle(e.target.value)} type="text" />
                    </li>

                    <li className="list-group-item">
                        <label >تاريخ بدء الدورة</label>
                        <input onChange={(e) => setstart_date(e.target.value)} type="date" />
                    </li>
                    <li className="list-group-item">
                        <label>تاريخ انتهاء الدورة</label>
                        <input onChange={(e) => setend_date(e.target.value)} type="date" />
                    </li>

                    <li className="list-group-item">
                        <label >الحقيبة التدريبية</label>
                        <select onChange={(e) => setprogram_id(e.target.value)} >
                            <option >نرجو اختيار نوع الحقيبة التدريبية</option>
                            {programs.map((program, index) => (
                                <option key={index} value={program.id}>{program.title + '--' + program.category}</option>
                            ))}
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >جدول الدورة الاسبوعي</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>اليوم</th>
                                    <th>وقت بدء المحاضرة</th>
                                    <th>وقت انتهاء المحاضرة</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input id='checkbox1' type='checkbox' onChange={changeSchedual} /></td>
                                    <td>السبت</td>
                                    <td><input id='time11' type='time' onChange={changeSchedual} /></td>
                                    <td><input id='time12' type='time' onChange={changeSchedual} /></td>
                                </tr>
                                <tr>
                                    <td><input id='checkbox2' type='checkbox' onChange={changeSchedual} /></td>
                                    <td>الاحد</td>
                                    <td><input id='time21' type='time' onChange={changeSchedual} /></td>
                                    <td><input id='time22' type='time' onChange={changeSchedual} /></td>
                                </tr>
                                <tr>
                                    <td><input id='checkbox3' type='checkbox' onChange={changeSchedual} /></td>
                                    <td>الاثنين</td>
                                    <td><input id='time31' type='time' onChange={changeSchedual} /></td>
                                    <td><input id='time32' type='time' onChange={changeSchedual} /></td>
                                </tr>
                                <tr>
                                    <td><input id='checkbox4' type='checkbox' onChange={changeSchedual} /></td>
                                    <td>الثلاثاء</td>
                                    <td><input id='time41' type='time' onChange={changeSchedual} /></td>
                                    <td><input id='time42' type='time' onChange={changeSchedual} /></td>
                                </tr>
                                <tr>
                                    <td><input id='checkbox5' type='checkbox' onChange={changeSchedual} /></td>
                                    <td>الاربعاء</td>
                                    <td><input id='time51' type='time' onChange={changeSchedual} /></td>
                                    <td><input id='time52' type='time' onChange={changeSchedual} /></td>
                                </tr>
                                <tr>
                                    <td><input id='checkbox6' type='checkbox' onChange={changeSchedual} /></td>
                                    <td>الخميس</td>
                                    <td><input id='time61' type='time' onChange={changeSchedual} /></td>
                                    <td><input id='time62' type='time' onChange={changeSchedual} /></td>
                                </tr>
                                <tr>
                                    <td><input id='checkbox7' type='checkbox' onChange={changeSchedual} /></td>
                                    <td>الجمعة</td>
                                    <td><input id='time71' type='time' onChange={changeSchedual} /></td>
                                    <td><input id='time72' type='time' onChange={changeSchedual} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </li>

                    <li className="list-group-item">
                        <input onClick={submit} type="button" value="تسجيل" />
                    </li>

                </ul>
            </div>
        </div>
    )
}