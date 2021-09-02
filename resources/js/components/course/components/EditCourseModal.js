import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import CustomModal from '../../components/CustomModal'

export default function EditCourseModal(props) {
    const course = props.course
    const [programs, setprograms] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.getPrograms).then((response) => {
            setprograms(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    React.useEffect(() => {
        if (course) {
            settitle(course?.title)
            setprogram_id(course?.training_program_id);
            setstart_date(course?.start_date);
            setend_date(course?.end_date);
            setweek_schedule(course?.week_schedule);
            console.log('edit course', course)
        }
    }, [course])

    const [title, settitle] = React.useState('')
    const [program_id, setprogram_id] = React.useState('')
    const [start_date, setstart_date] = React.useState('')
    const [end_date, setend_date] = React.useState('')
    const [week_schedule, setweek_schedule] = React.useState({})

    async function submit() {
        try {
            const res = await axios.put(ApiEndpoints.editCourse.replace(':id', course.id), {
                id: course.id,
                title: title,
                training_program_id: program_id,
                start_date: start_date,
                end_date: end_date,
                week_schedule: week_schedule,
                status: 'normal'
            })
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    function changeSchedule() {
        const weekdays = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        // setweek_schedule([])
        let newSchedule = [];
        for (let i = 1; i <= 7; i++) {
            const checkbox = document.getElementById('checkbox' + i)
            if (checkbox.checked) {
                const time1 = document.getElementById('time' + i + '1')
                const time2 = document.getElementById('time' + i + '2')
                newSchedule = {
                    [weekdays[i - 1]]: {
                        begin: time1.value,
                        end: time2.value
                    },
                    ...newSchedule
                }
                console.log('change schedule', {
                    [weekdays[i - 1]]: {
                        begin: time1.value,
                        end: time2.value
                    },
                    ...newSchedule
                })
            }
        }
        setweek_schedule(newSchedule)
    }


    return (
        <>
            <CustomModal buttonClass="btn btn-secondary" label={'تعديل البرنامج'}>

                <div className="card">
                    <div className="card-header">تسجيل دورة</div>

                    <div className="card-body">
                        <div className="row justify-content-center">

                            <div className="col-5 p-2 border rounded m-2 row ">
                                <label className="col-4">العنوان</label>
                                <input className="col-8 form-control" value={title} onChange={(e) => settitle(e.target.value)} type="text" />
                            </div>

                            <div className="col-5 p-2 border rounded m-2 row ">

                                <label className="col-4">تاريخ بدء الدورة</label>
                                <input className="col-8 form-control" value={start_date} onChange={(e) => setstart_date(e.target.value)} type="date" />
                            </div>
                            <div className="col-5 p-2 border rounded m-2 row ">

                                <label className="col-4">تاريخ انتهاء الدورة</label>
                                <input className="col-8 form-control" value={end_date} onChange={(e) => setend_date(e.target.value)} type="date" />
                            </div>

                            <div className="col-5 p-2 border rounded m-2 row ">

                                <label className="col-4">الحقيبة التدريبية</label>
                                <select className="col-8 form-control" value={program_id} onChange={(e) => setprogram_id(e.target.value)} >
                                    <option >نرجو اختيار نوع الحقيبة التدريبية</option>
                                    {programs.map((program, index) => (
                                        <option key={index} value={program.id}>{program.title + '--' + program.category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-5 p-2 border rounded m-2 row">

                                <strong className="my-2 mx-auto">جدول الدورة الاسبوعي</strong>
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
                                            <td><input className="" checked={week_schedule.saturday ?? false} id='checkbox1' type='checkbox' onChange={changeSchedule} /></td>
                                            <td>السبت</td>
                                            <td><input className="form-control" value={week_schedule?.saturday?.begin ?? ''} id='time11' type='time' onChange={changeSchedule} /></td>
                                            <td><input className="form-control" value={week_schedule?.saturday?.end ?? ''} id='time12' type='time' onChange={changeSchedule} /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="" checked={week_schedule.sunday ?? false} id='checkbox2' type='checkbox' onChange={changeSchedule} /></td>
                                            <td>الاحد</td>
                                            <td><input className="form-control" value={week_schedule.sunday?.begin ?? ''} id='time21' type='time' onChange={changeSchedule} /></td>
                                            <td><input className="form-control" value={week_schedule.sunday?.end ?? ''} id='time22' type='time' onChange={changeSchedule} /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="" checked={week_schedule.monday ?? false} id='checkbox3' type='checkbox' onChange={changeSchedule} /></td>
                                            <td>الاثنين</td>
                                            <td><input className="form-control" value={week_schedule.monday?.begin ?? ''} id='time31' type='time' onChange={changeSchedule} /></td>
                                            <td><input className="form-control" value={week_schedule.monday?.end ?? ''} id='time32' type='time' onChange={changeSchedule} /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="" checked={week_schedule.tuesday ?? false} id='checkbox4' type='checkbox' onChange={changeSchedule} /></td>
                                            <td>الثلاثاء</td>
                                            <td><input className="form-control" value={week_schedule.tuesday?.begin ?? ''} id='time41' type='time' onChange={changeSchedule} /></td>
                                            <td><input className="form-control" value={week_schedule.tuesday?.end ?? ''} id='time42' type='time' onChange={changeSchedule} /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="" checked={week_schedule.wednesday ?? false} id='checkbox5' type='checkbox' onChange={changeSchedule} /></td>
                                            <td>الاربعاء</td>
                                            <td><input className="form-control" value={week_schedule.wednesday?.begin ?? ''} id='time51' type='time' onChange={changeSchedule} /></td>
                                            <td><input className="form-control" value={week_schedule.wednesday?.end ?? ''} id='time52' type='time' onChange={changeSchedule} /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="" checked={week_schedule.thursday ?? false} id='checkbox6' type='checkbox' onChange={changeSchedule} /></td>
                                            <td>الخميس</td>
                                            <td><input className="form-control" value={week_schedule.thursday?.begin ?? ''} id='time61' type='time' onChange={changeSchedule} /></td>
                                            <td><input className="form-control" value={week_schedule.thursday?.end ?? ''} id='time62' type='time' onChange={changeSchedule} /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="" checked={week_schedule.friday ?? false} id='checkbox7' type='checkbox' onChange={changeSchedule} /></td>
                                            <td>الجمعة</td>
                                            <td><input className="form-control" value={week_schedule.friday?.begin ?? ''} id='time71' type='time' onChange={changeSchedule} /></td>
                                            <td><input className="form-control" value={week_schedule.friday?.end ?? ''} id='time72' type='time' onChange={changeSchedule} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="col-5 p-2 border rounded m-2 row ">
                            <input onClick={submit} type="button" value="تسجيل" />
                        </div>


                    </div>
                </div>
            </CustomModal>
        </>
    )
}