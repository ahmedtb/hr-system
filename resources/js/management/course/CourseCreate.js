import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { Redirect } from 'react-router'
import SelectSearch from '../components/SelectSearch'

export default function CourseCreate() {
    const [programs, setprograms] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.getPrograms).then((response) => {
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
            const data = {
                title: title, training_program_id: program_id, status: 'normal',
                start_date: start_date, end_date: end_date,
                week_schedule: week_schedule
            }

            const res = await axios.post(ApiEndpoints.createCourse, data)
            console.log(res.data)
            setredirect(true)

        } catch (error) {
            logError(error)
        }
    }

    function changeSchedule() {
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

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.dashboard} />;
    }

    return (
        <div className="card">
            <div className="card-header">?????????? ????????</div>

            <div className="card-body">
                <div className="row justify-content-center">

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">??????????????</label>
                        <input className="col-8 form-control" onChange={(e) => settitle(e.target.value)} type="text" />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">

                        <label className="col-4">?????????? ?????? ????????????</label>
                        <input className="col-8 form-control" onChange={(e) => setstart_date(e.target.value)} type="date" />
                    </div>
                    <div className="col-5 p-2 border rounded m-2 row ">

                        <label className="col-4">?????????? ???????????? ????????????</label>
                        <input className="col-8 form-control" onChange={(e) => setend_date(e.target.value)} type="date" />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">

                        <label className="col-4">?????????????? ??????????????????</label>
                        {/* <select className="col-8 form-control" onChange={(e) => setprogram_id(e.target.value)} >
                            <option >???????? ???????????? ?????? ?????????????? ??????????????????</option>
                            {programs.map((program, index) => (
                                <option key={index} value={program.id}>{program.title + '--' + program.category}</option>
                            ))}
                        </select> */}
                        <SelectSearch
                            options={programs}
                            setSelectedValue={setprogram_id}
                            label='???????? ?????????????? ??????????????????'
                            valueKeyWord={'id'}
                            nameKeyWord={'title'}
                        />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row">

                        <strong className="my-2 mx-auto">???????? ???????????? ????????????????</strong>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th></th>
                                    <th>??????????</th>
                                    <th>?????? ?????? ????????????????</th>
                                    <th>?????? ???????????? ????????????????</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input className="" id='checkbox1' type='checkbox' onChange={changeSchedule} /></td>
                                    <td>??????????</td>
                                    <td><input className="form-control" id='time11' type='time' onChange={changeSchedule} /></td>
                                    <td><input className="form-control" id='time12' type='time' onChange={changeSchedule} /></td>
                                </tr>
                                <tr>
                                    <td><input className="" id='checkbox2' type='checkbox' onChange={changeSchedule} /></td>
                                    <td>??????????</td>
                                    <td><input className="form-control" id='time21' type='time' onChange={changeSchedule} /></td>
                                    <td><input className="form-control" id='time22' type='time' onChange={changeSchedule} /></td>
                                </tr>
                                <tr>
                                    <td><input className="" id='checkbox3' type='checkbox' onChange={changeSchedule} /></td>
                                    <td>??????????????</td>
                                    <td><input className="form-control" id='time31' type='time' onChange={changeSchedule} /></td>
                                    <td><input className="form-control" id='time32' type='time' onChange={changeSchedule} /></td>
                                </tr>
                                <tr>
                                    <td><input className="" id='checkbox4' type='checkbox' onChange={changeSchedule} /></td>
                                    <td>????????????????</td>
                                    <td><input className="form-control" id='time41' type='time' onChange={changeSchedule} /></td>
                                    <td><input className="form-control" id='time42' type='time' onChange={changeSchedule} /></td>
                                </tr>
                                <tr>
                                    <td><input className="" id='checkbox5' type='checkbox' onChange={changeSchedule} /></td>
                                    <td>????????????????</td>
                                    <td><input className="form-control" id='time51' type='time' onChange={changeSchedule} /></td>
                                    <td><input className="form-control" id='time52' type='time' onChange={changeSchedule} /></td>
                                </tr>
                                <tr>
                                    <td><input className="" id='checkbox6' type='checkbox' onChange={changeSchedule} /></td>
                                    <td>????????????</td>
                                    <td><input className="form-control" id='time61' type='time' onChange={changeSchedule} /></td>
                                    <td><input className="form-control" id='time62' type='time' onChange={changeSchedule} /></td>
                                </tr>
                                <tr>
                                    <td><input className="" id='checkbox7' type='checkbox' onChange={changeSchedule} /></td>
                                    <td>????????????</td>
                                    <td><input className="form-control" id='time71' type='time' onChange={changeSchedule} /></td>
                                    <td><input className="form-control" id='time72' type='time' onChange={changeSchedule} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-5 p-2 border rounded m-2 row ">
                    <input onClick={submit} type="button" value="??????????" />
                </div>


            </div>
        </div>
    )
}